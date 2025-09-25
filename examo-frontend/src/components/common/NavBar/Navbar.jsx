
import React from 'react';
import { useNavigate } from "react-router-dom";



const Navbar = () => {

    const navigate = useNavigate();
    

    const goToHome = () => {
    navigate("/Home"); 
  };


  return (
    <div>
        <header>

            <nav className="navbar navbar-expand-lg  bg-dark px-3 fs-5 fixed-top">
                <h2><a className="navbar-brand navbar-dark fw-bold fs-3">Examo</a></h2>
                <div className="justify-content-center" >

                  <button type="button" className="btn btn-dark ms-2" onClick={() => navigate('/admin-login')} ><h5>Admin</h5></button>
                  <button type="button" className="btn btn-dark"  onClick={() => navigate('/student/login')}> <h5>Student</h5> </button>

                  &nbsp;&nbsp;
                  &nbsp;&nbsp;

                  
                  <button type="button" className="btn btn-dark"  onClick={goToHome} ><h5> Home </h5></button>

                  <a href="#aboutus">
                  <button type="button" className="btn btn-dark" > <h5>About Us</h5> </button>
                  </a>

                  <a href="#contactus">
                  <button type="button" className="btn btn-dark" > <h5>Contact Us</h5> </button>
                  </a>
                </div>
              
            </nav>

        </header>

    </div>
  )
}




export default Navbar