import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import MyJob from './MyJob';

const MyJobs = () => {
    const [myJobs, setMyJobs] = useState([]);
    const navigate = useNavigate();
    const { user, authorized ,refresh} = useContext(Context);


    useEffect(() => {
        if (!authorized || (user && user.role !== "Employer")) {
            navigate("/login");
        }
    }, [authorized, user, navigate]);

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                let token = Cookies.get('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'token': token
                    }
                };
                let response = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", config);
                setMyJobs(response.data.myJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        getMyJobs();
    
    }, [refresh]);

    

    const handleEditJob = (jobId) => {
        console.log(jobId);
        // Implement your edit functionality here
    };

    return (
        <div className='container-fluid myJob'>
            <div className="row d-flex">
                <h1 className='text-center text-success'>Your Posted Jobs</h1>
                {myJobs.map((job) => (
                     <MyJob  job={job} key={job._id}/>
                ))}
            </div>
        </div>
    );
};

export default MyJobs;
