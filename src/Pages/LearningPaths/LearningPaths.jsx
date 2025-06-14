import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trophy,
  Users,
  Star,
  ArrowRight,
  Bookmark,
  Share2,
  BarChart2,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Progress from "../../components/common/Progress";
import "./LearningPaths.css";

const LearningPaths = () => {
  const [paths] = useState([
    {
      id: 1,
      title: "Web Security Fundamentals",
      description:
        "Master the basics of web security, from common vulnerabilities to secure coding practices.",
      level: "Beginner",
      duration: "8 weeks",
      enrolled: 1234,
      rating: 4.8,
      progress: 65,
      status: "in_progress",
      modules: [
        {
          id: 1,
          title: "Introduction to Web Security",
          description:
            "Learn about common web vulnerabilities and security principles.",
          duration: "2 hours",
          completed: true,
        },
        {
          id: 2,
          title: "OWASP Top 10",
          description:
            "Understand the most critical web application security risks.",
          duration: "4 hours",
          completed: true,
        },
        {
          id: 3,
          title: "Secure Authentication",
          description:
            "Implement secure user authentication and session management.",
          duration: "3 hours",
          completed: false,
          locked: false,
        },
        {
          id: 4,
          title: "Data Protection",
          description: "Learn about encryption and secure data handling.",
          duration: "3 hours",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: 2,
      title: "Advanced Penetration Testing",
      description:
        "Take your security skills to the next level with advanced penetration testing techniques.",
      level: "Advanced",
      duration: "12 weeks",
      enrolled: 856,
      rating: 4.9,
      progress: 0,
      status: "not_started",
      modules: [
        {
          id: 1,
          title: "Network Reconnaissance",
          description:
            "Master advanced network scanning and enumeration techniques.",
          duration: "4 hours",
          completed: false,
          locked: true,
        },
        {
          id: 2,
          title: "Exploitation Techniques",
          description:
            "Learn advanced exploitation methods and post-exploitation.",
          duration: "6 hours",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: 3,
      title: "Secure Coding Practices",
      description:
        "Learn how to write secure code and prevent common vulnerabilities.",
      level: "Intermediate",
      duration: "6 weeks",
      enrolled: 2103,
      rating: 4.7,
      progress: 100,
      status: "completed",
      modules: [
        {
          id: 1,
          title: "Input Validation",
          description: "Implement proper input validation and sanitization.",
          duration: "3 hours",
          completed: true,
        },
        {
          id: 2,
          title: "Error Handling",
          description: "Learn secure error handling practices.",
          duration: "2 hours",
          completed: true,
        },
      ],
    },
  ]);

  const [expandedPath, setExpandedPath] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status) => {
    const colors = {
      completed: "#00ffea",
      in_progress: "#ffd700",
      not_started: "#ff4d4d",
    };
    return colors[status] || colors.not_started;
  };

  const getLevelColor = (level) => {
    const colors = {
      Beginner: "#00ffea",
      Intermediate: "#ffd700",
      Advanced: "#ff4d4d",
      Expert: "#ff00ff",
    };
    return colors[level] || colors.Beginner;
  };

  const filteredPaths = paths.filter((path) => {
    if (activeTab === "all") return true;
    return path.status === activeTab;
  });

  return (
    <div className="learning-paths-page">
      <div className="paths-container">
        {/* Header Section */}
        <div className="paths-header">
          <div className="header-content">
            <h1>
              <BookOpen className="icon" />
              Learning Paths
            </h1>
            <p>Structured learning paths to master cybersecurity skills</p>
          </div>
          <div className="header-actions">
            <Button variant="primary" icon={<Bookmark />}>
              My Paths
            </Button>
            <Button variant="outline" icon={<Share2 />}>
              Share
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="paths-tabs">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Paths
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

        {/* Learning Paths List */}
        <div className="paths-list">
          {filteredPaths.map((path) => (
            <Card key={path.id} className="path-card">
              <div className="path-header">
                <div className="path-info">
                  <h2>{path.title}</h2>
                  <div className="path-meta">
                    <span
                      className="level"
                      style={{ color: getLevelColor(path.level) }}
                    >
                      {path.level}
                    </span>
                    <span className="duration">
                      <Clock className="icon" />
                      {path.duration}
                    </span>
                    <span className="enrolled">
                      <Users className="icon" />
                      {path.enrolled} enrolled
                    </span>
                    <span className="rating">
                      <Star className="icon" />
                      {path.rating}
                    </span>
                  </div>
                </div>
                <div className="path-status">
                  <span
                    className="status-badge"
                    style={{ color: getStatusColor(path.status) }}
                  >
                    {path.status === "completed" && (
                      <CheckCircle2 className="icon" />
                    )}
                    {path.status === "in_progress" && (
                      <AlertTriangle className="icon" />
                    )}
                    {path.status === "not_started" && <Lock className="icon" />}
                    {path.status.replace("_", " ")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedPath(expandedPath === path.id ? null : path.id)
                    }
                  >
                    {expandedPath === path.id ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </Button>
                </div>
              </div>

              <p className="path-description">{path.description}</p>

              {path.status !== "not_started" && (
                <div className="path-progress">
                  <Progress
                    value={path.progress}
                    max={100}
                    variant="success"
                    size="md"
                    showLabel
                  />
                </div>
              )}

              {expandedPath === path.id && (
                <div className="path-modules">
                  <h3>Modules</h3>
                  <div className="modules-list">
                    {path.modules.map((module) => (
                      <div
                        key={module.id}
                        className={`module-item ${
                          module.locked ? "locked" : ""
                        } ${module.completed ? "completed" : ""}`}
                      >
                        <div className="module-info">
                          <h4>{module.title}</h4>
                          <p>{module.description}</p>
                          <span className="module-duration">
                            <Clock className="icon" />
                            {module.duration}
                          </span>
                        </div>
                        <div className="module-status">
                          {module.completed && (
                            <CheckCircle2 className="icon completed" />
                          )}
                          {module.locked && <Lock className="icon locked" />}
                          {!module.completed && !module.locked && (
                            <Button variant="primary" size="sm">
                              Start
                              <ArrowRight className="icon" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="path-actions">
                {path.status === "not_started" ? (
                  <Button variant="primary" icon={<ArrowRight />}>
                    Start Learning Path
                  </Button>
                ) : path.status === "in_progress" ? (
                  <Button variant="primary" icon={<BarChart2 />}>
                    Continue Learning
                  </Button>
                ) : (
                  <Button variant="outline" icon={<Trophy />}>
                    View Certificate
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
