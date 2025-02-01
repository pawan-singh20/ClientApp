import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddClient.css';

const AddClient = () => {
  const [client, setClient] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .post('http://localhost:8080/client', client, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        navigate('/clients');
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Error adding client');
        }
        console.error(err);
      });
  };

  return (
    <div className="add-client-container">
      <h2 className="add-client-title">Add Client</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-client-form">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={client.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddClient;
