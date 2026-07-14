import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      // Attempt call to backend if implemented. Backend may return 404 if not present.
      await api.post('/auth/forgot-password', { email });
      setStatus({ type: 'success', message: 'If this email exists, a reset link has been sent.' });
    } catch (err) {
      // Don't reveal whether email exists. Show friendly message.
      const msg = err.response?.data?.message || 'If this email exists, a reset link has been sent.';
      setStatus({ type: 'success', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-8">
      <div className="glass-card w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Forgot Password</h2>
        {status.message && (
          <div className={`p-3 rounded mb-4 text-sm text-center ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your account email"
              className="input-field pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-6" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
