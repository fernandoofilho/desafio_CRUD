import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import './index.css';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin();
    const [mode, setMode] = useState('login');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userEmail', userEmail);
            formData.append('userKey', password);

            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const searchUser = await fetch('http://127.0.0.1:5000/search/user/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`
                    },
                    body: formData,
                });

                if (searchUser.ok) {
                    const userData = await searchUser.json();
                    const { userEmail, userLevelAccess, userName, userSurname } = JSON.parse(userData.data.replace(/'/g, '"'));
                    login(data.access_token, userEmail, userLevelAccess, userName, userSurname);
                    redirectToNextPage(userLevelAccess);
                } else {
                    const data = await searchUser.json();
                    setErrorMessage(data.message);
                }
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const redirectToNextPage = (userLevelAccess) => {
        if (userLevelAccess === 1) {
            navigate('/home');
        } else {
            navigate('/admin');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userEmail', userEmail);
            if (mode === 'signup') {
                formData.append('userName', name);
                formData.append('userSurname', surname);
            }
            formData.append('userKey', password);

            const response = await fetch('http://127.0.0.1:5000/create/selfCreate', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                handleLogin(e);
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleToggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    return (
        <div className="login-container">
            <h2>{mode === 'login' ? 'Login' : 'Cadastro'}</h2>
            <form onSubmit={mode === 'login' ? handleLogin : handleSignUp}>
                {mode === 'signup' && (
                    <>
                        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Sobrenome" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </>
                )}
                <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p onClick={handleToggleMode}>
                {mode === 'login' ? 'Criar uma conta' : 'Já possui uma conta? Faça login'}
            </p>
        </div>
    );
}
