

import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../../../services/StudentService'

const StudentComponent = ({ studentId, onClose }) => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [school, setSchool] = useState('')
    const [grade, setGrade] = useState('')
    const [studentPassword, setStudentPassword] = useState('')


    const [errors, setErrors] = useState({ 
        fullName:'', 
        email:'', 
        phoneNo:'', 
        school:'', 
        grade:'', 
        studentPassword:'' })

    useEffect(() => {
        if (studentId) {
            getStudent(studentId).then(response => {
                setFullName(response.data.fullName);
                setEmail(response.data.email);
                setPhoneNo(response.data.phoneNo);
                setSchool(response.data.school);
                setGrade(response.data.grade);
                setStudentPassword(response.data.studentPassword);
            }).catch(console.error);
        }
    }, [studentId])

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        errorsCopy.fullName = fullName.trim() ? '' : 'Full name is required';
        errorsCopy.email = email.trim() ? '' : 'Email is required';
        errorsCopy.phoneNo = phoneNo.trim() ? '' : 'Phone no is required';
        errorsCopy.school = school.trim() ? '' : 'School is required';
        errorsCopy.grade = grade.trim() ? '' : 'Grade is required';
        errorsCopy.studentPassword = studentPassword.trim() ? '' : 'Password is required';

        setErrors(errorsCopy);
        return Object.values(errorsCopy).every(e => e === '');
    }

    function saveOrUpdateStudent(e) {
        e.preventDefault();

        if (validateForm()) {
            const student = { fullName, email, phoneNo, school, grade, studentPassword };

            if (studentId) {
                updateStudent(studentId, student).then(() => onClose());
            } else {
                createStudent(student).then(() => onClose());
            }
        }
    }

    return (
        <div>
            <button className="btn-close position-absolute top-0 end-0 m-2" onClick={onClose}></button>
            <h2 className="text-center">{studentId ? "Update Student" : "Add Student"}</h2>
            <form>
                

                                        <div className='form-group mb-2'>
                            <label className='form-label '> Full Name </label>
                            <input
                                type='text'
                                placeholder='Enter Full Name'
                                name='fullName'
                                value={fullName}
                                className={`form-control  ${ errors.fullName ? 'is-invalid':''}`}
                                onChange={ (e) =>setFullName(e.target.value)}
                            >
                            </input>
                            {errors.fullName && <div className='invalid-feedback'> { errors.fullName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label '> Email </label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                onChange={(e) =>setEmail(e.target.value)}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> { errors.email}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label '> Phone No </label>
                            <input
                                type='text'
                                placeholder='Enter Phone no'
                                name='phoneNo'
                                value={[phoneNo]}
                                className={`form-control ${errors.phoneNo ? 'is-invalid': ''}`}
                                onChange={(e) =>setPhoneNo(e.target.value)}
                            >
                            </input>
                            {errors.phoneNo && <div className='invalid-feedback'> { errors.phoneNo}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label '> School </label>
                            <input
                                type='text'
                                placeholder='Enter School'
                                name='school'
                                value={school}
                                className={`form-control ${errors.school ? 'is-invalid': ''}`}
                                onChange={(e) =>setSchool(e.target.value)}
                            >
                            </input>
                            {errors.school && <div className='invalid-feedback'> { errors.school}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label '> Grade </label>
                            <input
                                type='text'
                                placeholder='Enter Grade'
                                name='grade'
                                value={grade}
                                className={`form-control ${errors.grade ? 'is-invalid': ''}`}
                                onChange={(e) =>setGrade(e.target.value)}
                            >
                            </input>
                            {errors.grade && <div className='invalid-feedback'> { errors.grade}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label '> Student Password </label>
                            <input
                                type='text'
                                placeholder='Enter password'
                                name='studentPassword'
                                value={studentPassword}
                                className={`form-control ${errors.studentPassword ? 'is-invalid': ''}`}
                                onChange={(e) =>setStudentPassword(e.target.value)}
                            >
                            </input>
                            {errors.studentPassword && <div className='invalid-feedback'> { errors.studentPassword}</div>}
                        </div>

               
                <button type='button' className="btn btn-success" onClick={saveOrUpdateStudent}>Submit</button>
            </form>
        </div>
    )
}

export default StudentComponent
