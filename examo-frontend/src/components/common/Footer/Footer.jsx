import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
         
          <div className="col-lg-4 mb-3">
            {/* <h1 className="text">Examo</h1> */}
             <img 
               src="/images/icon.png" 
               alt="Team Member" 

               width="200"
               height="75"
               style={{objectFit: 'cover'}}
             />
            <p className="small"><h5>
              Examo is an online exam platform 
              enabling secure tests, instant results,
              and progress tracking for students,
              while offering teachers easy exam
              management, question banks, and
              detailed performance analysis for
              modern assessments.
            </h5></p>
          </div>

          
          <div className="col-lg-4 mb-3">
            <h4>Quick Links</h4>
            <h5>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-light text-decoration-none">Home</a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">About Us</a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">Contact Us</a>
              </li>
            </ul>
            </h5>
          </div>

          
          <div className="col-lg-4 mb-3">
            <h4>Get In Touch</h4>
            <p className="small"><h5>
              No -24 , Navalar Road, Jaffna<br />
              Phone: 021 9876543<br />
              Email: examoweb@gmail.com
            </h5></p>
          </div>
        </div>

        <hr className="my-4" />


        <div className="text-center">
          <p className="small mb-0"><h6>
            © 2025 Examo. All rights reserved. | Privacy Policy | Terms of Service
          </h6></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
