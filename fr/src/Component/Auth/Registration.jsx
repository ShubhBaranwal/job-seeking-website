import React, { useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Registration = () => {
  let { setAuthorized, setUser } = useContext(Context);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, 'Mobile must match (10 digits and start with 6, 7, 8, or 9).').required('Mobile number is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    role: Yup.string().required('Role is required')
  });

  async function handleRegistration(values, { setSubmitting }) {
    try {
      console.log(values);

      const response = await axios.post('https://job-seeking-website-mb83.onrender.com/api/v1/user/register', values);
      console.log(response);

      let { token } = response.data;
      Cookies.set('token', token, { expires: 7 });
      setAuthorized(true);
      setUser(response.data.user);
      navigate('/');

      Swal.fire({
        title: 'Success!',
        text: 'Register Successful',
        icon: 'success',
      });
      setSubmitting(false);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response ? error.response.data.message : error.message,
        icon: 'error'
      });
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        password: '',
        role: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleRegistration}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='container'>
            <div className='row bg-dark'>
              <div className='col-xl-8 p-5 col-md-8 gap-2 col-sm-12 col-12 d-flex flex-column justify-content-center m-auto text-light'>
                <label htmlFor='name'>Name</label>
                <Field type='text' name='name' className='py-1' placeholder='Enter Your Name' />
                <ErrorMessage name='name' component='div' />

                <label htmlFor='email'>Email</label>
                <Field type='text' name='email' className='py-1' placeholder='Enter Your Email' />
                <ErrorMessage name='email' component='div' />

                <label htmlFor='phone'>Phone</label>
                <Field type='text' name='phone' className='py-1' placeholder='Enter Your Phone' />
                <ErrorMessage name='phone' component='div' />

                <label htmlFor='password'>Password</label>
                <Field type='password' name='password' className='py-1' placeholder='Enter Your Password' />
                <ErrorMessage name='password' component='div' />

                <label htmlFor='role'>Choose Your Role</label>
                <Field as='select' name='role' className='py-1'>
                  <option value=''>Select Role</option>
                  <option value='Employer'>Employer</option>
                  <option value='Job Seeker'>Job Seeker</option>
                </Field>
                <ErrorMessage name='role' component='div' />

                <button type='submit' disabled={isSubmitting} className='btn btn-danger m-auto px-5 my-3'>
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
