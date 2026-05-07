import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('http://localhost:5000/api/users', { name, username, email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-gold)' }}>Create Account</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-solid" style={{ width: '100%', marginTop: '10px' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Have an Account? <Link to="/login" style={{ color: 'var(--primary-gold)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
