
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { username, password };

    axios
      .post('http://localhost:8080/login', userData)
      .then((response) => {
        const token = response.data;
        localStorage.setItem('jwtToken', token);
        navigate('/clients');
      })
      .catch((err) => {
        setError('Invalid username or password');
        console.error(err);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {}
      <div className="register-btn-container">
        <button
          onClick={() => navigate('/register')}
          className="register-btn"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
