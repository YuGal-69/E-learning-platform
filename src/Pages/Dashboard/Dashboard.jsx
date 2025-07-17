import React, { useState, useEffect } from "react";
import {
  Shield,
  Trophy,
  Target,
  Brain,
  Zap,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Star,
  Lock,
} from "lucide-react";
import Card from "../../components/common/Card";
import Progress from "../../components/common/Progress";
import Button from "../../components/common/Button";
import { useUser } from "../../context/UserContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [challengesLoading, setChallengesLoading] = useState(true);
  const [userRankLoading, setUserRankLoading] = useState(true);

  // Static top users as role models
  const staticTopUsers = [
    {
      uid: "top1",
      name: "Sarah Kim",
      xp: 4520,
      level: 18,
      challengesCompleted: 45,
      streak: 30,
      rank: 1,
      isStatic: true,
      title: "Security Master",
    },
    {
      uid: "top2",
      name: "Mike Johnson",
      xp: 3890,
      level: 16,
      challengesCompleted: 38,
      streak: 25,
      rank: 2,
      isStatic: true,
      title: "Network Ninja",
    },
    {
      uid: "top3",
      name: "Alex Chen",
      xp: 3450,
      level: 15,
      challengesCompleted: 32,
      streak: 20,
      rank: 3,
      isStatic: true,
      title: "Code Guardian",
    },
    {
      uid: "top4",
      name: "Emma Davis",
      xp: 3100,
      level: 14,
      challengesCompleted: 28,
      streak: 18,
      rank: 4,
      isStatic: true,
      title: "Bug Hunter",
    },
    {
      uid: "top5",
      name: "Chris Lee",
      xp: 2950,
      level: 13,
      challengesCompleted: 25,
      streak: 15,
      rank: 5,
      isStatic: true,
      title: "Security Enthusiast",
    },
  ];

  // Simulate fetching challenges (replace with real fetch if available)
  useEffect(() => {
    setChallengesLoading(true);
    setTimeout(() => {
      setChallenges([
        {
          id: 1,
          title: "SQL Injection Hunter",
          difficulty: "Medium",
          xp: 150,
          timeEstimate: "20 min",
          category: "Web Security",
          completed: false,
          locked: false,
        },
        {
          id: 2,
          title: "Cryptography Master",
          difficulty: "Hard",
          xp: 300,
          timeEstimate: "45 min",
          category: "Cryptography",
          completed: false,
          locked: false,
        },
        {
          id: 3,
          title: "Network Defender",
          difficulty: "Easy",
          xp: 100,
          timeEstimate: "15 min",
          category: "Network Security",
          completed: true,
          locked: false,
        },
        {
          id: 4,
          title: "Advanced Malware Analysis",
          difficulty: "Expert",
          xp: 500,
          timeEstimate: "90 min",
          category: "Malware",
          completed: false,
          locked: true,
        },
      ]);
      setChallengesLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const fetchUserRank = async () => {
      if (!userProfile) {
        setUserRankLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const usersQuery = query(
          usersRef,
          orderBy("challengesCompleted", "desc")
        );
        const snapshot = await getDocs(usersQuery);

        if (!snapshot.empty) {
          const usersData = snapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }));

          // Get all real users and sort them
          const allUsers = usersData
            .filter((user) => user.uid !== userProfile.uid) // Exclude current user
            .map((user) => ({
              uid: user.uid,
              name: user.displayName || user.email.split("@")[0],
              xp: user.xp || 0,
              level: user.level || 1,
              challengesCompleted: user.challengesCompleted || 0,
              streak: user.streak || 0,
              rank: 0,
            }))
            .sort((a, b) => {
              if (b.challengesCompleted !== a.challengesCompleted) {
                return b.challengesCompleted - a.challengesCompleted;
              }
              return b.xp - a.xp;
            })
            .map((user, index) => ({
              ...user,
              rank: index + 1,
            }));

          // Create current user object
          const currentUser = {
            uid: userProfile.uid,
            name: userProfile.displayName || userProfile.email.split("@")[0],
            xp: userProfile.xp || 0,
            level: userProfile.level || 1,
            challengesCompleted: userProfile.challengesCompleted || 0,
            streak: userProfile.streak || 0,
            rank: 0,
          };

          // Calculate overall rank including static users
          let overallRank = 1;
          for (const staticUser of staticTopUsers) {
            if (
              currentUser.challengesCompleted <
                staticUser.challengesCompleted ||
              (currentUser.challengesCompleted ===
                staticUser.challengesCompleted &&
                currentUser.xp < staticUser.xp)
            ) {
              overallRank++;
            }
          }

          // Find current user's position in the real users list
          const currentUserPosition = allUsers.findIndex(
            (user) => user.uid === userProfile.uid
          );
          if (currentUserPosition !== -1) {
            overallRank += currentUserPosition;
          }

          setCurrentUserPosition(overallRank);
        }
      } catch (error) {
        console.error("Error fetching user rank:", error);
      } finally {
        setUserRankLoading(false);
      }
    };

    fetchUserRank();
  }, [userProfile]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "var(--color-primary)",
      Medium: "var(--color-warning)",
      Hard: "var(--color-accent)",
      Expert: "#ff4d4d",
    };
    return colors[difficulty] || colors.Medium;
  };

  if (!userProfile) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Get first name from displayName or email
  const firstName = userProfile.displayName
    ? userProfile.displayName.split(" ")[0]
    : userProfile.email.split("@")[0];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2>
            Welcome back, <span className="highlight">{firstName}</span>!
          </h2>
          <p>Ready to sharpen your cybersecurity skills today?</p>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <Card variant="elevated" className="stat-card">
            <Card.Body>
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Level</p>
                  <h3 className="stat-value">{userProfile.level || 1}</h3>
                  <Progress
                    value={userProfile.xp || 0}
                    max={userProfile.nextLevelXp || 1000}
                    variant="success"
                    size="sm"
                    showLabel
                    labelPosition="right"
                  />
                </div>
                <Trophy className="stat-icon" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="stat-card">
            <Card.Body>
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Challenges</p>
                  <h3 className="stat-value">
                    {userProfile.challengesCompleted || 0}
                  </h3>
                  <span className="stat-subtext">Completed</span>
                </div>
                <Target className="stat-icon" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="stat-card">
            <Card.Body>
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Streak</p>
                  <h3 className="stat-value">{userProfile.streak || 0}</h3>
                  <span className="stat-subtext">Days</span>
                </div>
                <Zap className="stat-icon" />
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated" className="stat-card">
            <Card.Body>
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Badges</p>
                  <h3 className="stat-value">
                    {(userProfile.badges || []).length}
                  </h3>
                  <span className="stat-subtext">Earned</span>
                </div>
                <Award className="stat-icon" />
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Main Content Grid */}
        <section className="dashboard-grid">
          {/* Challenges Section */}
          <div className="challenges-section">
            <Card variant="elevated" className="section-card">
              <Card.Header>
                <div className="section-header">
                  <h3>
                    <Brain className="icon" /> Active Challenges
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/challenges")}>View All</Button>
                </div>
              </Card.Header>
              <Card.Body>
                {challengesLoading ? (
                  <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading challenges...</p>
                  </div>
                ) : (
                  <div className="challenge-list">
                    {challenges.map((challenge) => {
                      const handleStart = () => {
                        if (!challenge.locked) {
                          navigate(`/challenges/${challenge.id}`);
                        }
                      };
                      return (
                        <Card
                          key={challenge.id}
                          variant="default"
                          className={`challenge-card ${
                            challenge.completed
                              ? "completed"
                              : challenge.locked
                              ? "locked"
                              : ""
                          }`}
                          hoverable={!challenge.locked}
                          onClick={handleStart}
                          style={{ cursor: challenge.locked ? 'not-allowed' : 'pointer' }}
                        >
                          <Card.Body>
                            <div className="challenge-content">
                              <div className="challenge-info">
                                <h4>
                                  {challenge.locked && (
                                    <Lock className="icon small" />
                                  )}
                                  {challenge.title}
                                </h4>
                                <div
                                  className="difficulty-badge"
                                  style={{
                                    backgroundColor: getDifficultyColor(
                                      challenge.difficulty
                                    ),
                                  }}
                                >
                                  {challenge.difficulty}
                                </div>
                                <div className="challenge-meta">
                                  <span>
                                    <Trophy className="icon tiny" /> {challenge.xp} XP
                                  </span>
                                  <span>
                                    <Clock className="icon tiny" /> {challenge.timeEstimate}
                                  </span>
                                  <span className="category">
                                    {challenge.category}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant={challenge.completed ? "ghost" : "primary"}
                                size="sm"
                                disabled={challenge.locked}
                                onClick={e => { e.stopPropagation(); handleStart(); }}
                              >
                                {challenge.completed
                                  ? "Completed"
                                  : challenge.locked
                                  ? "Locked"
                                  : "Start"}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="dashboard-leaderboard">
            {/* Leaderboard */}
            <Card variant="elevated" className="leaderboard-card">
              <Card.Header>
                <div className="section-header">
                  <h3>
                    <TrendingUp className="icon" /> Leaderboard
                  </h3>
                  {currentUserPosition && (
                    <span className="user-rank">
                      Your Rank: #{currentUserPosition}
                    </span>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {userRankLoading ? (
                  <div className="leaderboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading leaderboard...</p>
                  </div>
                ) : (
                  <div className="leaderboard-list">
                    {/* Static Top Users */}
                    {staticTopUsers.map((player) => (
                      <div
                        key={player.uid}
                        className="leaderboard-entry static-user"
                      >
                        <div className="rank-badge">{player.rank}</div>
                        <div className="player-info">
                          <div className="player-name-container">
                            <p className="player-name">{player.name}</p>
                            <span className="player-title">{player.title}</span>
                          </div>
                          <div className="player-stats">
                            <span className="player-level">
                              Level {player.level}
                            </span>
                            <span className="player-challenges">
                              {player.challengesCompleted} Challenges
                            </span>
                            <span className="player-streak">
                              {player.streak} Day Streak
                            </span>
                          </div>
                        </div>
                        <div className="player-xp">
                          <p>{player.xp.toLocaleString()}</p>
                          <span>XP</span>
                        </div>
                      </div>
                    ))}

                    {/* Current User Position */}
                    {currentUserPosition &&
                      !staticTopUsers.some(
                        (user) => user.rank === currentUserPosition
                      ) && (
                        <>
                          <div className="leaderboard-divider">
                            <span>Your Position</span>
                          </div>
                          <div className="leaderboard-entry current-user">
                            <div className="rank-badge">
                              {currentUserPosition}
                            </div>
                            <div className="player-info">
                              <div className="player-name-container">
                                <p className="player-name">
                                  {(userProfile.displayName || userProfile.username || userProfile.email.split("@")[0])}
                                  <span className="you-badge">You</span>
                                </p>
                                <span className="player-title">
                                  {userProfile.challengesCompleted > 0
                                    ? "Rising Star"
                                    : "New Challenger"}
                                </span>
                              </div>
                              <div className="player-stats">
                                <span className="player-level">
                                  Level {userProfile.level}
                                </span>
                                <span className="player-challenges">
                                  {userProfile.challengesCompleted} Challenges
                                </span>
                                <span className="player-streak">
                                  {userProfile.streak} Day Streak
                                </span>
                              </div>
                            </div>
                            <div className="player-xp">
                              <p>{userProfile.xp.toLocaleString()}</p>
                              <span>XP</span>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Quick Actions */}
            <Card variant="elevated" className="leaderboard-card" style={{marginTop:"20px"}}>
              <Card.Header>
                <h3>Quick Actions</h3>
              </Card.Header>
              <Card.Body>
                <div className="quick-actions">
                  <Button
                    variant="ghost"
                    fullWidth
                    icon={<BookOpen className="icon" />}
                    onClick={() => navigate("/learning-paths")}
                  >
                    Study Materials
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    icon={<Users className="icon" />}
                    onClick={() => window.open("https://github.com/YuGal-69", "_blank")}
                  >
                    Join Community
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    icon={<Star className="icon" />}
                    onClick={() => navigate("/practice-lab")}
                  >
                    Practice Lab
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
