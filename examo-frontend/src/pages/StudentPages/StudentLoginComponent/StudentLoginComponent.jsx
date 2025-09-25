import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateStudent } from '../../../services/StudentExamService'
import './StudentLoginComponent.css';

const StudentLoginComponent = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await authenticateStudent(credentials)
      const loginData = response.data

      if (loginData.studentId) {
        // Store student info in sessionStorage or localStorage
        sessionStorage.setItem('studentData', JSON.stringify({
          studentId: loginData.studentId,
          fullName: loginData.fullName,
          email: loginData.email,
          school: loginData.school,
          grade: loginData.grade
        }))
        
        // Navigate to exams list
        
        navigate('/student-dashboard')
      } else {
        setError(loginData.message || 'Login failed')
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
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
                        {/* Header */}
                        <div className="text-center mb-4">
                        <h1 className="h3 mb-3">
                        Examo
                        </h1>
                        <h4>Student Login</h4>
                        <p className="text-muted">Enter your credentials to take exams</p>
                        </div>

                        {/* Error  */}
                        {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        )}

                        {/* Login form */}
                        <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >
                            {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Logging in...
                            </>
                            ) : (
                            'Login'
                            )}
                        </button>
                        </form>

                        
                        <div className="text-center mt-4">
                        <small className="text-muted">
                            Don't have access? Contact your administrator
                        </small>
                        </div>
                        
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
                          <h3>Welcome to Student Panel</h3>
                          <p>Access your exams, track your progress, and view results with ease</p>
                            <div className="features-list">
                              <div className="feature-item">
                                <span className="feature-icon">📘</span>
                                <span> Take Exams</span>
                              </div>
                              <div className="feature-item">
                                <span className="feature-icon">✍️</span>
                                <span> Practice with Question Bank</span>
                              </div>
                              <div className="feature-item">
                                <span className="feature-icon">👥</span>
                                <span> Profile & Settings</span>
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

  )
}

export default StudentLoginComponent