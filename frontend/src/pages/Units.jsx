import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Globe, Briefcase, Cpu } from 'lucide-react';

const units = [
  { id: 1, icon: Shield, title: "Introduction to IT Act 2000", desc: "Digital signatures & electronic records" },
  { id: 2, icon: Lock, title: "Cyber Offences & Penalties", desc: "Hacking, damage, identity theft" },
  { id: 3, icon: Database, title: "Data Protection & Privacy", desc: "SPDI Rules & Section 43A" },
  { id: 4, icon: Globe, title: "Intermediary Liability", desc: "Safe harbour & E-Governance" },
  { id: 5, icon: Briefcase, title: "Investigation & Evidence", desc: "Section 65B & digital forensics" },
  { id: 6, icon: Cpu, title: "Emerging Issues", desc: "AI, Deepfakes, Ransomware" },
];

const Units = () => {
  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl mb-8 font-display">Select a Unit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit, idx) => (
          <motion.div 
            key={unit.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card hover:border-cyan transition-colors flex flex-col relative group overflow-hidden"
          >
            {/* Progress indicator (Mocked for now) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
              <div className="h-full bg-cyan" style={{ width: '0%' }}></div>
            </div>
            
            <unit.icon className="w-12 h-12 text-cyan mb-4" />
            <h3 className="text-xl mb-2 font-semibold">Unit {unit.id}</h3>
            <p className="text-white flex-grow mb-4">{unit.title}</p>
            <p className="text-sm text-gray-400 mb-6">{unit.desc}</p>
            
            <Link to={`/quiz/${unit.id}`} className="btn-primary w-full text-center mt-auto">
              Start Quiz
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Units;
