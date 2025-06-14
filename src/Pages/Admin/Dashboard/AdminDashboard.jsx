import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase";
import {
  Users,
  BookOpen,
  Target,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalChallenges: 0,
    activeUsers: 0,
    completedChallenges: 0,
    averageScore: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;

        // Get active users (users who logged in within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsersQuery = query(
          collection(db, "users"),
          where("lastLogin", ">=", thirtyDaysAgo)
        );
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        const activeUsers = activeUsersSnapshot.size;

        // Get total courses
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const totalCourses = coursesSnapshot.size;

        // Get total challenges
        const challengesSnapshot = await getDocs(collection(db, "challenges"));
        const totalChallenges = challengesSnapshot.size;

        // Calculate completed challenges
        let completedChallenges = 0;
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          completedChallenges += userData.completedChallenges?.length || 0;
        });

        // Calculate average score
        let totalScore = 0;
        let scoreCount = 0;
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.xp) {
            totalScore += userData.xp;
            scoreCount++;
          }
        });
        const averageScore =
          scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

        setStats({
          totalUsers,
          totalCourses,
          totalChallenges,
          activeUsers,
          completedChallenges,
          averageScore,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "#00ffea",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <Activity size={24} />,
      color: "#4ade80",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: <BookOpen size={24} />,
      color: "#f472b6",
    },
    {
      title: "Total Challenges",
      value: stats.totalChallenges,
      icon: <Target size={24} />,
      color: "#fb923c",
    },
    {
      title: "Completed Challenges",
      value: stats.completedChallenges,
      icon: <Award size={24} />,
      color: "#a78bfa",
    },
    {
      title: "Average XP",
      value: stats.averageScore,
      icon: <TrendingUp size={24} />,
      color: "#60a5fa",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ "--accent-color": stat.color }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <p className="coming-soon">Activity feed coming soon...</p>
          </div>
        </div>

        <div className="section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-button">Create New Course</button>
            <button className="action-button">Add Challenge</button>
            <button className="action-button">Manage Users</button>
            <button className="action-button">View Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
