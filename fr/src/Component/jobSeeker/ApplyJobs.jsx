import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from "js-cookie"
import Swal from 'sweetalert2'

const ApplyJobs = () => {


  let token = Cookies.get('token')

  let jobId = useParams()
  console.log(jobId.id);
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [coverLetter, setCoverLetter] = useState('')
  let [phone, setPhone] = useState('')
  let [address, setAddress] = useState('')
  // let [jobId, setJobId] = useState('')
  let [resume, setResume] = useState(null)


  async function handleSubmitApplication(e) {
    e.preventDefault();
    // Check if resume is not null and its type is PDF
    if (resume && resume.type === "application/pdf") {
      let applyJob = new FormData();
      applyJob.append("name", name);
      applyJob.append("email", email);
      applyJob.append("coverLetter", coverLetter);
      applyJob.append("phone", phone);
      applyJob.append("address", address);
      applyJob.append("image", resume);
      applyJob.append("jobId", jobId.id);

<<<<<<< HEAD
      await axios.post('https://job-seeking-website-mb83.onrender.com/api/v1/application/post', applyJob, {
=======

      await axios.post('https://job-seeking-website-mb83.onrender.com/api/v1/application/post', applyJob, {

>>>>>>> 6f7b437897eda7faaa325a827472c792beb39f60
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res);
      
      Swal.fire({
        title:"Success",
        text:"Application Post Successfully",
        icon:"success"
      })
      });
    } else {
      alert("Please upload a PDF file.");
   
      Swal.fire({
        title:"Failed",
        text:"Application Posting Error",
        icon:"error"
      })
    }
  }
  return (
    <div className='container-fluid text-dark py-5 my-5'>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-6  col-md-5 d-flex jobPosting flex-column gap-3 col-sm-12 col-12">
          <h1 className='text-center'>Application Form</h1>
          <input type="text" onChange={(e) => setName(e.target.value)} name='name' value={name} placeholder='Your Name' className='py-2' />
          <input type="text" onChange={(e) => setEmail(e.target.value)} name='email' value={email} placeholder='Your Email' className=' ' />
          <input type="text" placeholder='Your Phone Number' className=' ' onChange={(e) => setPhone(e.target.value)} name='phone' value={phone} />
          <input type="text" placeholder='Your Address' className=' ' onChange={(e) => setAddress(e.target.value)} name='address' value={address} />
          <textarea type="text" placeholder='Cover Letter ....' className=' ' onChange={(e) => setCoverLetter(e.target.value)} name='coverLetter' value={coverLetter} />
          <input type="file" placeholder='Description' className=' pb-2' onChange={(e) => setResume(e.target.files[0])} />
          <button className='btn btn-success' onClick={handleSubmitApplication}>Send Applications</button>
        </div>
      </div>
    </div>
  )
}

export default ApplyJobs
