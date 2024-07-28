import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className='row d-flex justify-content-around my-5'>
        <h1 className='text-center text-success my-5'>How JobZee Works</h1>
        <div className="col-xl-3 col-md-3 col-sm-11 col-11 m-1 p-5 card d-flex flex-column justify-content-center align-content-center">
            {/* <img src="./vite.svg" className='w-25 img-fluid m-auto' alt="" /> */}
            <FaUserPlus  className='m-auto m-auto icon'/>
            <h4 className='text-center text-success' >Create Account</h4>
            <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.</p>
        </div>
        <div className="col-xl-3 col-md-3 col-sm-11 col-11 m-1 bg-dark text-light p-5 card d-flex flex-column justify-content-center align-content-center">
            {/* <img src="./vite.svg" className='w-25 img-fluid m-auto' alt="" /> */}
            <MdFindInPage className='m-auto icon' />
            <h4 className='text-center text-success' >Find a Job/Post a Job</h4>
            <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.</p>
        </div>
        <div className="col-xl-3 col-md-3 col-sm-11 col-11 m-1 p-5 card d-flex flex-column justify-content-center align-content-center">
            {/* <img src="./vite.svg" className='w-25 img-fluid m-auto' alt="" /> */}
            <IoMdSend className='m-auto icon' />
            <h4 className='text-center text-success' >Apply For Job/Recruit Suitable Candidates</h4>
            <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.</p>
        </div>
        
    </div>
  )
}

export default HowItWorks
