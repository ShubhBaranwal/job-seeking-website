import React, { useState, useRef, useContext } from 'react'
import Cookies from "js-cookie";
import axios from "axios"
import { Context } from '../Context/context';
// import { updateJob } from '../../../../backend/controllers/jobController';
const MyJob = ({ job }) => {
    console.log(job);
    let token = Cookies.get('token');
    let {setRefresh,refresh}=useContext(Context)
    let [edit, setEdit] = useState(false)


    const [editedJob, setEditedJob] = useState({
        title: job.title,
        category: job.category,
        country: job.country,
        city: job.city,
        fixedSalary: job.fixedSalary,
        description: job.description,
        location: job.location,
        salaryFrom:job.salaryFrom,
        salaryTo:job.salaryTo

    });

    const handleEditJob = (jobId) => {
        setEdit(!edit)


    };

    const { title, category, country, description, city, fixedSalary, location,salaryFrom,salaryTo } = editedJob


    function handleInputChange(e) {
        setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
    }


    const handleDelete = async (jobId) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'token': token
                }
            };

let response= await axios.delete(`https://job-seeking-website-mb83.onrender.com/${jobId}`, config);
            setRefresh(true)

            // setMyJobs(myJobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

async function handleUpdate(){
    console.log("item id",job._id);
    console.log(editedJob);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'token': token
            }
        }

let response=await axios.put(`https://job-seeking-website-mb83.onrender.com/api/v1/job/update/${job._id}`,editedJob,config)
console.log(response);
setRefresh(!refresh)    
handleEditJob()

} catch (error) {
        
    }
    

}












    return (
        <div className="col-xl-12 col-md-12 col-sm-12 col-12 my-3" key={job._id}>
            <div className="row  ps-2 d-flex justify-content-around">
                <div className="col-xl-4 col-md-4 col-sm-6 col-6 ">
                    <h4>Title</h4>
                    {edit ? <input value={title} placeholder='update Your Title' onChange={handleInputChange} name='title' /> :

                        <p>{job.title}</p>
                    }
                    <h4>Category</h4>
                    {edit ? <input value={category} placeholder='update Your category' onChange={handleInputChange} name='category' /> :

                        <p>{job.category}</p>
                    }
                    <h4>Country</h4>
                    {edit ? <input value={country} placeholder='update Your country' onChange={handleInputChange} name='country' /> :

                        <p>{job.country}</p>
                    }
                    <h4>City</h4>
                    {edit ?<> 
                    
                    <input value={city} placeholder='update Your city' onChange={handleInputChange} name='city' />
                    </> :

                        <p>{job.city}</p>
                    }
                    <h4>Salary</h4>
                    {edit ?<>
                    {job.fixedSalary ? <input value={fixedSalary} placeholder='update Your fixed salary' onChange={handleInputChange} name='fixedSalary' /> : <> 
                  <input value={salaryFrom} placeholder='update Your Salary From' onChange={handleInputChange} name='salaryFrom' /> 
                  <input value={salaryTo} placeholder='update Your Salary To' onChange={handleInputChange} name='salaryTo' />
                  </>
                    }
                    
                    </>  :
<>
                        <p>{job.fixedSalary}</p>
                        <p>{job.salaryFrom} - {job.salaryTo}</p>
                        
                        </>
                    }
                    <h4>Expired</h4>
                    <p>{job.expired.toString()}</p>
                </div>
                <div className=" col-xl-8 col-md-8 col-sm-6 col-6">
                    <h4>Description</h4>
                    {edit ? <input value={description} placeholder='update Your description' onChange={handleInputChange} name='description' /> :

                        <p>{job.description}</p>
                    }
                    <h4>Location:</h4>
                    {edit ? <input value={location} placeholder='update Your location' onChange={handleInputChange} name='location' /> :

                        <p>{job.location}</p>
                    }
                    <div className='d-flex gap-3'>
                        {edit ? <button className='my-4 btn btn-warning'  onClick={handleUpdate}>Update</button>
                            : <>
                                <button className='btn btn-warning' onClick={() => handleEditJob(job._id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(job._id)}>Delete</button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}
export default MyJob
