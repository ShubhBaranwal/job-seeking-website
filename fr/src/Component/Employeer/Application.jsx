import React, { useRef ,useEffect} from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
const Application = ({application}) => {

    let applicationStatusRef=useRef()

    async function handleUpdateStatus(){
        

    let data={
        applicationId:application._id
        ,
        status:applicationStatusRef.current.value 
    }
    let token=Cookies.get('token')
                console.log(token);
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` ,
                'token':token
              }
            };
            console.log(data);
<<<<<<< HEAD
                let response=await axios.put("https://job-seeking-website-mb83.onrender.com/api/v1/application/employerReviewApplication",data,config)
            console.log(response);
=======

                let response=await axios.put("https://job-seeking-website-mb83.onrender.com/api/v1/application/employerReviewApplication",data,config)

>>>>>>> 6f7b437897eda7faaa325a827472c792beb39f60
          
          

          
        
    }


    const openPDF = (pdfURL) => {
        window.open(pdfURL, '_blank');
      };  

  return (
    <div className="col-xl-6 col-md-6 card col-sm-12 col-12">
    <h3>Name: <span>{application.name}</span> </h3>
    <h3>Email:  <span>{application.email}</span></h3>
    <h3>Phone: <span>{application.phone}</span></h3>
    <h3>Address: <span>{application.address}</span></h3>
    <div>
    {/* <h3 className=''> {application.applicationStatus}</h3> */}
      <select name="" id="" ref={applicationStatusRef} onChange={handleUpdateStatus}>
      {/* "pending","success","reject" */}
        <option value="pending">Pending</option>
        <option value="success">Success</option>
        <option value="reject">Reject</option>
      </select>
      </div>

    <button className='btn btn-success' onClick={() => openPDF(`https://job-seeking-website-mb83.onrender.com/${application.image}`)}>View Resume</button>

    </div>
  )
}

export default Application
