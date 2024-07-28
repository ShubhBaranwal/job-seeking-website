import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { Context } from '../Context/context';

const JobDetailsPage = () => {
let {user,authorized}=useContext(Context)

  let [jobDetails,setJobDetails]=useState({})
    let Jobid=useParams()
console.log(Jobid.id);

useEffect(()=>{
   async function  getJobDetails(){
    let response=await axios.get(`http://localhost:4000/api/v1/job/getJobDetails/${Jobid.id}`)
    console.log(response.data);
 setJobDetails(response.data)
  }
   getJobDetails()


},[Jobid])
  return (
    <div className='container p-5'>
      <h1 className='text-center text-success my-3'>Job Details</h1>
      <div className="row d-flex flex-column ">
          <div className="col-12  p-5 shadow-lg">
            <h5 className='mb-2'><span className='text-success h4'>Title : </span>{jobDetails.title
} </h5>
            <h5 className='mb-2'><span className='text-success h4'>Category : </span>{jobDetails.category
} </h5>


<h5 className='mb-2'><span className='text-success h4'>Country : </span>{jobDetails.country
} </h5>

<h5 className='mb-2'><span className='text-success h4' >City : </span>{jobDetails.city
} </h5>
<h5 className='mb-2'><span className='text-success h4'>Location : </span>{jobDetails.location
} </h5>
<h5 className='mb-2'><span className='text-success h4'>Description : </span>{jobDetails.description
} </h5>
<h5 className='mb-2'><span className='text-success h4'>Job Posted On : </span>{jobDetails.jobPostedOn

} </h5>
<h5 className='mb-2'><span className='text-success h4'>Salary : </span>{jobDetails.fixedSalary


} </h5>
{/* ={`/jobDetails/${job._id}`} */}
{authorized && (user && user.role == "Job Seeker") ? <Link to={`/applyJob/${jobDetails._id}`} className='btn btn-success'>Apply Now</Link>
: null   

}
          </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
