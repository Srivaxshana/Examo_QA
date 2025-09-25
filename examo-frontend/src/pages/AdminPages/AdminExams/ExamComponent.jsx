import React, { useState, useEffect } from 'react';
import { getExam, createExam, updateExam } from '../../../services/ExamService';

export const ExamComponent = ({ examId, onClose }) => {
  const [exam, setExam] = useState({
    title: '',
    subject: '',
    noOfQuestions: '',
    duration: '',
    maxMarks: '',
    description: '',
    isActive: true,
  });

  const [error, setError] = useState('');

  
  useEffect(() => {
    if (examId) {
      getExam(examId)
        .then((response) => {
          const data = response.data;
          setExam({
            title: data.title,
            subject: data.subject,
            duration: data.duration,
            noOfQuestions: data.noOfQuestions,
            maxMarks: data.maxMarks,
            description: data.description,
            isActive: data.isActive,
          });
        })
        .catch((err) => setError('Failed to load exam data.'));
    }
  }, [examId]);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExam((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...exam,
      duration: Number(exam.duration),
      maxMarks: Number(exam.maxMarks),
    };

    if (examId) {
      updateExam(examId, payload)
        .then(() => onClose())
        .catch(() => setError('Failed to update exam.'));
    } else {
      createExam(payload)
        .then(() => onClose())
        .catch(() => setError('Failed to create exam.'));
    }
  };

  return (
    <div>
      <h3 className="mb-3">{examId ? 'Edit Exam' : 'Add Exam'}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={exam.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={exam.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={exam.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">No of Questions</label>
          <input
            type="number"
            className="form-control"
            name="noOfQuestions"
            value={exam.noOfQuestions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Marks</label>
          <input
            type="number"
            className="form-control"
            name="maxMarks"
            value={exam.maxMarks}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={exam.description}
            onChange={handleChange}
            rows={3}
            required
          ></textarea>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={exam.isActive}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isActive">
            Active
          </label>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {examId ? 'Update' : 'Add'}
          </button>

        </div>
      </form>
    </div>
  );
};
