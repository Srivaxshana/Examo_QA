import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/questions';


export const listQuestions=() => axios.get(REST_API_BASE_URL);

export const createQuestion =(question) => axios.post(REST_API_BASE_URL, question);

export const getQuestion =(questionId) => axios.get(REST_API_BASE_URL +'/'+ questionId);

export const updateQuestion =(questionId, question) => axios.put(REST_API_BASE_URL +'/'+ questionId, question);

export const deleteQuestion =(questionId) => axios.delete(REST_API_BASE_URL+'/'+questionId);


export const getQuestionsByExamId = (examId) => axios.get(REST_API_BASE_URL + '/exam/' + examId);

