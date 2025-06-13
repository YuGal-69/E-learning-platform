import React, { useState } from "react";
import {
  Terminal,
  Code2,
  Server,
  Network,
  Shield,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Share2,
  Settings,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Star,
  Bookmark,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Progress from "../../components/common/Progress";
import "./PracticeLab.css";

const PracticeLab = () => {
  const [labs] = useState([
    {
      id: 1,
      title: "Network Scanning Lab",
      description:
        "Practice network scanning techniques using Nmap and other tools in a safe environment.",
      category: "Network Security",
      difficulty: "Intermediate",
      duration: "45 min",
      enrolled: 856,
      rating: 4.8,
      status: "in_progress",
      progress: 65,
      tools: ["Nmap", "Wireshark", "tcpdump"],
      objectives: [
        "Perform network discovery scans",
        "Identify open ports and services",
        "Analyze network traffic",
      ],
      environment: {
        type: "Virtual Network",
        os: "Linux",
        tools: ["Nmap", "Wireshark", "tcpdump"],
        resources: {
          cpu: "2 cores",
          memory: "4GB",
          storage: "20GB",
        },
      },
    },
    {
      id: 2,
      title: "Web Application Testing",
      description:
        "Test and exploit common web vulnerabilities in a controlled environment.",
      category: "Web Security",
      difficulty: "Advanced",
      duration: "60 min",
      enrolled: 1234,
      rating: 4.9,
      status: "not_started",
      progress: 0,
      tools: ["Burp Suite", "OWASP ZAP", "SQLMap"],
      objectives: [
        "Identify SQL injection vulnerabilities",
        "Test for XSS vulnerabilities",
        "Perform CSRF attacks",
      ],
      environment: {
        type: "Web Application",
        os: "Linux",
        tools: ["Burp Suite", "OWASP ZAP", "SQLMap"],
        resources: {
          cpu: "4 cores",
          memory: "8GB",
          storage: "40GB",
        },
      },
    },
    {
      id: 3,
      title: "Malware Analysis Lab",
      description:
        "Learn to analyze and reverse engineer malware samples safely.",
      category: "Malware Analysis",
      difficulty: "Expert",
      duration: "90 min",
      enrolled: 567,
      rating: 4.7,
      status: "completed",
      progress: 100,
      tools: ["IDA Pro", "Ghidra", "Wireshark"],
      objectives: [
        "Static analysis of malware samples",
        "Dynamic analysis in a sandbox",
        "Network behavior analysis",
      ],
      environment: {
        type: "Isolated Environment",
        os: "Windows",
        tools: ["IDA Pro", "Ghidra", "Wireshark"],
        resources: {
          cpu: "8 cores",
          memory: "16GB",
          storage: "100GB",
        },
      },
    },
  ]);

  const [expandedLab, setExpandedLab] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isLabRunning, setIsLabRunning] = useState(false);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "#00ffea",
      Intermediate: "#ffd700",
      Advanced: "#ff4d4d",
      Expert: "#ff00ff",
    };
    return colors[difficulty] || colors.Intermediate;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "#00ffea",
      in_progress: "#ffd700",
      not_started: "#ff4d4d",
    };
    return colors[status] || colors.not_started;
  };

  const filteredLabs = labs.filter((lab) => {
    if (activeTab === "all") return true;
    return lab.status === activeTab;
  });

  return (
    <div className="practice-lab-page">
      <div className="lab-container">
        {/* Header Section */}
        <div className="lab-header">
          <div className="header-content">
            <h1>
              <Terminal className="icon" />
              Practice Lab
            </h1>
            <p>Hands-on practice environment for cybersecurity skills</p>
          </div>
          <div className="header-actions">
            <Button variant="primary" icon={<Bookmark />}>
              My Labs
            </Button>
            <Button variant="outline" icon={<Share2 />}>
              Share
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="lab-tabs">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Labs
          </button>
          <button
            className={`tab ${activeTab === "in_progress" ? "active" : ""}`}
            onClick={() => setActiveTab("in_progress")}
          >
            In Progress
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <button
            className={`tab ${activeTab === "not_started" ? "active" : ""}`}
            onClick={() => setActiveTab("not_started")}
          >
            Not Started
          </button>
        </div>

        {/* Labs List */}
        <div className="labs-list">
          {filteredLabs.map((lab) => (
            <Card key={lab.id} className="lab-card">
              <div className="lab-card-header">
                <div className="lab-info">
                  <h2>{lab.title}</h2>
                  <div className="lab-meta">
                    <span className="category">{lab.category}</span>
                    <span
                      className="difficulty"
                      style={{ color: getDifficultyColor(lab.difficulty) }}
                    >
                      {lab.difficulty}
                    </span>
                    <span className="duration">
                      <Clock className="icon" />
                      {lab.duration}
                    </span>
                    <span className="enrolled">
                      <Users className="icon" />
                      {lab.enrolled} enrolled
                    </span>
                    <span className="rating">
                      <Star className="icon" />
                      {lab.rating}
                    </span>
                  </div>
                </div>
                <div className="lab-status">
                  <span
                    className="status-badge"
                    style={{ color: getStatusColor(lab.status) }}
                  >
                    {lab.status === "completed" && (
                      <CheckCircle2 className="icon" />
                    )}
                    {lab.status === "in_progress" && (
                      <AlertTriangle className="icon" />
                    )}
                    {lab.status === "not_started" && <Lock className="icon" />}
                    {lab.status.replace("_", " ")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedLab(expandedLab === lab.id ? null : lab.id)
                    }
                  >
                    {expandedLab === lab.id ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </Button>
                </div>
              </div>

              <p className="lab-description">{lab.description}</p>

              {lab.status !== "not_started" && (
                <div className="lab-progress">
                  <Progress
                    value={lab.progress}
                    max={100}
                    variant="success"
                    size="md"
                    showLabel
                  />
                </div>
              )}

              {expandedLab === lab.id && (
                <div className="lab-details">
                  <div className="lab-objectives">
                    <h3>Learning Objectives</h3>
                    <ul>
                      {lab.objectives.map((objective, index) => (
                        <li key={index}>
                          <ChevronRight className="icon" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lab-environment">
                    <h3>Lab Environment</h3>
                    <div className="environment-details">
                      <div className="environment-info">
                        <div className="info-item">
                          <span className="label">Type</span>
                          <span className="value">{lab.environment.type}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">OS</span>
                          <span className="value">{lab.environment.os}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Tools</span>
                          <div className="tools-list">
                            {lab.environment.tools.map((tool, index) => (
                              <span key={index} className="tool-badge">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="environment-resources">
                        <h4>Resources</h4>
                        <div className="resources-grid">
                          <div className="resource-item">
                            <span className="label">CPU</span>
                            <span className="value">
                              {lab.environment.resources.cpu}
                            </span>
                          </div>
                          <div className="resource-item">
                            <span className="label">Memory</span>
                            <span className="value">
                              {lab.environment.resources.memory}
                            </span>
                          </div>
                          <div className="resource-item">
                            <span className="label">Storage</span>
                            <span className="value">
                              {lab.environment.resources.storage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="lab-actions">
                {lab.status === "not_started" ? (
                  <Button
                    variant="primary"
                    icon={<Play />}
                    onClick={() => setIsLabRunning(true)}
                  >
                    Launch Lab
                  </Button>
                ) : lab.status === "in_progress" ? (
                  <Button
                    variant="primary"
                    icon={isLabRunning ? <Pause /> : <Play />}
                    onClick={() => setIsLabRunning(!isLabRunning)}
                  >
                    {isLabRunning ? "Pause Lab" : "Resume Lab"}
                  </Button>
                ) : (
                  <Button variant="outline" icon={<Download />}>
                    Download Report
                  </Button>
                )}
                {isLabRunning && (
                  <div className="lab-controls">
                    <Button variant="ghost" size="sm" icon={<RotateCcw />}>
                      Reset
                    </Button>
                    <Button variant="ghost" size="sm" icon={<Upload />}>
                      Submit
                    </Button>
                    <Button variant="ghost" size="sm" icon={<Settings />}>
                      Settings
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Lab Environment (when running) */}
        {isLabRunning && (
          <Card className="lab-environment-panel">
            <div className="environment-header">
              <h3>
                <Terminal className="icon" />
                Lab Environment
              </h3>
              <div className="environment-status">
                <span className="status-indicator active">
                  <span className="dot"></span>
                  Running
                </span>
              </div>
            </div>
            <div className="environment-content">
              <div className="terminal-panel">
                <div className="terminal-header">
                  <span className="terminal-title">Terminal</span>
                  <div className="terminal-actions">
                    <Button variant="ghost" size="sm">
                      Clear
                    </Button>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="terminal-content">
                  <pre>
                    <code>
                      {`$ nmap -sV -sC 192.168.1.0/24
Starting Nmap 7.92 ( https://nmap.org )
Nmap scan report for 192.168.1.1
Host is up (0.0023s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4
80/tcp open  http    Apache httpd 2.4.41
Service detection performed. Please report any incorrect results...`}
                    </code>
                  </pre>
                </div>
              </div>
              <div className="tools-panel">
                <div className="tools-header">
                  <span className="tools-title">Available Tools</span>
                </div>
                <div className="tools-list">
                  {labs[0].tools.map((tool, index) => (
                    <Button key={index} variant="outline" size="sm">
                      {tool}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PracticeLab;
