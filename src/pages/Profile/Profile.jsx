import React, { useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import {
  Loader2,
  User,
  Mail,
  Award,
  Calendar,
  Settings,
  Edit2,
  Save,
  X,
  Upload,
  Camera,
  Shield,
} from "lucide-react";
import { storage } from "../../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import imageCompression from "browser-image-compression";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userProfile, updateUserProfile, isAdmin } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || "",
    bio: userProfile?.bio || "",
    preferences: {
      ...userProfile?.preferences,
    },
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("preferences.")) {
      const prefKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file; // Return original file if compression fails
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Compress image before upload
      const compressedFile = await compressImage(file);

      // Create a storage reference with timestamp to prevent caching
      const timestamp = Date.now();
      const storageRef = ref(
        storage,
        `profile_images/${userProfile.uid}/${timestamp}_${file.name}`
      );

      // Create upload task with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      // Track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          alert("Failed to upload image. Please try again.");
          setUploading(false);
        },
        async () => {
          // Upload completed
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update user profile with new photo URL
          await updateUserProfile({
            ...formData,
            photoURL: downloadURL,
          });

          // Update local state
          setFormData((prev) => ({
            ...prev,
            photoURL: downloadURL,
          }));

          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error in upload process:", error);
      alert("Failed to upload image. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async () => {
    try {
      setLoading(true);
      await updateUserProfile({
        role: isAdmin ? "student" : "admin",
      });
    } catch (error) {
      console.error("Error toggling admin role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminPanelClick = () => {
    navigate("/admin/login");
  };

  if (!userProfile) {
    return (
      <div className="profile-loading">
        <Loader2 className="icon spinning" />
        <span>Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <Button
          variant={isEditing ? "outline" : "primary"}
          onClick={() => setIsEditing(!isEditing)}
          icon={isEditing ? <X /> : <Edit2 />}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="profile-grid">
        <Card className="profile-card main-info">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {userProfile.photoURL ? (
                <img
                  src={`${userProfile.photoURL}?t=${Date.now()}`}
                  alt={userProfile.displayName}
                  loading="eager"
                />
              ) : (
                <div className="avatar-placeholder">
                  <User className="icon" />
                </div>
              )}
              {isEditing && (
                <div
                  className="avatar-upload-overlay"
                  onClick={triggerFileInput}
                >
                  <Camera className="icon" />
                  <span>Change Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            {uploading && (
              <div className="upload-loading">
                <Loader2 className="icon spinning" />
                <div className="upload-progress">
                  <div
                    className="upload-progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span>Uploading... {Math.round(uploadProgress)}%</span>
              </div>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="save-button"
                icon={loading ? <Loader2 className="spinning" /> : <Save />}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          ) : (
            <div className="profile-info">
              <h2>{userProfile.displayName || "Anonymous User"}</h2>
              <p className="profile-bio">{userProfile.bio || "No bio yet"}</p>
              <div className="profile-meta">
                <span>
                  <Mail className="icon" />
                  {userProfile.email}
                </span>
                <span>
                  <Calendar className="icon" />
                  Joined {new Date(userProfile.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </Card>

        <Card className="profile-card stats">
          <h3>Learning Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <Award className="icon" />
              <div className="stat-info">
                <span className="stat-value">Level {userProfile.level}</span>
                <span className="stat-label">Current Level</span>
              </div>
            </div>
            <div className="stat-item">
              <Award className="icon" />
              <div className="stat-info">
                <span className="stat-value">{userProfile.xp}</span>
                <span className="stat-label">Total XP</span>
              </div>
            </div>
            <div className="stat-item">
              <Award className="icon" />
              <div className="stat-info">
                <span className="stat-value">
                  {userProfile.completedChallenges}
                </span>
                <span className="stat-label">Challenges Completed</span>
              </div>
            </div>
            <div className="stat-item">
              <Award className="icon" />
              <div className="stat-info">
                <span className="stat-value">{userProfile.streak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="profile-card preferences">
          <h3>Preferences</h3>
          <div className="preferences-list">
            <div className="preference-item">
              <label>
                <input
                  type="checkbox"
                  name="preferences.notifications"
                  checked={formData.preferences.notifications}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                Enable Notifications
              </label>
            </div>
            <div className="preference-item">
              <label>
                <input
                  type="checkbox"
                  name="preferences.emailNotifications"
                  checked={formData.preferences.emailNotifications}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                Email Notifications
              </label>
            </div>
          </div>
        </Card>

        <Card className="profile-card badges">
          <h3>Achievements</h3>
          <div className="badges-grid">
            {(userProfile.badges || []).length > 0 ? (
              (userProfile.badges || []).map((badge, index) => (
                <div key={index} className="badge-item">
                  <div className="badge-icon">
                    <Award className="icon" />
                  </div>
                  <span className="badge-name">{badge.name}</span>
                </div>
              ))
            ) : (
              <p className="no-badges">No badges earned yet</p>
            )}
          </div>
        </Card>

        {/* Admin Role Toggle (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="admin-toggle">
            <Button
              onClick={handleToggleAdmin}
              disabled={loading}
              className={`admin-button ${isAdmin ? "active" : ""}`}
            >
              <Shield size={18} />
              {isAdmin ? "Remove Admin Role" : "Make Admin"}
            </Button>
          </div>
        )}

        {/* Admin Panel Link - Updated to always go through admin login */}
        <div className="admin-panel-link">
          <Button
            onClick={handleAdminPanelClick}
            className="admin-panel-button"
          >
            <Shield size={18} />
            Access Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
