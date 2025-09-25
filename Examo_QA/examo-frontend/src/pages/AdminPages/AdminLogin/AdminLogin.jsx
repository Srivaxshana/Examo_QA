import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css';

const AdminLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();

    if (username =='admin' && password == 'admin123'){
      navigate('/admin-dashboard');  
    }else {
        setError('Invalid username or password');
    }
  }


  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      {/* <div className="container"> */}
        <div className="row justify-content-center">
          {/* <div className="col-md-6 col-lg-4"> */}
            <div className="card shadow">
              <div className="card-body p-4">
                 <div className="login-container">
                    <div className="login-left">
    
                      <div className="text-center mb-4">
                            <h1 className="h3 mb-3">
                            Examo
                            </h1>
                            <h4>Admin Login</h4>
                            <p className="text-muted">Enter your user name and password</p>
                      </div>
                            
                      {error && <div className="alert alert-danger">{error}</div>}
                                            
                      <form onSubmit={handleLogin}>
                              <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                              </div>
                              
                          
                              <button type="submit" className="btn btn-dark w-100">
                                Login
                              </button>
                      </form>
                          
                      <div className="text-center mt-3">
                        <button 
                        className="btn btn-link btn-sm"
                        onClick={() => navigate('/')}
                        >
                          ← Back to Home
                        </button>
                      </div>
                    </div>

                    <div className="login-right">
                          
                          <div className="login-illustration">
                            <div className="illustration-content">
                              
                              <div className="computer-icon">💻</div>
                              <h3>Welcome to Admin Panel</h3>
                              <p>Manage your exams, questions, and students efficiently</p>
                                <div className="features-list">
                                  <div className="feature-item">
                                    <span className="feature-icon">📝</span>
                                    <span>Create & Manage Exams</span>
                                  </div>
                                  <div className="feature-item">
                                    <span className="feature-icon">❓</span>
                                    <span>Question Bank</span>
                                  </div>
                                  <div className="feature-item">
                                    <span className="feature-icon">👥</span>
                                    <span>Student Management</span>
                                  </div>
                                  <div className="feature-item">
                                    <span className="feature-icon">📊</span>
                                    <span>Results & Analytics</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      
                    </div>
                    
                </div>
                

              </div>
            </div>
          
        </div>
      // {/* </div> */}
    
    
    
                  
  )
}

export default AdminLogin