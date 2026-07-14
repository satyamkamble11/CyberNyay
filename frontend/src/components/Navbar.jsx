import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Scale, LogOut, User, Trophy, BookOpen } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="text-cyan w-8 h-8" />
            <span className="font-display text-xl tracking-wider text-white">IT ACT <span className="text-cyan">QUIZ</span></span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link to="/units" className="text-gray-300 hover:text-cyan flex items-center transition-colors">
                  <BookOpen className="w-4 h-4 mr-1" /> Units
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-300 hover:text-cyan flex items-center transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/leaderboard" className="text-gray-300 hover:text-cyan flex items-center transition-colors">
                  <Trophy className="w-4 h-4 mr-1" /> Leaderboard
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-cyan flex items-center transition-colors">
                  <User className="w-4 h-4 mr-1" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-red-400 flex items-center transition-colors">
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/leaderboard" className="text-gray-300 hover:text-cyan flex items-center transition-colors">
                  <Trophy className="w-4 h-4 mr-1" /> Leaderboard
                </Link>
                <Link to="/login" className="text-gray-300 hover:text-cyan transition-colors">Login</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
