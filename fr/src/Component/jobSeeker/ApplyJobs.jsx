import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Custom Input Field Component
const CustomInput = ({ field, form, ...props }) => (
  <div className="mb-3">
    <input {...field} {...props} className='form-control' />
    <ErrorMessage name={field.name} component="div" className="text-danger mt-1" />
  </div>
);

// Custom Textarea Field Component
const CustomTextarea = ({ field, form, ...props }) => (
  <div className="mb-3">
    <textarea {...field} {...props} className='form-control' />
    <ErrorMessage name={field.name} component="div" className="text-danger mt-1" />
  </div>
);

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  coverLetter: Yup.string().required('Cover letter is required'),
  phone: Yup.string()
    .matches(/^[7-9][0-9]{9}$/, 'Invalid mobile number')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.mixed()
    .required('Resume is required')
    .test('fileType', 'Only PDF files are allowed', value => {
      return value && value.type === 'application/pdf';
    })
});

const ApplyJobs = () => {
  const token = Cookies.get('token');
  const { id: jobId } = useParams();

  // Handle Form Submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const applyJob = new FormData();

    Object.keys(values).forEach(key => {
      applyJob.append(key, values[key]);
    });
    applyJob.append('jobId', jobId);

    try {
      const res = await axios.post('https://job-seeking-website-mb83.onrender.com/api/v1/application/post', applyJob, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire({
        title: "Success",
        text: "Application Posted Successfully",
        icon: "success"
      });
      resetForm(); // Reset form fields after successful submission
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Application Posting Error",
        icon: "error"
      });
    }
    setSubmitting(false);
  };

  return (
    <div className='container py-5 my-5'>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-12">
          <h1 className='text-center mb-4'>Application Form</h1>
          <Formik
            initialValues={{
              name: '',
              email: '',
              coverLetter: '',
              phone: '',
              address: '',
              image: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <Field name="name" component={CustomInput} type="text" placeholder="Your Name" />
                <Field name="email" component={CustomInput} type="email" placeholder="Your Email" />
                <Field name="phone" component={CustomInput} type="text" placeholder="Your Phone Number" />
                <Field name="address" component={CustomInput} type="text" placeholder="Your Address" />
                <Field name="coverLetter" component={CustomTextarea} placeholder="Cover Letter ...." rows="4" />
                <div className="mb-3">
                  <input type="file" className='form-control' onChange={(event) => setFieldValue('image', event.currentTarget.files[0])} />
                  <ErrorMessage name="image" component="div" className="text-danger mt-1" />
                </div>
                <button type="submit" className='btn btn-success w-100' disabled={isSubmitting}>
                  Send Application
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobs;
