// src/components/EditBranch.js
import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branchData, setBranchData] = useState({
    branchLocation: '',
    branchName: '',
    endDate: '',
    numUsers: '',
    ownerName: '',
    password: '',
    paymentType: '',
    startDate: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const branchDoc = doc(db, 'branches', id);
        const branchSnapshot = await getDoc(branchDoc);
        if (branchSnapshot.exists()) {
          setBranchData(branchSnapshot.data());
        } else {
          setError('Branch not found.');
        }
      } catch (error) {
        setError('Error fetching branch details.');
      }
    };

    fetchBranchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateBranch = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const branchDoc = doc(db, 'branches', id);
      await updateDoc(branchDoc, branchData);
      setSuccess('Branch details updated successfully.');
      navigate('/admin-dashboard'); // Navigate back to the admin dashboard after updating
    } catch (error) {
      setError('Failed to update branch details. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Branch</h2>
      <form onSubmit={handleUpdateBranch}>
        <label>
          Branch Location:
          <input 
            type="text" 
            name="branchLocation" 
            value={branchData.branchLocation} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Branch Name:
          <input 
            type="text" 
            name="branchName" 
            value={branchData.branchName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          End Date:
          <input 
            type="date" 
            name="endDate" 
            value={branchData.endDate} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Number of Users:
          <input 
            type="number" 
            name="numUsers" 
            value={branchData.numUsers} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Owner Name:
          <input 
            type="text" 
            name="ownerName" 
            value={branchData.ownerName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            value={branchData.password} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Payment Type:
          <input 
            type="text" 
            name="paymentType" 
            value={branchData.paymentType} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Start Date:
          <input 
            type="date" 
            name="startDate" 
            value={branchData.startDate} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Username:
          <input 
            type="text" 
            name="username" 
            value={branchData.username} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <button type="submit">Update Branch</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default EditBranch;
