import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Hash, GraduationCap } from 'lucide-react';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', email: '', password: '', rollNumber: '', college: '' 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-8">
      <div className="glass-card w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Create Account</h2>
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="text" name="name" placeholder="Full Name" className="input-field pl-10" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="email" name="email" placeholder="Email Address" className="input-field pl-10" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="password" name="password" placeholder="Password" className="input-field pl-10" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="relative">
            <Hash className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="text" name="rollNumber" placeholder="Roll Number (Optional)" className="input-field pl-10" value={formData.rollNumber} onChange={handleChange} />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input type="text" name="college" placeholder="College / University (Optional)" className="input-field pl-10" value={formData.college} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary w-full mt-6">Register</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-cyan hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
