import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Common/Navbar';
import Footer from './Component/Common/Footer';
import ContextProvider, { Context } from './Component/Context/context';
import Home from './Component/Home/Home';
import JobPost from './Component/Employeer/JobPost';
import Cookies from 'js-cookie';
import axios from 'axios';
import Login from './Component/Auth/Login';
import Registration from './Component/Auth/Registration';
import MyJobs from './Component/Employeer/MyJobs';
import AllJob from './Component/Common/AllJob';
import JobDetailsPage from './Component/Common/JobDetailsPage';
import ApplyJobs from './Component/jobSeeker/ApplyJobs';
import ApplicantsApplications from './Component/Employeer/ApplicantsApplications';
import MyApplication from './Component/jobSeeker/MyApplication';

const App = () => {



  return (
    <ContextProvider>
      
      <BrowserRouter>
      <div className='main-container' >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/postJob" element={<JobPost />} />
          <Route path="/myJob" element={<MyJobs />} />
          <Route path='/allJobs' element={<AllJob/>}/>
          <Route path="/jobDetails/:id" element={<JobDetailsPage/>}/>
          <Route path="/applyJob/:id" element={<ApplyJobs/>}/>
          <Route path='/applicantApplication' element={<ApplicantsApplications/>}/>
          <Route path='/myApplication'  element={<MyApplication/>}/>
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
