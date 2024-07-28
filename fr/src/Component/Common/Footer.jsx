import React from 'react'

const Footer = () => {
  return (
    <div className='container-fluid footer   my-5 '>
      <div className="row my-5 d-flex justify-content-between">
        <div className="col-3 list-unstyled">
            <h1>Links</h1>
            <ul className='list-unstyled'>
                <li>Download Apna App</li>
                <li>Free Job Alerts</li>
                <li>Careers</li>
                <li>Contact Us</li>
                <li>Vunerability Disclosure Policy</li>
                <li>International Jobs</li>
            </ul>
        </div>
        <div className="col-3">
            <h1>Legal</h1>
            <ul className='list-unstyled'>
                <li>Privacy Policy</li>
                <li>User Terms</li>
                <li>Employer Terms of Service</li>
                <li>Employer FAQs</li>
                <li>Community Guidelines</li>
            </ul>
        </div>
        <div className="col-3">
            <h1>Resources</h1>
            <ul className='list-unstyled'>
                <li>Blog</li>
                <li>Sitemap</li>
                
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
