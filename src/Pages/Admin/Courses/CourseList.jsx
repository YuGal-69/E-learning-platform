import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../services/firebase";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const coursesQuery = query(
        collection(db, "courses"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(coursesQuery);
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesData);
    } catch (err) {
      setError("Failed to fetch courses. Please try again.");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteDoc(doc(db, "courses", courseId));
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (err) {
        setError("Failed to delete course. Please try again.");
        console.error("Error deleting course:", err);
      }
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1>Course Management</h1>
        <Link to="/admin/courses/create" className="create-course-btn">
          <Plus size={20} />
          Create New Course
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="course-list-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <Filter size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <div className="no-courses">
            <p>No courses found. Create your first course!</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} />
                ) : (
                  <div className="course-image-placeholder">
                    <span>No Image</span>
                  </div>
                )}
                <span className={`course-status ${course.status}`}>
                  {course.status}
                </span>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>{course.lessons?.length || 0} Lessons</span>
                  <span>{course.enrolledStudents || 0} Students</span>
                </div>
              </div>

              <div className="course-actions">
                <Link
                  to={`/admin/courses/${course.id}/edit`}
                  className="edit-btn"
                  title="Edit Course"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="delete-btn"
                  title="Delete Course"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
