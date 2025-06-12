import React from 'react';
import './challengePage.css';
import { ShieldCheck, Clock, Trophy } from 'lucide-react';

const ChallengePage = () => {
  return (
    <div className="container-fluid challenge-page">
      <div className="challenge-header">
        <h2><ShieldCheck /> SQL Injection Hunter</h2>
        <p>Category: Web Security | Difficulty: Medium</p>
      </div>

      <div className="challenge-body">
        <div className="challenge-description">
          <h4>Description</h4>
          <p>Your mission is to exploit a vulnerable login system and retrieve user data.</p>
        </div>

        <div className="challenge-meta">
          <span><Clock size={16} /> 20 min</span>
          <span><Trophy size={16} /> 150 XP</span>
        </div>

        <button className="start-btn">Launch Sandbox</button>
      </div>
    </div>
  );
};

export default ChallengePage;
