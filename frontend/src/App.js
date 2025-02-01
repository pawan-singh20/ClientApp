import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ClientsList from './ClientsList';
import AddClient from './AddClient';
import DeleteClient from './DeleteClient';
import UpdateClient from './UpdateClient';
import FindClient from './FindClient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> {}
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/delete-client/:id" element={<DeleteClient />} />
        <Route path="/update-client/:id" element={<UpdateClient />} />
        <Route path="/find-client/:id" element={<FindClient />} />
      </Routes>
    </Router>
  );
};

export default App;
