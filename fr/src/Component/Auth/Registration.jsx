import React, { useContext, useRef } from 'react'
import axios from "axios"
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
// name, email, phone, password, role
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from "yup"

const Registration = () => {
  let {setAuthorized,setUser}=useContext(Context)
let navigate=useNavigate()

let validationSchema=Yup.object({
name:Yup.string().min(2,'name must be at least 2 characters').required('Name is Required'),
email:Yup.string().email('Invalid email Address').required('email is required'),
phone:Yup.string().matches(/^[6-9]\d{9}$/,"Mobile  must matches(10 digits and start with 7, 8, or 9.)").required('Mobile No. is Required'),
password:Yup.string().min(8,"Password must be atleast 8 Characters").required('Password is required'),
role:Yup.string().required('role is required to select')

})




async function handleRegistration(values,{setSubmitting}){
  
  try {
  console.log(values);

  const response=await axios.post("https://job-seeking-website-mb83.onrender.com/api/v1/user/register",values
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
  setSubmitting(false)
} catch (error) {
Swal.fire({
  title:'Error!',
  text:error,
  icon:'error'
})
  
}
  
}





  return (

<Formik

initialValues={{
  name:'',
  email:'',
  phone:'',
  password:'',
  role:''
}}
validationSchema={validationSchema}
onSubmit={handleRegistration}
>

{ ({isSubmitting})=>(

<Form>

  <div className='container'>
  <div className="row bg-dark ">
    <div className="col-xl-8 p-5 col-md-8 gap-2  col-sm-12 col-12 d-flex flex-column justify-content-center m-auto text-light">
    <label htmlFor="">Name</label>
    <Field type="text"  name="name" className='py-1' placeholder='Enter Your Name'/>
<ErrorMessage  name="name" component="div" />
    <label htmlFor="">Email</label>
    <Field type="text" name="email" className='py-1' placeholder='Enter Your Email' />
    <ErrorMessage  name="email" component="div" />
    
    <label htmlFor="">Phone</label>
    <Field type="text" name="phone" className='py-1' placeholder='Enter Your Phone' />
    <ErrorMessage  name="phone" component="div" />
   
    <label htmlFor="">Password</label>
    <Field type="text" name="password" className='py-1' placeholder='Enter Your Password' />
    <ErrorMessage  name="password" component="div" />

<label htmlFor="">Choose Your Role</label>
    <Field as="select" name="role" id=""  className='py-1'>
      <option value="Employer">Employeer</option>
      <option value="Job Seeker">Job Seeker</option>
      </Field>
      <button type='submit' disabled={isSubmitting} className='btn-danger btn m-auto px-5 my-3'>Register</button>
    </div>
    
  </div>
</div>

</Form>
)

}

</Formik>

  )
}

export default Registration
