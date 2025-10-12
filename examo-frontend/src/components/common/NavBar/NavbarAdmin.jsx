
import React from 'react'
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const navigator = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark px-3 fs-5">

          <div className="d-flex align-items-center">
               <img 
                 src="/images/icon.png" 
                 alt="Team Member" 

                 width="200"
                 height="50"
                 style={{objectFit: 'cover'}}
               />
                <div className="d-flex align-items-center" ></div>
            {/* <h2 className="mb-0">
              <a className="navbar-brand navbar-dark fw-bold fs-3 text-white">
                Examo
              </a>
            </h2> */}
            <span className="text-white ms-3">
              <h5 className="mb-0">Admin Panel</h5>
            </span>
          </div>

          <div className="ms-auto d-flex align-items-center gap-3">
            <button className="btn btn-danger btn-sm" onClick={() => navigator('/Home')}>
             <h5>Log Out</h5> 
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavbarAdmin
