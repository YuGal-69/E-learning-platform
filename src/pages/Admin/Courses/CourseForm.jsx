import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../services/firebase";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import "./CourseForm.css";

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
    price: "",
    duration: "",
    level: "beginner",
    category: "",
    thumbnail: "",
    lessons: [],
    requirements: [],
    objectives: [],
  });

  useEffect(() => {
    if (isEditMode) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseDoc = await getDoc(doc(db, "courses", id));
      if (courseDoc.exists()) {
        const courseData = courseDoc.data();
        setFormData(courseData);
        setThumbnailPreview(courseData.thumbnail || "");
      } else {
        setError("Course not found");
      }
    } catch (err) {
      setError("Failed to fetch course data");
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayInputChange = (type, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeArrayItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return formData.thumbnail;

    const storageRef = ref(
      storage,
      `courses/${id || "temp"}/${thumbnailFile.name}`
    );
    await uploadBytes(storageRef, thumbnailFile);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const thumbnailUrl = await uploadThumbnail();
      const courseData = {
        ...formData,
        thumbnail: thumbnailUrl,
        updatedAt: serverTimestamp(),
      };

      if (!isEditMode) {
        courseData.createdAt = serverTimestamp();
        courseData.enrolledStudents = 0;
      }

      const courseRef = doc(
        db,
        "courses",
        id || doc(collection(db, "courses")).id
      );
      await setDoc(courseRef, courseData);

      navigate("/admin/courses");
    } catch (err) {
      setError("Failed to save course");
      console.error("Error saving course:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="course-form-container">
      <div className="course-form-header">
        <button onClick={() => navigate("/admin/courses")} className="back-btn">
          <ArrowLeft size={20} />
          Back to Courses
        </button>
        <h1>{isEditMode ? "Edit Course" : "Create New Course"}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-grid">
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter course title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter course description"
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration (hours)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Web Development, Cybersecurity"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Course Media</h2>

            <div className="form-group">
              <label>Course Thumbnail</label>
              <div className="thumbnail-upload">
                {thumbnailPreview ? (
                  <div className="thumbnail-preview">
                    <img src={thumbnailPreview} alt="Course thumbnail" />
                    <button
                      type="button"
                      className="remove-thumbnail"
                      onClick={() => {
                        setThumbnailPreview("");
                        setThumbnailFile(null);
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="thumbnail-upload-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <Upload size={24} />
                    <span>Upload Thumbnail</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Course Details</h2>

            <div className="form-group">
              <label>Requirements</label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="array-input-group">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "requirements",
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => removeArrayItem("requirements", index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-item-btn"
                onClick={() => addArrayItem("requirements")}
              >
                <Plus size={18} />
                Add Requirement
              </button>
            </div>

            <div className="form-group">
              <label>Learning Objectives</label>
              {formData.objectives.map((obj, index) => (
                <div key={index} className="array-input-group">
                  <input
                    type="text"
                    value={obj}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "objectives",
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Enter learning objective"
                  />
                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => removeArrayItem("objectives", index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-item-btn"
                onClick={() => addArrayItem("objectives")}
              >
                <Plus size={18} />
                Add Objective
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/courses")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Course"
              : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
