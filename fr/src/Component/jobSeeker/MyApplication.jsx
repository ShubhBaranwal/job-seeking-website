import React, { useEffect ,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'
import { Context } from '../Context/context'
const MyApplication = () => {
  const [allApplicants, setAllApplicants] = useState([]);
  const { user, authorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'token': token
      }
    };

    (async function fetchApplications() {
      try {
        const response = await axios.get(
          "https://job-seeking-website-mb83.onrender.com/api/v1/application/jobseeker/getall",
          config
        );
        setAllApplicants(response.data.applications);
        console.log(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!authorized || (user && user.role !== "Job Seeker")) {
      navigate("/login");
    }
  }, [authorized, user, navigate]);

  const openPDF = (pdfURL) => {
    window.open(pdfURL, '_blank');
  };

  return (
    <div className='container-fluid'>
      <div className="row">
        <h1 className='text-center text-success'>My Applications</h1>
        {allApplicants.length > 0 ? (
          allApplicants.map((application) => (
            <div key={application.id} className="col-xl-6 col-md-6 card col-sm-12 col-12 mb-3">
              <h3>Name: <span>{application.name}</span></h3>
              <h3>Email: <span>{application.email}</span></h3>
              <h3>Phone: <span>{application.phone}</span></h3>
              <h3 className='my-4'>Address: <span>{application.address}</span></h3>
              <div className='d-flex justify-content-center gap-2'>
                <button className='btn btn-danger'>{application.applicationStatus}</button>
                <button
                  className='btn btn-success'
                  onClick={() => openPDF(`http://localhost:4000/${application.image}`)}
                >
                  View Resume
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyApplication;
