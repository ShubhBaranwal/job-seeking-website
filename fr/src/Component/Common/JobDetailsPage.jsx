import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../Context/context';

const JobDetailsPage = () => {
  const { user, authorized, loading, setLoading } = useContext(Context);
  const [jobDetails, setJobDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://job-seeking-website-mb83.onrender.com/api/v1/job/getJobDetails/${id}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      } finally {
        setLoading(false);
      }
    };
    getJobDetails();
  }, [id, setLoading]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container p-5'>
      <h1 className='text-center text-success my-3'>Job Details</h1>
      <div className="row d-flex flex-column ">
        <div className="col-12 p-5 shadow-lg">
          <h5 className='mb-2'><span className='text-success h4'>Title: </span>{jobDetails.title}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Category: </span>{jobDetails.category}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Country: </span>{jobDetails.country}</h5>
          <h5 className='mb-2'><span className='text-success h4'>City: </span>{jobDetails.city}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Location: </span>{jobDetails.location}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Description: </span>{jobDetails.description}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Job Posted On: </span>{jobDetails.jobPostedOn}</h5>
          <h5 className='mb-2'><span className='text-success h4'>Salary: </span>{jobDetails.fixedSalary}</h5>
          {authorized && user && user.role === "Job Seeker" && (
            <Link to={`/applyJob/${jobDetails._id}`} className='btn btn-success'>Apply Now</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
