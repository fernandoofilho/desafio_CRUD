import React, { useState, useEffect  } from 'react';
import './index.css';
import { useLogin } from '../../context/LoginContext';
export default function Profile() {
    const { userEmail, userName,  userSurname,
            logout,
            setUserSurname:SetCurrentSurname,
            setUserName:SetCurrentName } = useLogin();
    const [name, setName] = useState(userName);
    const [surname, setSurname] = useState(userSurname);
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };
    useEffect(() => {
        SetCurrentName(name);
        SetCurrentSurname(surname);
    }, [surname, SetCurrentSurname, name, SetCurrentName]);
    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('userEmail', userEmail);
            formData.append('userName', name);
            formData.append('userSurname', surname);
            formData.append('currentPassword', currentPassword);
    
            if (password.trim() !== '') {
                const verifyResponse = await fetch('http://127.0.0.1:5000/verify/key', {
                    method: 'POST',
                    body: formData,
                });
    
                if (verifyResponse.ok) {
                    const updateResponse = await fetch('http://127.0.0.1:5000/update/user/', {
                        method: 'PATCH',
                        body: formData,
                    });
    
                    if (updateResponse.ok) {
                        setIsEditing(false);
                        setName(name);
                        setSurname(surname);
                    } else {
                        const data = await updateResponse.json();
                        setErrorMessage(data.message);
                    }
                } else if (verifyResponse.status === 401) {
                    setErrorMessage('A senha atual fornecida não coincide com a senha armazenada.');
                } else {
                    setErrorMessage('Ocorreu um erro ao verificar a senha atual.');
                }
            } else {
                const updateResponse = await fetch('http://127.0.0.1:5000/update/user/', {
                    method: 'PATCH',
                    body: formData,
                });
    
                if (updateResponse.ok) {
                    setIsEditing(false);
                    setName(name);
                    setSurname(surname);
                } else {
                    const data = await updateResponse.json();
                    setErrorMessage(data.message);
                }
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    
    
    

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token'); 

            const formData = new FormData();
            formData.append('userEmail', userEmail);
    
            const response = await fetch('http://127.0.0.1:5000/delete/user/', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (response.ok) {
                logout();
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
    };

    return (
        <> 
        <div className="user-home-container">
            <h2>User Profile</h2>
            <div>
                <label>Name:</label>
                {isEditing ? (
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                    <span>{userName}</span>
                )}
            </div>
            <div>
                <label>Surname:</label>
                {isEditing ? (
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                ) : (
                    <span>{userSurname}</span>
                )}
            </div>
            <div>
                <label>New Password:</label>
                {isEditing && (
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                )}
            </div>
            <div>
                <label>Current Password:</label>
                {isEditing && (
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                )}
            </div>
            <div className='profile-buttons-container'>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {isEditing ? (
                    <button className='profile-button' onClick={handleSave}>Save</button>
                ) : (
                    <button className='profile-button' onClick={handleEdit}>Edit</button>
                )}
                <button className='profile-button' onClick={handleDeleteAccount}>Delete Account</button>
                <button className='profile-button' onClick={handleLogout}>Sair</button>

            </div>
        </div>
        </>
    );
}
