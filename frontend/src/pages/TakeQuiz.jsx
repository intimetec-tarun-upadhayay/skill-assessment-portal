import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/apiClient';

export default function TakeQuiz() {
  const { skillId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/questions/by-skill/${skillId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error('Error fetching quiz questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [skillId]);

  const handleChange = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, selectedIndex]) => ({
        questionId: parseInt(qId),
        selectedIndex: selectedIndex,
      }));

      const res = await api.post('/quiz/submit', { skillId, answers: formattedAnswers });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error('Quiz submission failed:', err);
      alert(err.response?.data?.message || 'Failed to submit quiz.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading quiz...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Quiz</h3>

      {submitted ? (
        <div className="card p-4 text-center shadow-sm">
          <h4 className="text-primary mb-3">Your Quiz Score</h4>
          <h2 className={`fw-bold ${score >= 60 ? 'text-success' : 'text-danger'}`}>
            {score}%
          </h2>
          <p>{score >= 60 ? '🎉 Great job! You passed.' : '😞 Keep practicing and try again!'}</p>
          <button className="btn btn-outline-primary mt-3" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          {questions.length === 0 ? (
            <p>No questions found for this skill.</p>
          ) : (
            <form>
              {questions.map((q, qIndex) => (
                <div key={q.id} className="card mb-3 p-3 shadow-sm">
                  <h6 className="fw-semibold">
                    {qIndex + 1}. {q.text}
                  </h6>
                  <div className="mt-2">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${q.id}`}
                          checked={answers[q.id] === idx}
                          onChange={() => handleChange(q.id, idx)}
                        />
                        <label className="form-check-label">{opt}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success mt-3"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
