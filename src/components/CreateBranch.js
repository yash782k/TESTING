// src/components/CreateBranch.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { sendEmail } from '../utils/sendEmail';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const CreateBranch = () => {
  const [branchLocation, setBranchLocation] = useState('');
  const [branchName, setBranchName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numUsers, setNumUsers] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const auth = getAuth();

    try {
      // Create user in Firebase Authentication
      await createUserWithEmailAndPassword(auth, ownerEmail, password);

      // Add branch details to Firestore
      await addDoc(collection(db, 'branches'), {
        branchLocation,
        branchName,
        endDate,
        numUsers,
        ownerName,
        password,
        paymentType,
        startDate,
        username
      });

      // Send email to the owner with credentials
      await sendEmail(ownerEmail, username, password);

      setSuccess('Branch created, user account set up, and email sent successfully.');
      
      // Navigate back to admin dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      setError('Failed to create branch or user. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create New Branch</h2>
      <form onSubmit={handleCreateBranch}>
        <label>
          Branch Location:
          <input 
            type="text" 
            value={branchLocation} 
            onChange={(e) => setBranchLocation(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Branch Name:
          <input 
            type="text" 
            value={branchName} 
            onChange={(e) => setBranchName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          End Date:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Number of Users:
          <input 
            type="number" 
            value={numUsers} 
            onChange={(e) => setNumUsers(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Owner Name:
          <input 
            type="text" 
            value={ownerName} 
            onChange={(e) => setOwnerName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Owner Email:
          <input 
            type="email" 
            value={ownerEmail} 
            onChange={(e) => setOwnerEmail(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Payment Type:
          <input 
            type="text" 
            value={paymentType} 
            onChange={(e) => setPaymentType(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Start Date:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Create Branch</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CreateBranch;
