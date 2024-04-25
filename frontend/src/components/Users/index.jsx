import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useLogin } from '../../context/LoginContext';

export default function Users(adminEmail) {
    const [users, setUsers] = useState([]);
    const { userEmail } = useLogin();
    const [newUser, setNewUser] = useState({
        userEmail: '',
        userName: '',
        userSurname: '',
        userKey: '',
        userAccess: '1' 
    });
    const token = localStorage.getItem('token');

    const addUser = () => {
        const formData = new FormData();
        formData.append('requesterEmail', userEmail);
        formData.append('userEmail', newUser.userEmail);
        formData.append('userName', newUser.userName);
        formData.append('userSurname', newUser.userSurname);
        formData.append('userKey', newUser.userKey);
        
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };

        axios.post('http://127.0.0.1:5000/create/adminCreate', formData, config)
        .then(response => {
            console.log(response.data.message);
            listUsers();
            clearFields();
        })
        .catch(error => {
            console.error('Erro ao adicionar usuário:', error);
        });
    };

    const listUsers = () => {
        axios.get('http://127.0.0.1:5000/search/')
        
        .then(response => {
            const userDataString = response.data.users.replace(/'/g, '"'); 


            const userDataArray = JSON.parse(userDataString); 
            setUsers(userDataArray); 
        })
        .catch(error => {
            console.error('Erro ao obter lista de usuários:', error);
        });
    };
    

    const removeUser = (userEmail) => {
        axios.delete(`http://127.0.0.1:5000/delete/user/?userEmail=${userEmail}`)
        .then(response => {
            console.log(response.data.message);
            listUsers();
        })
        .catch(error => {
            console.error('Erro ao remover usuário:', error);
        });
    };

    const clearFields = () => {
        setNewUser({
            userEmail: '',
            userName: '',
            userSurname: '',
            userKey: '',
            userAccess: '1'
        });
    };

    useEffect(() => {

        listUsers();
    }, []);

    return (
        <div>
            <h1>Adicionar ou remover usuários </h1>
            <form>
                <input type="email" placeholder="Email" value={newUser.userEmail} onChange={(e) => setNewUser({ ...newUser, userEmail: e.target.value })} />
                <input type="text" placeholder="Nome" value={newUser.userName} onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })} />
                <input type="text" placeholder="Sobrenome" value={newUser.userSurname} onChange={(e) => setNewUser({ ...newUser, userSurname: e.target.value })} />
                <input type="password" placeholder="Senha" value={newUser.userKey} onChange={(e) => setNewUser({ ...newUser, userKey: e.target.value })} />
                <select value={newUser.userAccess} onChange={(e) => setNewUser({ ...newUser, userAccess: e.target.value })}>
                    <option value="1">Normal</option>
                    <option value="2">Admin</option>
                </select>
                <button type="button" onClick={addUser}>Adicionar Usuário</button>
                <button type="button" onClick={clearFields}>Limpar Campos</button>
            </form>

            <ul className='user-list'>
                {users.slice(0, 8).map(user => (
                    <li key={user.userEmail} className='user-item'>
                        <span className='user-name'>{user.userName} {user.userSurname}</span>
                        <span className='user-email'>{user.userEmail}</span>
                        <button className='remove-button' onClick={() => removeUser(user.userEmail)}>Remover</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}
