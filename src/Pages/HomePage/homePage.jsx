import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../HomePage/homePage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Button from "../../Components/common/Button";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <main>
        {/* Hero Section */}
        <div
          style={{
            height: "95vh",
            backgroundColor: "#0b121f",
            position: "relative",
          }}
          className="hero-section"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="back-video"
            src="/video.mp4"
            type="video/mp4"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          ></video>
          {/* <div
            className="container-fluid position-relative"
           
          >
            <div className="row align-items-center justify-content-center h-100">
              <div className="col-10 text-center">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-5"
                >
                  <h2 className="text-white cyber-heading">
                    Hack the Game,
                    <br />
                    Secure the World!
                  </h2>
                  <p className="fs-6" style={{ color: "#8db1ff" }}>
                    Enter a realm where every game teaches the secrets of
                    cybersecurity.
                    <br />
                    Compete, learn, and protect the digital universe. Log in and
                    let the games begin!
                  </p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div>
                    <Button
                      className="main-btn me-3 glow-btn"
                      onClick={() => navigate("/train")}
                    >
                      Train your team
                    </Button>
                    <Button
                      className="main-btn fill-btn glow-btn"
                      onClick={() => navigate("/signup")}
                    >
                      Join for FREE
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-5"
          style={{ backgroundColor: "#0d1524", color: "white" }}
        >
          <div className="container text-center">
            <h2 className="mb-4" data-aos="fade-down">
              What People Say
            </h2>
            <div
              id="testimonialCarousel"
              className="carousel slide glassmorphic-card"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "CyberNinja transformed my skills. The labs are so
                      interactive and fun!"
                    </p>
                    <footer className="blockquote-footer text-light">
                      Jane Doe, Security Analyst
                    </footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "The hands-on approach really helped me understand complex
                      concepts."
                    </p>
                    <footer className="blockquote-footer text-light">
                      John Smith, Pentester
                    </footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "This platform made learning cybersecurity exciting!"
                    </p>
                    <footer className="blockquote-footer text-light">
                      Emily White, Developer
                    </footer>
                  </blockquote>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </section>

        {/* Labs Section */}
        <section
          className="py-5 labs-section text-white"
          style={{ backgroundColor: "#0a0f1a" }}
        >
          <div className="container text-center">
            <h2 className="mb-4" data-aos="fade-up">
              Explore Real Hacking Labs
            </h2>
            <p className="mb-5" data-aos="fade-up" data-aos-delay="200">
              Practice penetration testing, vulnerability scanning, and
              exploitation in a safe environment.
            </p>
            <div className="row">
              <div className="col-md-4" data-aos="flip-left">
                <div className="lab-card p-4 rounded shadow">
                  <h5 className="text-cyan">Network Sniffing</h5>
                  <p>
                    Use Wireshark to capture and analyze network packets in
                    real-time.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <div className="lab-card p-4 rounded shadow">
                  <h5 className="text-cyan">SQL Injection</h5>
                  <p>
                    Learn how SQL injection works and how to prevent it in web
                    apps.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <div className="lab-card p-4 rounded shadow">
                  <h5 className="text-cyan">Linux Exploitation</h5>
                  <p>
                    Crack weak passwords and escalate privileges on vulnerable
                    machines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section
          className="py-5 progress-section"
          style={{ backgroundColor: "#0b121f", color: "white" }}
        >
          <div className="container text-center">
            <h2 className="mb-4" data-aos="fade-up">
              Level Up Your Skills
            </h2>
            <p className="mb-5" data-aos="fade-up" data-aos-delay="200">
              Earn points, unlock badges, and track your growth as a
              hacker-in-training!
            </p>
            <div className="row justify-content-center">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div className="progress-container p-4 rounded">
                  <h5>
                    Current Rank:{" "}
                    <span className="text-warning">Cyber Ninja</span>
                  </h5>
                  <div className="progress my-3" style={{ height: "20px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: "65%" }}
                    >
                      65%
                    </div>
                  </div>
                  <p>
                    Next Badge: <strong>Web Exploiter</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mindset Section */}
        <section
          className="py-5 mindset-section text-center text-white"
          style={{ backgroundColor: "#09111c" }}
        >
          <div className="container" data-aos="fade-in">
            <h2 className="mb-4">Think Like a Hacker</h2>
            <p className="mb-4">
              Understand vulnerabilities, exploit them, and secure systems.
              Ethical hacking is about breaking barriers—legally and
              intelligently.
            </p>
            <a href="/start" className="btn btn-outline-light glow-btn">
              Start Your Journey
            </a>
          </div>
        </section>

        {/* Scrolling Ticker */}
        <section
          className="ticker bg-dark text-cyan py-2"
          style={{
            borderTop: "1px solid #00ffea",
            borderBottom: "1px solid #00ffea",
          }}
        >
          <div className="scrolling-text">
            <div className="scrolling-content">
              🚨 New RCE vulnerability in Apache — Patch Immediately | 💡
              Ethical Hackers help identify zero-day bug in government systems |
              🛡️ OWASP Top 10 updated with latest threat insights
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
