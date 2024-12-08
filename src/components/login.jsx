import React, { useState } from 'react'
import { Login } from '../Auth/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'
const LoginUser = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = () => {
    const res = Login({ email, password });
    if (res) {
      console.log("success");
      Navigate('/dashboard');
    } else {
      console.log("faild");
    }
  }
  const ChangetoRegiter = () =>{
     Navigate('/')
  }
  return (
    <div className="main-container">
      <div className='container'>
        <h2>Login</h2>
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
            <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            </div>
          <div className='btn'>
            <button onClick={handleChange}>Login</button>
          </div>
          <p onClick={ChangetoRegiter}>or <span>Register now!</span></p>
      </div>
    </div>

  )
}

export default LoginUser