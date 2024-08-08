import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../Context/context';
import axios from 'axios';
import Cookies from "js-cookie";
import logo from "../../assets/apna logo.jpg";


const Navbar = () => {
  const { user, setAuthorized, setUser, authorized, showProfile, setShowProfile } = useContext(Context);
  let token = Cookies.get('token');

  async function handleLogout() {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'token': token
        }
      };
      // Send a request to log out the user on the server
      await axios.get("https://job-seeking-website-mb83.onrender.com/api/v1/user/logout", config);

      // Clear user data in the frontend
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setAuthorized(false); 
      setUser(null); 
      setShowProfile(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light  ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="100px" height="100px" alt="Logo" />
        </Link>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-success" to="/">Home</Link>
            </li>
            {authorized && user && user.role === "Employer" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/myJob">My-Jobs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/postJob">Job Post</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/applicantApplication">Application</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link text-success" to="/allJobs">All Jobs</Link>
            </li>
            {authorized && user && user.role === "Job Seeker" && (
              <li className="nav-item">
                <Link className="nav-link text-success" to="/myApplication">My Application</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <div className="position-relative profile-container">
                  <button onClick={() => setShowProfile(!showProfile)} className="btn btn-light btn-outline-primary rounded mx-1">{user.email}</button>
                  {showProfile && (
                    <div className="profile-box">
                      <p className="mb-1">Name: {user.name}</p>
                      <p className="mb-1">Email: {user.email}</p>
                      {/* <button onClick={handleLogout} className="btn btn-danger">Logout</button> */}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="btn btn-danger mx-1">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-success mx-1">Login</Link>
                <Link to="/register" className="btn btn-success">Registration</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
