import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormAddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const navigate = useNavigate();

    const handleSaveUser = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            setMessage('Full Name cannot be empty.');
            return;
        }

        if (email.trim() === '') {
            setMessage('Email cannot be empty.');
            return;
        }

        if (password.trim() === '') {
            setMessage('Password cannot be empty.');
            return;
        }

        if (confirmPassword.trim() === '') {
            setMessage('Confirm Password cannot be empty.');
            return;
        }

        if (phone.trim() === '') {
            setMessage('Phone Number cannot be empty.');
            return;
        }

        // Check for blank fields
        // if (!name || !email || !password || !confirmPassword || !phone || !role) {
        //     setMessage('Please fill in all the fields.');
        //     return;
        // }

        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/v1/user', {
                user_fullname: name,
                user_email: email,
                user_password: password,
                confirm_password: confirmPassword,
                user_phone: phone,
                user_role: role,
            });
            navigate('/user');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                setPasswordMatchError(error.response.data.error); // Set the password match error
            }
        }
    };

    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Add New User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleSaveUser}>
                            <p className="has-text-centered has-text-danger">{message}</p>
                            <div className="field">
                                <label className="label"> Full Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => {
                                            const inputName = e.target.value;
                                            // Validate input: Only letters allowed
                                            const regex = /^[a-zA-Z\s]*$/;
                                            if (regex.test(inputName)) {
                                                setName(inputName);
                                            }
                                        }}
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Email</label>
                                <div className="control">
                                    <input
                                        type="email"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="*******"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Confirm Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="*******"
                                    />
                                </div>
                                {passwordMatchError && (
                                    <p className="help is-danger">{passwordMatchError}</p>
                                )}
                            </div>
                            <div className="field">
                                <label className="label"> Phone Number</label>
                                <div className="control">
                                    <input
                                        type="tel"
                                        className="input"
                                        pattern="[0-9]*"
                                        value={phone}
                                        onChange={(e) => {
                                            const inputPhone = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                            setPhone(inputPhone);
                                        }}
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Farmer">Farmer</option>
                                            <option value="Worker">Worker</option>
                                        </select>
                                    </div>
                                </div>
                                {role === "" && (
                                    <p className="help is-danger">Please select a role</p>
                                )}
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button"
                                        style={{ backgroundColor: '#71AF9D', color: 'white' }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddUser;
