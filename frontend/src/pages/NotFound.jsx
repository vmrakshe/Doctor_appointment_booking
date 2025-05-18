import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Page Not Found</p>
      <Link to="/" style={styles.link}>
        Go Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: "6rem",
    margin: "0",
    color: "#343a40",
  },
  message: {
    fontSize: "1.5rem",
    margin: "1rem 0",
    color: "#6c757d",
  },
  link: {
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
    marginTop: "1rem",
  },
};

export default NotFound;