import React, { useState } from 'react';
import { Register } from '../Auth/auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './register.css'

const RegisterUser = ({ setIsloggedIn }) => {
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = () => {
        if (!email || !password) {
            message.error("All feilds are required!");
            return;
        }
        const res = Register({ email, password, setIsloggedIn, name });
        if (res) {
            console.log("Register");
            Navigate('/dashboard');
        } else {
            console.log("Failed");
        }
    };
    const changetologin = () => {
        Navigate('/login');
    }

    return (
        <div className="main-container">

            <div className="container">
                <h2>Create an account</h2>
                <div className="form-group">
                    <label>First name</label>
                    <input
                        type="name"
                        placeholder="Enter your first name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Set password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="btn">
                    <button onClick={handleChange}>Create</button>
                </div>
                <div className="pathtologin">
                    <div><p>Already have account?</p></div>
                    <button onClick={changetologin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
