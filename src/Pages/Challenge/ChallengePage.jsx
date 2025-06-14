import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Trophy,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Code2,
  FileCode,
  BookOpen,
  Users,
  MessageSquare,
  Flag,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Share2,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Progress from "../../components/common/Progress";
import "./ChallengePage.css";

const ChallengePage = () => {
  const [challenge] = useState({
    id: 1,
    title: "SQL Injection Hunter",
    difficulty: "Medium",
    xp: 150,
    timeEstimate: "20 min",
    category: "Web Security",
    description:
      "Your mission is to exploit a vulnerable login system and retrieve user data. This challenge will test your understanding of SQL injection attacks and how to prevent them.",
    objectives: [
      "Bypass the login form using SQL injection",
      "Extract user credentials from the database",
      "Identify and fix the vulnerability",
    ],
    prerequisites: [
      "Basic understanding of SQL",
      "Knowledge of web application security",
      "Familiarity with browser developer tools",
    ],
    hints: [
      "Try using single quotes in the input fields",
      "Look for error messages that might reveal the database structure",
      "Consider using UNION-based attacks",
    ],
    resources: [
      {
        title: "SQL Injection Cheat Sheet",
        type: "PDF",
        url: "#",
      },
      {
        title: "Web Security Fundamentals",
        type: "Video",
        url: "#",
      },
    ],
    status: "in_progress", // not_started, in_progress, completed
    progress: 45,
    attempts: 2,
    bestScore: 75,
  });

  const [activeTab, setActiveTab] = useState("description");
  const [showHints, setShowHints] = useState(false);
  const [isLabRunning, setIsLabRunning] = useState(false);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "#00ffea",
      Medium: "#ffd700",
      Hard: "#ff4d4d",
      Expert: "#ff00ff",
    };
    return colors[difficulty] || colors.Medium;
  };

  return (
    <div className="challenge-page">
      <div className="challenge-container">
        {/* Challenge Header */}
        <div className="challenge-header">
          <div className="challenge-title">
            <h1>
              <ShieldCheck className="icon" />
              {challenge.title}
            </h1>
            <div className="challenge-meta">
              <span className="category">{challenge.category}</span>
              <span
                className="difficulty"
                style={{ color: getDifficultyColor(challenge.difficulty) }}
              >
                {challenge.difficulty}
              </span>
              <span className="xp">
                <Trophy className="icon" />
                {challenge.xp} XP
              </span>
              <span className="time">
                <Clock className="icon" />
                {challenge.timeEstimate}
              </span>
            </div>
          </div>
          <div className="challenge-actions">
            <Button
              variant="primary"
              icon={isLabRunning ? <Pause /> : <Play />}
              onClick={() => setIsLabRunning(!isLabRunning)}
            >
              {isLabRunning ? "Pause Lab" : "Launch Lab"}
            </Button>
            <Button variant="outline" icon={<Share2 />}>
              Share
            </Button>
          </div>
        </div>

        {/* Challenge Progress */}
        <Card className="progress-card">
          <div className="progress-header">
            <h3>Your Progress</h3>
            <span className="status-badge">
              {challenge.status === "completed" && (
                <CheckCircle2 className="icon" />
              )}
              {challenge.status === "in_progress" && (
                <AlertTriangle className="icon" />
              )}
              {challenge.status === "not_started" && <Lock className="icon" />}
              {challenge.status.replace("_", " ")}
            </span>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="label">Progress</span>
              <Progress
                value={challenge.progress}
                max={100}
                variant="success"
                size="md"
                showLabel
              />
            </div>
            <div className="stat">
              <span className="label">Attempts</span>
              <span className="value">{challenge.attempts}</span>
            </div>
            <div className="stat">
              <span className="label">Best Score</span>
              <span className="value">{challenge.bestScore}%</span>
            </div>
          </div>
        </Card>

        {/* Challenge Content */}
        <div className="challenge-content1">
          {/* Navigation Tabs */}
          <div className="challenge-tabs">
            <button
              className={`tab ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              <BookOpen className="icon" />
              Description
            </button>
            <button
              className={`tab ${activeTab === "objectives" ? "active" : ""}`}
              onClick={() => setActiveTab("objectives")}
            >
              <Flag className="icon" />
              Objectives
            </button>
            <button
              className={`tab ${activeTab === "resources" ? "active" : ""}`}
              onClick={() => setActiveTab("resources")}
            >
              <FileCode className="icon" />
              Resources
            </button>
            <button
              className={`tab ${activeTab === "discussion" ? "active" : ""}`}
              onClick={() => setActiveTab("discussion")}
            >
              <MessageSquare className="icon" />
              Discussion
            </button>
          </div>

          {/* Tab Content */}
          <Card className="tab-content">
            {activeTab === "description" && (
              <div className="description-content">
                <p>{challenge.description}</p>
                <div className="prerequisites">
                  <h4>Prerequisites</h4>
                  <ul>
                    {challenge.prerequisites.map((prereq, index) => (
                      <li key={index}>
                        <ChevronRight className="icon" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hints">
                  <h4>
                    Hints
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHints(!showHints)}
                    >
                      {showHints ? <ChevronDown /> : <ChevronRight />}
                    </Button>
                  </h4>
                  {showHints && (
                    <ul>
                      {challenge.hints.map((hint, index) => (
                        <li key={index}>
                          <AlertTriangle className="icon" />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {activeTab === "objectives" && (
              <div className="objectives-content">
                <h4>Learning Objectives</h4>
                <ul>
                  {challenge.objectives.map((objective, index) => (
                    <li key={index}>
                      <CheckCircle2 className="icon" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="resources-content">
                <h4>Learning Resources</h4>
                <div className="resources-grid">
                  {challenge.resources.map((resource, index) => (
                    <Card key={index} className="resource-card">
                      <div className="resource-icon">
                        {resource.type === "PDF" ? <FileCode /> : <BookOpen />}
                      </div>
                      <div className="resource-info">
                        <h5>{resource.title}</h5>
                        <span className="resource-type">{resource.type}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="icon" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="discussion-content">
                <div className="discussion-header">
                  <h4>Community Discussion</h4>
                  <Button variant="primary" icon={<MessageSquare />}>
                    Start Discussion
                  </Button>
                </div>
                <div className="discussion-placeholder">
                  <Users className="icon" />
                  <p>
                    Join the discussion to share your thoughts and get help from
                    the community.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Lab Environment */}
        {isLabRunning && (
          <Card className="lab-environment">
            <div className="lab-header">
              <h3>
                <Terminal className="icon" />
                Lab Environment
              </h3>
              <div className="lab-actions">
                <Button variant="ghost" size="sm" icon={<RotateCcw />}>
                  Reset
                </Button>
                <Button variant="ghost" size="sm" icon={<Upload />}>
                  Submit
                </Button>
              </div>
            </div>
            <div className="lab-content">
              <div className="code-editor">
                <div className="editor-header">
                  <span className="file-name">vulnerable_login.php</span>
                </div>
                <pre>
                  <code>
                    {`<?php
// Vulnerable login system
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
          WHERE username = '$username' 
          AND password = '$password'";

$result = mysql_query($query);
if(mysql_num_rows($result) > 0) {
    echo "Login successful!";
} else {
    echo "Invalid credentials";
}
?>`}
                  </code>
                </pre>
              </div>
              <div className="lab-output">
                <div className="output-header">
                  <span>Output</span>
                </div>
                <div className="output-content">
                  <p>Ready to test your SQL injection skills...</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
