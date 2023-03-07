import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleChangePassword = async (event) => {

        event.preventDefault();
        try {
            const emaiId = email;
            const response = await axios.put(`http://localhost:3033/api/v4/user/${emaiId}`, {
                newpassword: newPassword,
            }, {
                headers: { authorization: `${localStorage.getItem("authToken")}` },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleChangePassword} className="change-password-form">
                <h2>Change Password</h2>
                {message && <p className="message">{message}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                        type="password"
                        name="oldpassword"
                        id="oldpassword"
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newpassword">New Password</label>
                    <input
                        type="password"
                        name="newpassword"
                        id="newpassword"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
