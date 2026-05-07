import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const endpoint = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users';
      const payload = isLogin ? { username, password } : { name, username, email, password };
      
      const { data } = await axios.post(endpoint, payload, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/dashboard';
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      
      // Auto-switch logic: if login fails because user not found, switch to register
      if (isLogin && message.toLowerCase().includes('not found')) {
        alert('Account not found. Switching to registration...');
        setIsLogin(false);
        setUsername(username); // keep the username/email entered
      } else {
        alert(message);
      }
    }
  };

  return (
    <div className="auth-overlay animate-fade-in">
      <div className="auth-card animate-pop">
        <div className="auth-header">
          <span className="auth-badge">{isLogin ? 'SIGN IN' : 'SIGN UP'}</span>
          <h1>{isLogin ? 'Access your workspace' : 'Create your account'}</h1>
          <p>{isLogin ? 'Enter your details to manage your royal experience.' : 'Join the royal community of The Palace Cafe.'}</p>
        </div>

        <div className="social-login">
          <button className="social-btn"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> Google</button>
          <button className="social-btn"><img src="https://www.svgrepo.com/show/475684/twitter-color.svg" alt="Twitter" /> Twitter</button>
          <button className="social-btn"><img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub" /> GitHub</button>
        </div>

        <div className="auth-divider" style={{ position: 'relative', margin: '30px 0', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ position: 'relative', background: '#1a1a1a', padding: '0 15px', color: '#666', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px' }}>OR CONTINUE WITH EMAIL</span>
        </div>

        <form onSubmit={submitHandler}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Maharaja Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-solid" style={{ width: '100%', marginTop: '20px', padding: '16px' }}>
            {isLogin ? 'Continue with Email' : 'Create Royal Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="javascript:void(0)" onClick={toggleMode}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
