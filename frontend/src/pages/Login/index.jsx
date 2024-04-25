import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import { useEmail } from '../../context/EmailContext';
import './index.css';

export default function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useLogin();
    const { setUserEmail } = useEmail();
    const [mode, setMode] = useState('login');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userEmail, setUserEmailState] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin');
        }
    }, [isLoggedIn, navigate]);

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
                localStorage.setItem('token', data.access_token);
                login();
                setUserEmail(userEmail);
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userEmail', userEmail);
            formData.append('userName', name);
            formData.append('userSurname', surname);
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
                <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmailState(e.target.value)} />
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
