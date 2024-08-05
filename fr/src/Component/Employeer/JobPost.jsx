import React, { useContext, useRef, useState, useEffect } from 'react'
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Cookies from "js-cookie"
import Swal from 'sweetalert2'
const JobPost = () => {
  let jobTitleRef = useRef()
  let jobCategoryRef = useRef()
  let jobCityRef = useRef()
  let jobDescriptionRef = useRef()
  let jobLocationRef = useRef()
  let jobCountryRef = useRef()
  let salaryTypeRef = useRef()
  let fixedSalaryRef = useRef()
  let fromSalaryRef = useRef()
  let toSalaryRef = useRef()
  let [salaryType, setSalaryType] = useState("default")

  function handleSalaryTypeChange() {
    setSalaryType(salaryTypeRef.current.value)
  }

  let { authorized, user } = useContext(Context)
  let navigate = useNavigate()

  useEffect(() => {
    if (!authorized || (user && user.role !== "Employer")) {
      navigate("/login")
    }
  }, [authorized, user, navigate])

  async function handlePostJob() {
    let data;

    if (salaryType === "Fixed Salary") {
      data = {
        title: jobTitleRef.current.value,
        description: jobDescriptionRef.current.value,
        category: jobCategoryRef.current.value,
        country: jobCountryRef.current.value,
        city: jobCityRef.current.value,
        location: jobLocationRef.current.value,
        fixedSalary: fixedSalaryRef.current.value
      };
    } else if (salaryType === "Ranged Salary") {
      data = {
        title: jobTitleRef.current.value,
        description: jobDescriptionRef.current.value,
        category: jobCategoryRef.current.value,
        country: jobCountryRef.current.value,
        city: jobCityRef.current.value,
        location: jobLocationRef.current.value,
        salaryFrom: fromSalaryRef.current.value,
        salaryTo: toSalaryRef.current.value
      };
    } else {
      console.log("Job not submitted yet");
      return;
    }

    try {
      // Get the token from cookies
      let token = Cookies.get('token')

      // Set the headers with the token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      // Make the POST request with axios
<<<<<<< HEAD
      let response = await axios.post("http://localhost:4000/api/v1/job/post", data, config);
=======
      let response = await axios.post("https://job-seeking-website-mb83.onrender.com/api/v1/job/post", data, config);
>>>>>>> 50f4bc7 (Fix backend url)
      console.log("Job posted successfully", response);
    
    Swal.fire({
      title:"Success",
      text:"Job Posted Successfully",
      icon:"success"
    })
    } catch (error) {
      console.error("Error posting job:", error);
    
      Swal.fire({
        title:"Error",
        text:"Failed Job Posting",
        icon:"error"
      })
    }
  }

  return (
    <div className='container-fluid text-dark py-5 my-5'>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-6 col-md-5 d-flex jobPosting flex-column gap-3 col-sm-12 col-12">
          <h1 className='text-center'>Post Your Job</h1>
          <input type="text" placeholder='Job Category' className='py-2' ref={jobCategoryRef} />
          <input type="text" placeholder='Job Title' className=' ' ref={jobTitleRef} />
          <input type="text" placeholder='Country' className=' ' ref={jobCountryRef} />
          <input type="text" placeholder='City' className=' ' ref={jobCityRef} />
          <input type="text" placeholder='Location' className=' ' ref={jobLocationRef} />
          <input type="text" placeholder='Description' className=' ' ref={jobDescriptionRef} />
        </div>
        <div>
          <div className='col-xl-12 d-flex justify-content-center mt-4'>
            <select name="" ref={salaryTypeRef} onChange={handleSalaryTypeChange} id="" className='bg-dark text-white p-2'>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "default" ? (<p>Please select Salary Type</p>) :
              salaryType === "Fixed Salary" ? (<input placeholder='Enter Salary' ref={fixedSalaryRef} />)
                : salaryType === "Ranged Salary" ? (<>
                  <input placeholder='From Salary' ref={fromSalaryRef} />
                  <input placeholder='To Salary' ref={toSalaryRef} />
                </>)
                  : null}
          </div>
          <div className='col-xl-12 d-flex justify-content-center mt-4'>
            <button className='btn btn-success' onClick={handlePostJob}> CREATE JOB</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPost
