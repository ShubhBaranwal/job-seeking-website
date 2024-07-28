import React from 'react'
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";


const PopularCompany = () => {
  
        const companies = [
          {
            id: 1,
            title: "Microsoft",
            location: "Street 10 alambagh lucknow",
            openPositions: 10,
            icon: <FaMicrosoft className='icon' />,
          },
          {
            id: 2,
            title: "Tesla",
            location: "sector 10 noida",
            openPositions: 5,
            icon: <SiTesla className='icon' />,
          },
          {
            id: 3,
            title: "Apple",
            location: "gomti nagar lucknow",
            openPositions: 20,
            icon: <FaApple  className='icon'/>,
          },
        ];
    return (
    <div className='row my-3 d-flex justify-content-between my-5'>
        <h1 className='text-center text-success my-3'>TOP COMPANIES</h1>
{companies.map((com)=>{
    return     <div key={com.id} className="col-xl-3 col-md-3 col-sm-12 col-12 p-2 m-2  d-flex gap-4 justify-content-center  text-center bg-light border-5 border-success">
    {/* <img src="./vite.svg" width="34px" className='img-fluid' alt="" /> */}
<div>
<p className='text-center'>{com.icon}</p>
    <h3>{com.title}</h3>
    <p>{com.location}</p>
    <button className='btn btn-light text-success border-1 fw-bold border-success'>Open Position {com.openPositions}</button>
    </div>
</div>

})

}

    
    </div>
  )
}

export default PopularCompany
