import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/exams';

export const listExams=() => axios.get(REST_API_BASE_URL);

export const createExam =(exam)=> axios.post(REST_API_BASE_URL, exam);

export const getExam = (examId) => axios.get(REST_API_BASE_URL+'/'+examId);


export const updateExam = (examId, exam) => axios.put(REST_API_BASE_URL+'/'+ examId, exam);

export const deleteExam = (examId) => axios.delete(REST_API_BASE_URL+'/'+examId);