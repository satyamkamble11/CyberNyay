import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, ChevronRight, Shield, Database, Globe, Lock, Briefcase, Cpu } from 'lucide-react';

const features = [
  { icon: Shield, title: "Unit 1: Intro to IT Act", desc: "Basics of electronic records & signatures" },
  { icon: Lock, title: "Unit 2: Cyber Offences", desc: "Penalties for hacking & damage" },
  { icon: Database, title: "Unit 3: Data Protection", desc: "Privacy & Sensitive Data" },
  { icon: Globe, title: "Unit 4: Intermediaries", desc: "Safe harbour & E-Governance" },
  { icon: Briefcase, title: "Unit 5: Investigation", desc: "Evidence & forensics" },
  { icon: Cpu, title: "Unit 6: Emerging Issues", desc: "Ransomware, AI & Deepfakes" },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 bg-cyan/10 p-4 rounded-full"
        >
          <Scale className="w-16 h-16 text-cyan" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-4xl md:text-6xl mb-4 leading-tight"
        >
          Master Cyber Law.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-royalblue">Ace Your Exams.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 max-w-2xl text-lg mb-10"
        >
          An interactive gamified platform designed for law and tech students to master the Information Technology Act, 2000 through structured quizzes and leaderboards.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex space-x-4"
        >
          <Link to="/units" className="btn-primary flex items-center">
            Start Quiz <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
          <Link to="/leaderboard" className="btn-outline">
            View Leaderboard
          </Link>
        </motion.div>
      </section>

      {/* Units Preview */}
      <section className="w-full max-w-6xl py-12">
        <h2 className="text-2xl mb-8 text-center">Comprehensive 6-Unit Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="glass-card flex flex-col items-start hover:border-cyan/50 transition-colors cursor-pointer group"
            >
              <feat.icon className="w-10 h-10 text-royalblue mb-4 group-hover:text-cyan transition-colors" />
              <h3 className="text-lg mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
