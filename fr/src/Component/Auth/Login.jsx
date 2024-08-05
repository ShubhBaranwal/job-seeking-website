import React, { useContext, useRef,useEffect } from 'react'
import axios from "axios"
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import Swal from "sweetalert2"
const Login = () => {
let navigate=useNavigate()
let {setAuthorized,authorized,setUser,user}=useContext(Context)

let emailRef=useRef()
let passwordRef=useRef()
let roleRef=useRef()



async function handleLogin(){
  let data={
    email:emailRef.current.value,
    password:passwordRef.current.value,
    role:roleRef.current.value
  }
try {
  let response=await axios.post("https://job-seeking-website-mb83.onrender.com/api/v1/user/login",data);
;
  let {token}=response.data
Cookies.set('token',token,{expires:7})
  setAuthorized(true)
 setUser(response.data.user)
  navigate("/")


  Swal.fire({
    title:'Success!',
    text:"Login Successfully",
    icon:'success',
  
  })


} catch (error) {
  console.log(error);
  Swal.fire({
    title:'Error!',
    text:"Login Failed",
    icon:'error'
  }) 
}
  
}

if(authorized && user){
  navigate("/")
}

  return (
    <div className='container my-5'>
      <div className="row bg-dark my-5">
        <div className="col-xl-8 p-5 col-md-8 gap-2  col-sm-12 col-12 d-flex flex-column justify-content-center m-auto text-light">
        <label htmlFor="">Email</label>
        <input type="text"  ref={emailRef} className='py-1' placeholder='Enter Your Email'/>

        <label htmlFor="">Password</label>
        <input type="text" ref={passwordRef} className='py-1' placeholder='Enter Your Password' />

<label htmlFor="">Choose Your Role</label>
        <select name="" id="" ref={roleRef} className='py-1'>
          <option value="Employer">Employeer</option>
          <option value="Job Seeker">Job Seeker</option>
          </select>
          <button onClick={handleLogin} className='btn-danger btn m-auto px-5 my-3'>Login</button>
        </div>
        
      </div>
    </div>
  )
}

export default Login
