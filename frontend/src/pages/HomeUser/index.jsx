import React, { useState } from 'react';
import './index.css';

export default function NormalUserHome() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
    };

    return (
        <div className="user-home-container">
            <h2>User Profile</h2>
            <div>
                <label>Name:</label>
                {isEditing ? (
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                    <span>{name}</span>
                )}
            </div>
            <div>
                <label>Surname:</label>
                {isEditing ? (
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                ) : (
                    <span>{surname}</span>
                )}
            </div>
            <div>
                <label>Password:</label>
                {isEditing ? (
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                ) : (
                    <span>********</span>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
    );
}
