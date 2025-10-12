import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/HomePage/Home'
import AllExamsComponent from './pages/HomePage/AllExamsComponent'

import AdminLogin from './pages/AdminPages/AdminLogin/AdminLogin'
import AdminDashboard from './pages/AdminPages/AdminDashboard/AdminDashboard'
import ListExamsComponent from './pages/AdminPages/AdminExams/ListExamsComponent'
import ListQuestionComponent from './pages/AdminPages/AdminQuestions/ListQuestionComponent'
import AdminResultsComponent from './pages/AdminPages/AdminResultsComponent/AdminResultsComponent'
import ListStudentComponent from './pages/AdminPages/AdminStudents/ListStudentComponent'

import StudentLoginComponent from './pages/StudentPages/StudentLoginComponent/StudentLoginComponent'
import StudentDashboard from './pages/StudentPages/StudentDashboard/StudentDashboard'
import StudentAllExam from './pages/StudentPages/StudentAllExam/StudentAllExam'
import StudentQuizComponent from './pages/StudentPages/StudentQuizComponent/StudentQuizComponent'
import StudentResultComponent from './pages/StudentPages/StudentResultComponent/StudentResultComponent'

function App() {
  
  return (
    <>
    <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home/>}> </Route>
          <Route path='/home' element={<Home/>}> </Route>
          <Route path='/all-exams' element={<AllExamsComponent/>}></Route>

          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/admin-exams' element={<ListExamsComponent/>}></Route>
          <Route path='/admin-questions' element={<ListQuestionComponent/>}></Route>
          <Route path='/admin-results' element={<AdminResultsComponent />} />
          <Route path='/admin-students' element={ <ListStudentComponent/>}></Route>

          <Route path='/student/login' element={<StudentLoginComponent />} /> 
          <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>
          <Route path='/student-allexam' element={<StudentAllExam/>}></Route>
          <Route path='/student/exam/:examId' element={<StudentQuizComponent />} />
          <Route path='/student/result/:resultId' element={<StudentResultComponent />} />
        
        </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
