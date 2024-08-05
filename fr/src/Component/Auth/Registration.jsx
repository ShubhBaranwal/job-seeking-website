import React, { useContext, useRef } from 'react'
import axios from "axios"
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
// name, email, phone, password, role
import Cookies from "js-cookie"
import Swal from "sweetalert2"

const Registration = () => {
let {setAuthorized,setUser}=useContext(Context)
let navigate=useNavigate()
  let nameRef=useRef()
let emailRef=useRef()
let phoneRef=useRef()
let passwordRef=useRef()
let roleRef=useRef()
async function handleRegistration(){
  // name, email, phone, password, role

let sendData={
     name:nameRef.current.value,
    email:emailRef.current.value,
    phone:phoneRef.current.value,
    password:passwordRef.current.value,
    role:roleRef.current.value
}
console.log(sendData);
try {
  const response=await axios.post("https://job-seeking-website-mb83.onrender.com/api/v1/user/register",sendData,
)
let {token}=response.data
Cookies.set('token',token,{expires:7})
setAuthorized(true)
console.log(response);
setUser(response.data.user)
  navigate("/")

  Swal.fire({
    title:'Success!',
    text:"Regter Successfull",
    icon:'success',
  
  })
} catch (error) {
  
Swal.fire({
  title:'Error!',
  text:error,
  icon:'error'
})

}


}



  return (
    <div className='container'>
    <div className="row bg-dark ">
      <div className="col-xl-8 p-5 col-md-8 gap-2  col-sm-12 col-12 d-flex flex-column justify-content-center m-auto text-light">
      <label htmlFor="">Name</label>
      <input type="text"  ref={nameRef} className='py-1' placeholder='Enter Your Name'/>

      <label htmlFor="">Email</label>
      <input type="text" ref={emailRef} className='py-1' placeholder='Enter Your Email' />
      <label htmlFor="">Phone</label>
      <input type="text" ref={phoneRef} className='py-1' placeholder='Enter Your Phone' />
      <label htmlFor="">Password</label>
      <input type="text" ref={passwordRef} className='py-1' placeholder='Enter Your Password' />

<label htmlFor="">Choose Your Role</label>
      <select name="" id="" ref={roleRef} className='py-1'>
        <option value="Employer">Employeer</option>
        <option value="Job Seeker">Job Seeker</option>
        </select>
        <button onClick={handleRegistration} className='btn-danger btn m-auto px-5 my-3'>Register</button>
      </div>
      
    </div>
  </div>

  )
}

export default Registration
