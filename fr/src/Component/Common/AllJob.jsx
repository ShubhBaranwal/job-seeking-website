import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AllJob = () => {
  const [AllJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(150000); // Example max salary
  const [loading, setLoading] = useState(true);

  const searchValueRef = useRef('');

  useEffect(() => {
    async function getAllJobs() {
      try {
        // let response = await axios.get("http://localhost:4000/api/v1/job/getAll");
        let response = await axios.get("https://job-seeking-website-mb83.onrender.com/api/v1/job/getAll");
        setAllJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllJobs();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [minSalary, maxSalary]);

  function handleSearch() {
    if (searchValueRef.current) {
      let value = searchValueRef.current.value.toLowerCase();
      let filtered = AllJobs.filter(job =>
        (job.title?.toLowerCase().includes(value) ||
        job.description?.toLowerCase().includes(value) ||
        job.category?.toLowerCase().includes(value) ||
        job.location?.toLowerCase().includes(value) ||
        job.country?.toLowerCase().includes(value) ||
        job.city?.toLowerCase().includes(value) ||
        (job.fixedSalary?.toString().includes(value) || '')) &&
        (job.fixedSalary >= minSalary && job.fixedSalary <= maxSalary)
      );
      setFilteredJobs(filtered);
    }
  }

  function handleMinSalaryChange(e) {
    setMinSalary(Number(e.target.value));
  }

  function handleMaxSalaryChange(e) {
    setMaxSalary(Number(e.target.value));
  }

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
    <div className='container-fluid'>
      <div className="row d-flex justify-content-center mb-3">
        <input 
          type="text" 
          placeholder='Search Job.........' 
          ref={searchValueRef} 
          onChange={handleSearch} 
          className='col-xl-4 col-md-5 col-sm-10 col-10 py-2' 
        />
      </div>
      
      <div className="row d-flex justify-content-center mb-3">
        <div className='col-xl-4 col-md-6 col-sm-10 col-10'>
          <label>Min Salary: </label>
          <input 
            type="range" 
            min="0" 
            max="100000" 
            value={minSalary} 
            onChange={handleMinSalaryChange} 
            className='form-range' 
          />
          <label>Max Salary: </label>
          <input 
            type="range" 
            min="0" 
            max="100000" 
            value={maxSalary} 
            onChange={handleMaxSalaryChange} 
            className='form-range' 
          />
          <div className="d-flex justify-content-between">
            <span>Min: {minSalary}</span>
            <span>Max: {maxSalary}</span>
          </div>
        </div>
      </div>
      
      <h1 className='text-center text-success'>All AVAILABLE JOBS</h1>

      <div className="row d-flex justify-content-evenly">
        {filteredJobs.map((job) => {
          return (
            <div key={job._id} className="card col-xl-3 col-md-4 p-3 col-sm-12 col-12">
              <h2 className='overflow-hidden'>{job.title}</h2>
              <p>Category: {job.category}</p>
              <h5>Location: {job.location}</h5>
              <h5>Salary: {job.fixedSalary}</h5>
              <Link to={`/jobDetails/${job._id}`} className='w-75 d-block m-auto btn btn-success'>Job Details</Link>
            </div> 
          );
        })}
      </div>
    </div>
  );
}

export default AllJob;
