"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

const Page = () => {
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
            <div style={{ width: '100%' }}>
              <SignIn 
                routing="hash"
                signUpUrl="/register"
                fallbackRedirectUrl="/resumeBuilder"
                forceRedirectUrl="/resumeBuilder"
                appearance={{
                  elements: {
                    rootBox: {
                      width: '100%',
                    },
                    cardBox: {
                      width: '100%',
                      boxShadow: 'none',
                    },
                    card: {
                      boxShadow: 'none',
                      border: 'none',
                      width: '100%',
                      maxWidth: '100%',
                      padding: '20px',
                    },
                    formButtonPrimary: {
                      backgroundColor: "#ffec3d",
                      color: "#000",
                      border: "3px solid #000",
                      boxShadow: "4px 4px 0 #000",
                      borderRadius: "5px",
                      textTransform: "uppercase",
                      fontFamily: "'Bangers', cursive",
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#ffe000",
                      }
                    },
                    socialButtonsBlockButton: {
                      border: "3px solid #000",
                      boxShadow: "2px 2px 0 #000",
                      borderRadius: "5px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      }
                    }
                  }
                }}
              />
            </div>
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
    background: '#fff',
    borderRadius: '15px',
    border: '5px solid #000',
    position: 'relative',
    boxShadow: '6px 6px 0 #000',
    overflow: 'hidden',
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
