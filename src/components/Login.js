import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import BgAbstract from "../assets/bg-abstract.png";
import { Button, Checkbox, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/yash2/Downloads/firebase-auth-app/firebase-auth-app/src/components/login.css';

export default function LoginNew() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Check for Super Admin login
    if (email === 'yash' && password === 'admin') {
      navigate('/admin-dashboard'); // Replace with your actual route
      return;
    }

    // Handle regular user login
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/welcome'); // Replace with your actual route for users
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <div className="relative flex h-screen w-full flex-row">
        <img src={BgAbstract} alt="Background" width={"55%"} />

        <div className="absolute top-20 left-20 text-6xl text-white">
          <img src={Logo} alt="Logo" width={200} />
        </div>

        <div className="absolute bottom-32 left-20 text-6xl text-white">
          Welcome <br /> Back!
        </div>

        <div className="mx-44 flex flex-1 flex-col justify-center space-y-6">
          <div className="text-5xl">Sign In</div>

          <div className="text-xl text-[#797979]">
            Welcome back! Please sign in to your account
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <TextField
                label="Email ID"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div className="form-group">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </div>

            <div className="form-remember">
              <Checkbox defaultChecked />
              <label>Remember</label>
            </div>

            <div className="w-full text-center text-[#797979]">
              Forgot your password
            </div>

            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
