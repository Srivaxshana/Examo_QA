import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/admin/results';

// Get all exam results for admin
export const getAllExamResults = () => axios.get(REST_API_BASE_URL);

// Get results for a specific exam
export const getResultsByExamId = (examId) => axios.get(`${REST_API_BASE_URL}/exam/${examId}`);

// Get detailed result for a specific result ID
export const getDetailedResult = (resultId) => axios.get(`${REST_API_BASE_URL}/${resultId}`);

// Delete a result
export const deleteResult = (resultId) => axios.delete(`${REST_API_BASE_URL}/${resultId}`);