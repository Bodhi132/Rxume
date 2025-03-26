"use client"
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn , signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import axiosInstance from '../lib/axiosInstance';

const page = () => {

  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setuserDetails({...userDetails, [name]: value})
  }

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:8000/auth/login/google';
  };

  const router = useRouter();

  const handleEmailSignIn = async (e:React.FormEvent) => {
    e.preventDefault();
    try{
      const response  = await axiosInstance.post('/login', userDetails,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      Cookies.set('access_token', response.data.access_token,{expires: 1,secure:true})
      Cookies.set('user_id', response.data.user_id,{expires: 1,secure:true})
      router.push('http://localhost:3000/resumeBuilder')

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleGithubSignup = () => {
    window.location.href = 'http://localhost:8000/auth/login/github';
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign In</h1>
      <form onSubmit={handleEmailSignIn} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            style={styles.input}
            onChange={handleChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            style={styles.input}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
      <div style={styles.divider}>or</div>
      <button onClick={handleGoogleSignup} style={styles.oauthButton}>
        Sign In with Google
      </button>
      {/* <button onClick={handleGithubSignup} style={styles.oauthButton}>
        Sign Up with GitHub
      </button> */}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  oauthButton: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  divider: {
    margin: '20px 0',
    fontSize: '14px',
    color: '#888',
  },
};

export default page;
