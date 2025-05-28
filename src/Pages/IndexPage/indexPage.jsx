import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../IndexPage/indexPage.css';

const indexPage = () => {
  return (
    <>


      <main>

        <div style={{ height: '95vh', backgroundColor: '#0b121f' }} className="position-relative overflow-hidden hero-section">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="back-video d-none d-lg-block"
            src="/video.mp4"
            type="video/mp4"
            style={{ width: '100%', height: 'fit-content' }}
          ></video>
          <div className="container-fluid position-absolute top-0 start-0 wrapper h-100">
            <div className="row align-items-center justify-content-center h-100">
              <div className="col-10 text-center">
                <div className="mb-5">
                  <h2 className="text-white">
                    Hack the Game,<br />Secure the World!
                  </h2>
                  <p className="fs-6" style={{ color: '#8db1ff' }}>
                    Enter a realm where every game teaches the secrets of cybersecurity.<br />
                    Compete, learn, and protect the digital universe. Log in and let the games begin!
                  </p>
                </div>
                <div>
                  <a href="#" className="main-btn me-3">Train your team</a>
                  <a href="signup" className="main-btn fill-btn">Join for FREE</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
        <section id="testimonials" className="py-5" style={{ backgroundColor: '#0d1524', color: 'white' }}>
          <div className="container text-center">
            <h2 className="mb-4">What People Say</h2>
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="false">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "CyberNinja transformed my skills. The labs are so interactive and fun!"
                    </p>
                    <footer className="blockquote-footer text-light">Jane Doe, Security Analyst</footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "The hands-on approach really helped me understand complex concepts."
                    </p>
                    <footer className="blockquote-footer text-light">John Smith, Pentester</footer>
                  </blockquote>
                </div>
                <div className="carousel-item">
                  <blockquote className="blockquote">
                    <p className="mb-4">
                      "This platform made learning cybersecurity exciting!"
                    </p>
                    <footer className="blockquote-footer text-light">Emily White, Developer</footer>
                  </blockquote>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev" aria-label="Previous">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next" aria-label="Next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default indexPage;