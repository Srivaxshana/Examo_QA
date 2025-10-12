
import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/common/NavBar/Navbar'
import ExamsCardComponent from './ExamsCardComponent';
import Footer from '../../components/common/Footer/Footer';

const Home = () => {

  const navigate = useNavigate();

    // for contact
   const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "009cad72-f1ac-4651-ba89-b34c6c9ee2b4");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST"
      ,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
          });

    const res = await response.json();

      if (res.success) {
          alert("✅ Message sent successfully!");
          event.target.reset();
        } else {
          alert("❌ Failed to send message: " + (res.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("❌ Something went wrong.");
      }
  };

  return (
    <>
    <Navbar/>
    <div>
      
      {/* Heading Section */}
      <section
        className="position-relative text-white"
        style={{
          height: '100vh', 
          backgroundImage: "url('/images/homepage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container d-flex align-items-center justify-content-end h-100">
          <div className="text-end">
            <h1 className="display-1 fw-bold mb-4">
              Learn & <br /> Upgrade <br /> Your Skills <br /> On Your <br /> Schedule
            </h1>
         
              <button 
                      className="btn btn-dark btn-lg mt-auto"
                      onClick={() => navigate('/student/login')}
              >
               <h3>Get started</h3>
              </button>
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-5">
          <h2 className="text-center mb-2 fw-bold">Our Exams</h2>
          <ExamsCardComponent /> 
      </section>

      {/* About Us Section */}
      <section id= "aboutus" className="text-white"
         style={{
          height: '100vh', 
          width: '100%',
          backgroundImage: "url('/images/AboutUs.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',       
          alignItems: 'center',         
          textAlign: 'center',
          padding: '0 2rem',  
        }}>
          <div className="row">
            <div className=" text-center mb-4">
              <h1 className="fw-bold">About Us</h1>
            </div>
          </div>
         
          
            <div className=" text-center  mb-4">
              <h2 className="mb-3"><br></br> What is Examo?</h2>
              <p><h4>
              Examo is a next-level online exam platform designed to make learning engaging and effective. We provide a wide range of 
              exams tailored to different subjects and skill levels, helping students strengthen their knowledge and track their progress.
              </h4></p>
              <p><h4>
              Our web offers interactive questions, instant feedback, and flexible exam schedules so that learners can practice anytime, 
              learn at their own pace, and achieve their academic and professional goals with confidence.
             </h4></p>
            </div>
            <br></br>
            <div className=" text-center mb-4">
              <h2 className="mb-3">Benefits and Significance of Examo?</h2>
              <p><h4>
                Examo benefits students by providing access to high-quality digital exams from anywhere, at any time. Learners can track their performance, 
                receive personalized feedback, and build confidence in their skills through structured assessments.
              </h4></p>
              <p><h4>
                It also connects students with a community of learners, making preparation more collaborative and motivating.

                Examo bridges the gap between traditional exams and modern digital learning needs, making education more accessible, affordable, and effective for everyone.
             </h4> </p>
            </div>
          
          <br></br>
          <div className="row mt-4">
            <div className="col-lg-6 text-center">
              <h2 className="mb-3">Our Mission</h2>
              <p><h4>
                To provide accessible, high-quality online exams that empower students to achieve their academic and 
                professional goals through innovative and reliable digital assessment experiences.
              </h4></p>
            </div>
            <br></br>
            <div className="col-lg-6 text-center">
              <h2 className="mb-3">Our Vision</h2>
              <p><h4>
                To become the leading global platform for online exams, fostering a world where fair, secure, and 
                effective assessments are accessible to everyone, regardless of location or background.
              </h4></p>
            </div>
          </div>
        
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-3 fw-bold">Our Team</h2>
          <div className="row justify-content-center g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card text-center shadow-sm">
                <div className="card-body" >
                   <img 
                    src="/images/member 1.png"
                    alt="Team Member" 
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                    style={{objectFit: 'cover'}}
                  />
                 
                  <h5 className="card-title">Miss. Kavitha</h5>
                  <p className="text-muted">Head</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <img 
                    src="/images/member 2.png" 
                    alt="Team Member" 
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                    style={{objectFit: 'cover'}}
                  />
                  <h5 className="card-title">Mr. John</h5>
                  <p className="text-muted">secretary</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <img 
                    src="/images/member 3.png" 
                    alt="Team Member" 
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                    style={{objectFit: 'cover'}}
                  />
                  <h5 className="card-title">Miss. Pooja</h5>
                  <p className="text-muted">Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id= "contactus" className="py-5">
        <div className="container-fluid">
          <div className="row g-0" style={{ minHeight: '50vh' }}>
            <div
              className="col-lg-6 d-flex flex-column justify-content-center text-white p-5 position-relative"
              style={{
                backgroundImage: "url('/images/contactus.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  zIndex: 1
                }}
              ></div>

              <div className='text-center' style={{ position: 'relative', zIndex: 2  }}>
                <h1 className="mb-2 fw-bold">Contact Us</h1>
                <br></br>
                <h2>
                  <div className="mb-2">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <span>Phone: 021 9876543</span>
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    <span>Email: examoweb@gmail.com</span>
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-map-marker-alt text-primary me-2"></i>
                    <span>No -24 , Navalar Road,  Jaffna</span>
                  </div>
                </h2>
              </div>
          </div>


            <div className="col-lg-6 p-5 d-flex align-items-center">
              <form   onSubmit={onSubmit}  className="w-100">
                <div className="mb-3">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    placeholder="Name" 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Email Address" 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Message</label>
                  <textarea 
                    name="message"
                    className="form-control" 
                    rows="5" 
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark w-50 ">Send Message</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};



export default Home;


