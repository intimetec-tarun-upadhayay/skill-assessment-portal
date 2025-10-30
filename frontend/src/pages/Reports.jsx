import { useEffect, useState } from 'react';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function Reports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports');
      setReports(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      alert('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading reports...</div>;
  if (user?.role !== 'admin') return <div className="mt-5 text-center text-danger">Access Denied</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Quiz Reports</h3>

      {reports.length === 0 ? (
        <p>No quiz attempts found.</p>
      ) : (
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Skill</th>
              <th>Score (%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>{r.userRole}</td>
                <td>{r.skillName}</td>
                <td>{r.score}</td>
                <td>{new Date(r.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
