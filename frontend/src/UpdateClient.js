
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    axios
      .get(`http://localhost:8080/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setClient(response.data);
      })
      .catch((err) => {
        setError('Error fetching client details');
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    axios
      .put(`http://localhost:8080/client/${id}`, client, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        navigate('/clients');
      })
      .catch((err) => {
        setError('Error updating client');
        console.error(err);
      });
  };

  return (
    <div className="update-client-container">
      <h2>Update Client</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <button type="submit">Update Client</button>
      </form>
    </div>
  );
};

export default UpdateClient;
