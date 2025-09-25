import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/student';

// Get all available exams for students
// export const getAvailableExams = () => axios.get(`${REST_API_BASE_URL}/exams`);
export const authenticateStudent = (credentials) => axios.post(`${REST_API_BASE_URL}/login`, credentials);


// Get a specific exam for taking (without correct answers)
export const getExamForStudent = (examId) => axios.get(`${REST_API_BASE_URL}/exam/${examId}`);

// Submit exam answers
export const submitExam = (examId, submission) => axios.post(`${REST_API_BASE_URL}/exam/${examId}/submit`, submission);

// Get exam result by result ID
export const getExamResult = (resultId) => axios.get(`${REST_API_BASE_URL}/result/${resultId}`);