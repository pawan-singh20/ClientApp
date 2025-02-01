import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteClient = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .delete(`http://localhost:8080/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        navigate('/clients');
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Error deleting client');
        }
        console.error(err);
      });
  }, [id, navigate]);

  return (
    <div className="delete-client-container">
      <h2>Deleting Client...</h2>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DeleteClient;
