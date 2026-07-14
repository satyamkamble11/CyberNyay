import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchUsers();
  }, [user]);

  const toggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'student' : 'admin';
    try {
      await api.put(`/admin/users/${u._id}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update role');
    }
  };

  const resetPassword = async (u) => {
    const pw = prompt(`Enter new password for ${u.email} (min 6 chars)`);
    if (!pw) return;
    if (pw.length < 6) return alert('Password must be at least 6 characters');
    try {
      await api.put(`/admin/users/${u._id}/reset-password`, { password: pw });
      alert('Password updated');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset password');
    }
  };

  const deleteUser = async (u) => {
    if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${u._id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (user?.role !== 'admin') return <div className="p-8">Not authorized</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin — User Management</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div>Loading users…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => toggleRole(u)} className="px-2 py-1 bg-cyan/10 rounded text-sm">Toggle Role</button>
                    <button onClick={() => resetPassword(u)} className="px-2 py-1 bg-yellow-100 rounded text-sm">Reset Password</button>
                    <button onClick={() => deleteUser(u)} className="px-2 py-1 bg-red-100 rounded text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
