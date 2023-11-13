import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "./HomePage.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState();

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '10px',
    },
    welcome: {
      fontSize: '1.2rem',
      color: '#555',
    },
  };
  

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  const getdata = async () => {
    try {
      
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-container-left">
          <div className="side-nav">
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="nav-lists">
              <Link
                to="/"
                className={
                  location.pathname === "/homePage"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/user-profile"
                className={
                  location.pathname === "/user-profile"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                User Profile
              </Link>
              <Link
                to="/bill-details"
                className={
                  location.pathname === "/bill-details"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Bill Details
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
  <div className="main-container" style={styles.container}>
    <h1 style={styles.title}>TNGL</h1>
    <p style={styles.welcome}>Welcome back, {data?.name}</p>
  </div>
</div>
      </div>
    </>
  );
}

export default HomePage;
