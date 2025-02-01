import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ClientsList.css';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    if (!token) {
      setError('You must log in to view clients');
      return;
    }

    axios
      .get('http://localhost:8080/clients', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((err) => {
        setError('Failed to fetch clients. Please try again.');
        console.error(err);
      });
  }, []);

  const handleFindClient = () => {
    window.location.href = `/find-client/${clientId}`;
  };

  return (
    <div className="clients-container">
      <h2 className="clients-title">Clients List</h2>

      <div className="buttons-container">
        <Link to="/add-client">
          <button className="add-client-btn">Add Client</button>
        </Link>

        <div className="find-client-container">
          <input
            type="text"
            placeholder="Enter Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
          <button onClick={handleFindClient}>Find Client</button>
        </div>

        {}
        <Link to="/login">
          <button className="logout-btn" onClick={() => localStorage.removeItem('jwtToken')}>Logout</button>
        </Link>
      </div>

      {error && <p className="error">{error}</p>}

      {clients.length === 0 && !error ? (
        <p className="loading">No clients available.</p>
      ) : (
        <ul className="clients-list">
          {clients.map((client) => (
            <li key={client.id} className="client-item">
              <div className="client-details">
                <p><strong>Name:</strong> {client.name}</p>
                <p><strong>Email:</strong> {client.email}</p>
              </div>
              <Link to={`/update-client/${client.id}`}>
                <button className="edit-client-btn">Edit</button>
              </Link>
              <Link to={`/delete-client/${client.id}`}>
                <button className="delete-client-btn">Delete</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientsList;
