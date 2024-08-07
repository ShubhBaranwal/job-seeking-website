import React, { useContext, useRef,useEffect } from 'react'
import axios from "axios"
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import {Formik,Field,Form,ErrorMessage} from "formik";
import * as Yup from "yup"
const Login = () => {

const validationSchema=Yup.object({
  email:Yup.string().email('Invalid Email Address').required('email is required'),
  password:Yup.string().min(8,'Password must be at least 8 characters').required('Password is required'),
  role:Yup.string().required('Role is Required for login')
  
})




let navigate=useNavigate()
let {setAuthorized,authorized,setUser,user}=useContext(Context)

// let emailRef=useRef()
// let passwordRef=useRef()
// let roleRef=useRef()


async function handleLogin(values,{setSubmitting}){

try {
  
  let response=await axios.post("https://job-seeking-website-mb83.onrender.com/api/v1/user/login",values);
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
  
setSubmitting(false)
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

<Formik
initialValues={{
  email:'',
  password:'',
  role:'Employer'
  
}}
validationSchema={validationSchema}
onSubmit={handleLogin}
>

{({isSubmitting})=>(

  <Form>
  <div className='container my-5'>
  <div className="row bg-dark my-5">
    <div className="col-xl-8 p-5 col-md-8 gap-2  col-sm-12 col-12 d-flex flex-column justify-content-center m-auto text-light">
    <label htmlFor="">Email</label>
    <Field type="text"   className='py-1' placeholder='Enter Your Email' name='email'/>
<ErrorMessage  name='email' component='div'/>

    <label htmlFor="">Password</label>
    <Field type="text"  className='py-1' placeholder='Enter Your Password' name="password" />
<ErrorMessage  name='password' component="div"/>

<label htmlFor="">Choose Your Role</label>
    <Field as="select" name="role" id=""  className='py-1'>
      <option value="Employer">Employeer</option>
      <option value="Job Seeker">Job Seeker</option>
      </Field>
<ErrorMessage  name='role' component="div"/>

      <button type='submit' disabled={isSubmitting} className='btn-danger btn m-auto px-5 my-3'>Login</button>
    </div>
    
  </div>
</div> 
  </Form>
)

}

</Formik>

  )
}

export default Login
