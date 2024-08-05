// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import CreateBranch from './components/CreateBranch';
import EditBranch from './components/EditBranch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-branch" element={<CreateBranch />} />
        <Route path="/edit-branch/:id" element={<EditBranch />} />
      </Routes>
    </Router>
  );
}

export default App;
