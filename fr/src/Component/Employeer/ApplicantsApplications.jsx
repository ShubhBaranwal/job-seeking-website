import React, { useContext, useEffect, useState,useRef } from 'react'
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'
import Application from './Application'

const ApplicantsApplications = () => {
let [allApplicant,setAllApplicant]=useState([])

  let {user,authorized}=useContext(Context)
let navigate=useNavigate()

useEffect(()=>{
  let token=Cookies.get('token')
      console.log(token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` ,
      'token':token
    }
  };
  ;(async function(){
      
      let response=await axios.get("https://job-seeking-website-mb83.onrender.com/api/v1/application/employer/getall",config)
      setAllApplicant(response.data.applications)
      console.log(response.data.applications);
  })()


},[])



useEffect(() => {
  if (!authorized || (user && user.role !== "Employer")) {
      navigate("/login");
  }
}, [authorized, user, navigate]);



    return (
    <div className='container-fluid'>
<div className="row">
  <h1 className='text-ceneter text-success'>Application from Job Seeker</h1>
  {allApplicant.map((application)=>{
    console.log("shubh");
    return  <Application  application={application}/>
  })

  }

  
</div>
    </div>
  )
}

export default ApplicantsApplications
