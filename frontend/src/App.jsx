import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Units from './pages/Units';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-royalblue/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-cyan/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 z-0 pointer-events-none"></div>

        <Navbar />
        
        <main className="flex-grow z-10 container mx-auto px-4 py-8 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/units" element={user ? <Units /> : <Navigate to="/login" />} />
            <Route path="/quiz/:unitId" element={user ? <Quiz /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
