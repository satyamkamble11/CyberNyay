import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { Trophy, Medal } from 'lucide-react';

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await api.get('/leaderboard');
        setLeaders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) return <div className="text-center py-20">Loading leaderboard...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <Trophy className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="text-4xl font-display">Global Leaderboard</h1>
        <p className="text-gray-400 mt-2">Top 20 Cyber Law Students</p>
      </div>

      <div className="glass-card overflow-hidden p-0">
        <div className="bg-white/5 p-4 flex text-sm font-semibold text-gray-400 uppercase tracking-wider">
          <div className="w-16 text-center">Rank</div>
          <div className="flex-1">Student</div>
          <div className="w-32 text-right">Streak</div>
          <div className="w-32 text-right">Total XP</div>
        </div>
        <div className="divide-y divide-white/5">
          {leaders.map((leader, idx) => {
            const isCurrentUser = user && user._id === leader._id;
            let rowClass = "flex items-center p-4 transition-colors hover:bg-white/5 ";
            if (isCurrentUser) rowClass += "bg-cyan/10 border-l-4 border-l-cyan";

            return (
              <div key={leader._id} className={rowClass}>
                <div className="w-16 text-center font-display text-xl font-bold">
                  {idx === 0 ? <Medal className="w-6 h-6 text-gold mx-auto inline" /> :
                   idx === 1 ? <Medal className="w-6 h-6 text-gray-300 mx-auto inline" /> :
                   idx === 2 ? <Medal className="w-6 h-6 text-amber-700 mx-auto inline" /> :
                   `#${idx + 1}`}
                </div>
                <div className="flex-1 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royalblue to-cyan flex items-center justify-center font-bold">
                    {leader.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{leader.name}</p>
                    <p className="text-xs text-gray-400">{leader.college || 'Anonymous College'}</p>
                  </div>
                </div>
                <div className="w-32 text-right text-gray-300">
                  {leader.streak} 🔥
                </div>
                <div className="w-32 text-right font-bold text-gold">
                  {leader.xp} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
