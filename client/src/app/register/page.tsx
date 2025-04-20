"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../lib/axiosInstance';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

const Page = () => {
  const [userDetails, setuserDetails] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/register', userDetails, {
        headers: { 'Content-Type': 'application/json' },
      });
      Cookies.set('access_token', response.data.access_token, { expires: 1, secure: true });
      Cookies.set('user_id', response.data.user_id, { expires: 1, secure: true });
      router.push('https://rxume.vercel.app/resumeBuilder');
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'https://rxume.vercel.app/auth/login/google';
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
      <div style={styles.halftoneBackground}>
        <motion.div
          style={styles.container}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 style={styles.title}>🎉 Join Us 🎉</h1>
          <motion.div
            style={styles.speechBubble}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <form onSubmit={handleEmailSignup} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.hero@email.com"
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
                  placeholder="••••••••"
                  required
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="submit"
                style={styles.button}
              >
                BOOM! Sign Up
              </motion.button>
            </form>
            <div style={styles.divider}>🦹 OR 🦸‍♂️</div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: [1, -1, 1] }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleGoogleSignup}
              style={styles.oauthButton}
            >
              Sign Up with Google
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  halftoneBackground: {
    backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
    backgroundSize: "10px 10px",
    minHeight: '100vh',
    padding: '40px 0',
    fontFamily: "'Bangers', cursive",
    backgroundColor: '#ffe9ec',
  },
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    color: '#d80000',
    textShadow: '2px 2px 0 #000',
    marginBottom: '20px',
  },
  speechBubble: {
    background: '#fff',
    padding: '30px',
    borderRadius: '15px',
    border: '5px solid #000',
    position: 'relative',
    boxShadow: '6px 6px 0 #000',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
    color: '#000',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #000',
    borderRadius: '4px',
    backgroundColor: '#fffbe6',
    boxShadow: '2px 2px 0 #000',
  },
  button: {
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#ffec3d',
    color: '#000',
    border: '3px solid #000',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '4px 4px 0 #000',
    transform: 'rotate(-1deg)',
    transition: 'all 0.1s ease-in-out',
  },
  oauthButton: {
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: '3px solid #000',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '4px 4px 0 #000',
    transform: 'rotate(1deg)',
  },
  divider: {
    margin: '20px 0',
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Page;
