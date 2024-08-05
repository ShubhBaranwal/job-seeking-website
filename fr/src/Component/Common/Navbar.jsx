import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../Context/context';
import axios from 'axios';
import Cookies from "js-cookie"
const Navbar = () => {
// let []=useState(false)

  const { user, setAuthorized, setUser ,authorized,showProfile,setShowProfile} = useContext(Context);

let token=Cookies.get('token')



async function handleLogout() {

            
 
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` ,
        'token':token
      }
    };
    // Send a request to log out the user on the server
    let response = await axios.get("https://job-seeking-website-mb83.onrender.com/api/v1/user/logout",config);

    // Clear user data in the frontend
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";    
    setAuthorized(false); // Set authorized state to false
    setUser(null); // Clear user data
   setShowProfile(false)
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle errors if logout fails
    // You can also show an error message to the user if needed
  }
}
console.log(user);

  return (
    <div className='container-fluid'>
      <div className="row d-flex align-content-center">
        <div className='col-xl-3  col-md-3 col-sm-6 col-6 order-xl-1 order-md-1 order-sm-1 order-1'>
          <img className=' img-fluid' src="/apna logo.jpg" width="100px" height="100px" alt="" />
        </div>
        <div className="nav col-xl-6  col-md-6 col-sm-12 col-12 order-xl-2 order-md-2 order-sm-3 order-3">
          <ul className='my-3  d-flex  gap-3 list-unstyled'>
            <Link  className='text-success link' to="/">Home</Link>
            {authorized && (user && user.role == "Employer") ? <><Link to="/myJob" className='text-success link'>My-Jobs</Link>
            <Link to="/postJob" className='text-success link'>
             Job Post
            </Link>
            <Link to="/applicantApplication" className='text-success link'>Application</Link>
            </> : null 

            }
<Link to="/allJobs" className='text-success link'>All Jobs</Link>
       {authorized && (user && user.role =="Job Seeker") ? 
          <Link className='text-success link' to="/myApplication"> MyApplication</Link> : null
       }     

            
          </ul>
        </div>
        <div className='col-xl-3 col-md-3  col-sm-6 col-6 order-xl-3 order-md-3 order-sm-2 order-2 '>
          {user ? (
            <>
            
            <button onClick={()=>setShowProfile(!showProfile)} className='btn btn-light btn-outline-primary rounded mt-4'>{user.email}</button>
            <button onClick={handleLogout} className='btn btn-danger  mt-4'>Logout</button>
            
            
            </>
          ) : (
            <>
              <Link to="/login" className='my-3 btn btn-success mx-1'>Login</Link>
              <Link to="/register" className='btn btn-success'>Registration</Link>
            </>
          )}
        </div>
      </div>
      <div className="row d-flex justify-content-end profile-container  ">
        <div className="col-xl-3 col-md-3 col-sm-6 col-6 ">
        {showProfile && <div className='bg-dark text-light p-2 profile'>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            <button onClick={handleLogout} className='btn btn-danger '>Logout</button>
            </div> 

            }
        </div>
      
      </div>
    </div>
  );
}

export default Navbar;
