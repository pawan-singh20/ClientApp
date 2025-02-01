import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios
      .post('http://localhost:8080/register', { username, password })
      .then((response) => {
        navigate('/login');
      })
      .catch((err) => {
        setError('Error registering user. Please try again.');
        console.error(err);
      });
  };

  return (
    <div className="register-form-container">
      <h2 className="register-title">Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>

      <div className="login-link">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;
