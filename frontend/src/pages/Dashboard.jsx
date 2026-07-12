import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Trophy, Star, Target, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/quiz/me');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Profile Header */}
      <div className="glass-card mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan to-royalblue flex items-center justify-center text-3xl font-display font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-400 mb-2">{user.college || 'No college provided'} • Roll No: {user.rollNumber || 'N/A'}</p>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold flex items-center">
              <Star className="w-4 h-4 mr-1" /> {user.xp} XP
            </span>
            <span className="px-3 py-1 bg-cyan/20 text-cyan rounded-full text-sm font-semibold flex items-center">
              <Trophy className="w-4 h-4 mr-1" /> Streak: {user.streak}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Quizzes */}
        <div className="glass-card">
          <h3 className="text-xl mb-4 font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-cyan" /> Recent Quizzes
          </h3>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((result) => (
                <div key={result._id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-cyan/30 transition-colors">
                  <div>
                    <p className="font-medium">Unit {result.unit}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{result.score}/{result.totalQuestions}</p>
                    <p className="text-xs text-gold">+{result.xpEarned} XP</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No quizzes taken yet.</p>
          )}
        </div>

        {/* Badges / Achievements (Placeholder) */}
        <div className="glass-card">
          <h3 className="text-xl mb-4 font-semibold">Badges Earned</h3>
          <div className="grid grid-cols-3 gap-4">
            {user.badges?.length > 0 ? (
              user.badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 bg-white/5 rounded-lg text-center">
                  <span className="text-3xl mb-2">{badge}</span>
                  <span className="text-xs text-gray-300">Achiever</span>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 py-4">
                Play quizzes to earn badges!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
