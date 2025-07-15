import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./homePage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Button from "../../components/common/Button";
import { Shield, Terminal, Target, Zap, Lock, Code } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [videoState, setVideoState] = useState({
    loading: true,
    error: false,
    playing: false,
  });
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1200 });

    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoState((prev) => ({ ...prev, loading: false }));
        video.play().catch((error) => {
          console.error("Error playing video:", error);
          setVideoState((prev) => ({ ...prev, error: true }));
        });
      };

      const handlePlay = () => {
        setVideoState((prev) => ({ ...prev, playing: true }));
      };

      const handleError = () => {
        console.error("Error loading video");
        setVideoState((prev) => ({ ...prev, error: true, loading: false }));
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("play", handlePlay);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <main className="htb-style">
      {/* Hero Section */}
      <div className="hero-section">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="back-video"
          src="/video.mp4"
        />
        {videoState.loading && (
          <div className="video-loading">
            <div className="spinner"></div>
            <p>Initializing...</p>
          </div>
        )}
        {videoState.error && <div className="video-fallback" />}

        <div className="hero-content">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="main-title">
              <span className="gradient-text">CyberNinja</span>
              <br />
              <span className="subtitle">
                Advanced Cybersecurity Training Platform
              </span>
            </h1>
            <p className="hero-description">
              Master the art of ethical hacking through hands-on labs,
              real-world challenges, and professional training paths.
            </p>
            <div className="cta-buttons">
              <Button
                className="primary-btn"
                onClick={() => navigate("/signup")}
              >
                Start Hacking
              </Button>
              <Button
                className="secondary-btn"
                onClick={() => navigate("/train")}
              >
                View Labs
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="feature-card">
                <Terminal className="feature-icon" />
                <h3>Interactive Labs</h3>
                <p>
                  Practice penetration testing in realistic environments with
                  guided challenges.
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-card">
                <Target className="feature-icon" />
                <h3>Real-World Scenarios</h3>
                <p>
                  Train on actual vulnerabilities and attack vectors used in the
                  wild.
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-card">
                <Shield className="feature-icon" />
                <h3>Security Certifications</h3>
                <p>Earn industry-recognized certifications as you progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3" data-aos="fade-up">
              <div className="stat-card">
                <h3>100+</h3>
                <p>Active Labs</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-card">
                <h3>50k+</h3>
                <p>Active Users</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Lab Access</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card">
                <h3>15+</h3>
                <p>Certification Paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Choose Your Path
          </h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="path-card">
                <Lock className="path-icon" />
                <h3>Penetration Testing</h3>
                <p>
                  Master the art of ethical hacking and security assessment.
                </p>
                <Button className="path-btn">Start Path</Button>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="path-card">
                <Code className="path-icon" />
                <h3>Secure Coding</h3>
                <p>Learn to write secure code and prevent vulnerabilities.</p>
                <Button className="path-btn">Start Path</Button>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="path-card">
                <Zap className="path-icon" />
                <h3>Red Team Operations</h3>
                <p>Advanced offensive security and red teaming techniques.</p>
                <Button className="path-btn">Start Path</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title" data-aos="fade-up">
            Ready to Level Up Your Security Skills?
          </h2>
          <p className="cta-text" data-aos="fade-up" data-aos-delay="100">
            Join thousands of security professionals and start your journey
            today.
          </p>
          <Button
            className="cta-btn"
            onClick={() => navigate("/signup")}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
