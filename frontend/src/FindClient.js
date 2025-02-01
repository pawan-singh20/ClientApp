import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FindClient.css';

const FindClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/clients');
      return;
    }

    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('You need to log in first!');
      return;
    }

    axios
      .get(`http://localhost:8080/client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        setClient(response.data);
      })
      .catch((err) => {
        setError('Client not found or error occurred');
        console.error(err);
      });
  }, [id, navigate]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="find-client-page">
      {client ? (
        <div className="client-details">
          <h2 className="find-client-title">Client Details</h2>
          <p><strong>Name:</strong> {client.name}</p>
          <p><strong>Email:</strong> {client.email}</p>
        </div>
      ) : (
        <p className="loading">Loading client data...</p>
      )}
    </div>
  );
};

export default FindClient;
