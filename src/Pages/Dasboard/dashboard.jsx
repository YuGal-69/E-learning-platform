import React, { useState } from 'react';
import './dashboard.css';
import { Shield, Trophy, Target, Brain, Zap, Users, BookOpen, Award, TrendingUp, Clock, Star, Lock } from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    name: "Alex Chen",
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    rank: "Security Samurai",
    streak: 7,
    completedChallenges: 23,
    badges: 8
  });

  const [challenges] = useState([
    {
      id: 1,
      title: "SQL Injection Hunter",
      difficulty: "Medium",
      xp: 150,
      timeEstimate: "20 min",
      category: "Web Security",
      completed: false,
      locked: false
    },
    {
      id: 2,
      title: "Cryptography Master",
      difficulty: "Hard",
      xp: 300,
      timeEstimate: "45 min",
      category: "Cryptography",
      completed: false,
      locked: false
    },
    {
      id: 3,
      title: "Network Defender",
      difficulty: "Easy",
      xp: 100,
      timeEstimate: "15 min",
      category: "Network Security",
      completed: true,
      locked: false
    },
    {
      id: 4,
      title: "Advanced Malware Analysis",
      difficulty: "Expert",
      xp: 500,
      timeEstimate: "90 min",
      category: "Malware",
      completed: false,
      locked: true
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Sarah Kim", xp: 4520, level: 18 },
    { rank: 2, name: "Mike Johnson", xp: 3890, level: 16 },
    { rank: 3, name: "Alex Chen", xp: 2450, level: 12 },
    { rank: 4, name: "Emma Davis", xp: 2100, level: 11 },
    { rank: 5, name: "Chris Lee", xp: 1950, level: 10 }
  ]);

  return (
    <div className='container-fluid w-100 p-0'>
      <div className="dashboard">
      

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>
            Welcome back, <span className="highlight">{user.name.split(' ')[0]}</span>!
          </h2>
          <p>Ready to sharpen your cybersecurity skills today?</p>
        </section>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card purple">
            <div className="card-header">
              <div>
                <p>Level</p>
                <h3>{user.level}</h3>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}></div>
                </div>
                <span>{user.xp}/{user.nextLevelXp} XP</span>
              </div>
              <Trophy className="icon purple" />
            </div>
          </div>

          <div className="stat-card cyan">
            <div className="card-header">
              <div>
                <p>Challenges</p>
                <h3>{user.completedChallenges}</h3>
                <span>Completed</span>
              </div>
              <Target className="icon cyan" />
            </div>
          </div>

          <div className="stat-card green">
            <div className="card-header">
              <div>
                <p>Streak</p>
                <h3>{user.streak}</h3>
                <span>Days</span>
              </div>
              <Zap className="icon green" />
            </div>
          </div>

          <div className="stat-card yellow">
            <div className="card-header">
              <div>
                <p>Badges</p>
                <h3>{user.badges}</h3>
                <span>Earned</span>
              </div>
              <Award className="icon yellow" />
            </div>
          </div>
        </section>

        {/* Grid: Challenges + Sidebar */}
        <section className="dashboard-grid">
          <div className="challenges-section">
            <div className="section-box">
              <div className="section-header">
                <h3><Brain className="icon purple small" /> Active Challenges</h3>
                <button className="link">View All</button>
              </div>

              <div className="challenge-list">
                {challenges.map((ch) => (
                  <div key={ch.id} className={`challenge-card ${ch.completed ? 'completed' : ch.locked ? 'locked' : ''}`}>
                    <div className="challenge-left">
                      <h4>{ch.locked && <Lock className="icon gray small" />} {ch.title}</h4>
                      <div className={`difficulty ${ch.difficulty.toLowerCase()}`}>{ch.difficulty}</div>
                      <div className="challenge-meta">
                        <span><Trophy className="icon tiny" /> {ch.xp} XP</span>
                        <span><Clock className="icon tiny" /> {ch.timeEstimate}</span>
                        <span className="category">{ch.category}</span>
                      </div>
                    </div>
                    <button disabled={ch.locked} className={`challenge-btn ${ch.completed ? 'completed' : ch.locked ? 'locked' : 'start'}`}>
                      {ch.completed ? 'Completed' : ch.locked ? 'Locked' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sideba">
            <div className="section-box leaderboard">
              <h3><TrendingUp className="icon cyan small" /> Leaderboard</h3>
              {leaderboard.map(player => (
                <div key={player.rank} className={`leaderboard-entry ${player.name === user.name ? 'highlighted' : ''}`}>
                  <div className="rank-badge">{player.rank}</div>
                  <div>
                    <p className="leader-name">{player.name}</p>
                    <p className="level">Level {player.level}</p>
                  </div>
                  <div className="xp">
                    <p>{player.xp.toLocaleString()}</p>
                    <span>XP</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-box quick-actions">
              <h3>Quick Actions</h3>
              <button><BookOpen className="icon purple small" /> Study Materials</button>
              <button><Users className="icon cyan small" /> Join Community</button>
              <button><Star className="icon yellow small" /> Practice Lab</button>
            </div>
          </div>
        </section>
      </main>
    </div>
    </div>
    
  );
};

export default Dashboard;
