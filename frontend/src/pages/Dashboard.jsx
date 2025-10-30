import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    description: '',
  });

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [quizForm, setQuizForm] = useState({
    skillId: '',
    text: '',
    options: ['', '', '', ''],
    correctIndex: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills', skillForm);
      alert('Skill added successfully!');
      setSkillForm({ name: '', description: '' });
      setShowSkillForm(false);
      fetchSkills(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleQuizChange = (e, index) => {
    if (index !== undefined) {
      const updatedOptions = [...quizForm.options];
      updatedOptions[index] = e.target.value;
      setQuizForm({ ...quizForm, options: updatedOptions });
    } else {
      setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/questions', quizForm);
      alert('Quiz question added successfully!');
      setQuizForm({
        skillId: '',
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
      });
      setShowQuizForm(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add quiz question');
    }
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Available Skills</h3>
        {user?.role === 'admin' && (
          <div className="d-flex">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setShowSkillForm(!showSkillForm)}
            >
              {showSkillForm ? 'Cancel' : 'Add Skill'}
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={() => setShowQuizForm(!showQuizForm)}
            >
              {showQuizForm ? 'Cancel' : 'Add Quiz'}
            </button>
            <button
              className="btn btn-success"
              onClick={handleViewReports}
            >
              View Reports
            </button>
          </div>
        )}
      </div>

      {showSkillForm && (
        <form onSubmit={handleSkillSubmit} className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Add New Skill</h5>
          <div className="mb-3">
            <label className="form-label fw-semibold">Skill Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={skillForm.name}
              onChange={(e) =>
                setSkillForm({ ...skillForm, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="2"
              name="description"
              value={skillForm.description}
              onChange={(e) =>
                setSkillForm({ ...skillForm, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Skill
          </button>
        </form>
      )}

      {showQuizForm && (
        <form onSubmit={handleQuizSubmit} className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Add New Quiz Question</h5>

          <div className="mb-3">
            <label className="form-label">Select Skill</label>
            <select
              className="form-select"
              name="skillId"
              value={quizForm.skillId}
              onChange={handleQuizChange}
              required
            >
              <option value="">-- Select Skill --</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Question Text</label>
            <input
              type="text"
              className="form-control"
              name="text"
              value={quizForm.text}
              onChange={handleQuizChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Options</label>
            {quizForm.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                className="form-control mb-2"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleQuizChange(e, idx)}
                required
              />
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Correct Option (Index)</label>
            <select
              className="form-select"
              name="correctIndex"
              value={quizForm.correctIndex}
              onChange={handleQuizChange}
            >
              {[0, 1, 2, 3].map((i) => (
                <option key={i} value={i}>{`Option ${i + 1}`}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Quiz
          </button>
        </form>
      )}

      <ul className="list-group">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{skill.name}</strong>
              <p className="mb-0 text-muted small">{skill.description}</p>
            </div>
            <Link
              className="btn btn-sm btn-outline-primary"
              to={`/quiz/${skill.id}`}
            >
              Take Quiz
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
