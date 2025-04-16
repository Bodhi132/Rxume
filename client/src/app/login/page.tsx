"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../lib/axiosInstance";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const Page = () => {
  const [userDetails, setuserDetails] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", userDetails, {
        headers: { "Content-Type": "application/json" },
      });
      Cookies.set("access_token", response.data.access_token, {
        expires: 1,
        secure: true,
      });
      Cookies.set("user_id", response.data.user_id, {
        expires: 1,
        secure: true,
      });
      router.push("http://localhost:3000/resumeBuilder");
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/auth/login/google";
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
        rel="stylesheet"
      />
      <div style={styles.halftoneBackground}>
        <div style={styles.container}>
          <motion.h1
            style={styles.title}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            💥 Sign In to Your Superpower 💥
          </motion.h1>

          <motion.div
            style={styles.speechBubble}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            <form onSubmit={handleEmailSignIn} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@planethero.com"
                  required
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password:
                </label>
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
                whileTap={{ scale: 0.95 }}
                whileHover={{ rotate: -2 }}
                type="submit"
                style={styles.button}
              >
                ZAP! Sign In
              </motion.button>
            </form>

            <motion.div
              style={styles.divider}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🦸 OR 🦸‍♀️
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ rotate: 2 }}
              onClick={handleGoogleSignup}
              style={styles.oauthButton}
            >
              Sign in with Google
            </motion.button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ marginTop: '20px' }}
            >
              <p style={{ fontSize: '16px', color: '#333' }}>
                Don&apos;t have an account?{' '}
                <motion.button
                  onClick={() => router.push("/register")}
                  style={{
                    color: '#d80000',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  Sign up
                </motion.button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  halftoneBackground: {
    backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
    backgroundSize: "10px 10px",
    minHeight: "100vh",
    padding: "40px 0",
    fontFamily: "'Bangers', cursive",
    backgroundColor: "#fffdc1",
  },
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    color: "#d80000",
    textShadow: "2px 2px 0 #000",
    marginBottom: "20px",
  },
  speechBubble: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    border: "5px solid #000",
    position: "relative",
    boxShadow: "6px 6px 0 #000",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "18px",
    marginBottom: "5px",
    color: "#000",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #000",
    borderRadius: "4px",
    backgroundColor: "#fffbe6",
    boxShadow: "2px 2px 0 #000",
  },
  button: {
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#ffec3d",
    color: "#000",
    border: "3px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "4px 4px 0 #000",
    transform: "rotate(-1deg)",
    transition: "all 0.1s ease-in-out",
  },
  oauthButton: {
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "3px solid #000",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "4px 4px 0 #000",
    transform: "rotate(1deg)",
  },
  divider: {
    margin: "20px 0",
    fontSize: "20px",
    color: "#333",
    fontWeight: "bold",
  },
};

export default Page;
