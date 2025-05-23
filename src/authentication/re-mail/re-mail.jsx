import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Spinner,
// } from "reactstrap";
// import { sendPasswordResetEmail } from "firebase/auth"; // ✅ Correct Firebase method for reset
// import { auth } from "../../services/firebase";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const ReMail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userEmail = state?.userEmail || null;
  const [loading, setLoading] = useState(false);

  // ✅ **Trigger Toastify on Page Load to confirm email sent**
  useEffect(() => {
    if (userEmail) {
      toast.success(`Reset link sent to ${userEmail}! Check your inbox.`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("No email found. Please request a reset link again.", {
        position: "top-right",
      });
      navigate("/forgot-password");
    }
  }, [userEmail, navigate]);

  // ✅ **Resend Email Function**
  const handleResendEmail = async () => {
    if (!userEmail) {
      toast.error("No email provided. Please try again!", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, userEmail);
      toast.success("Reset email sent again! Check your inbox.", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="body" style={{ backgroundColor: "#FBF7F1" }}>
      <Container fluid className="d-flex align-items-center justify-content-center vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5} xl={4} sm={8} xs={11} className="text-center">
            <img src={Logo} alt="Milestone Logo" className="img mb-3 shadow" style={{ height: "60px", borderRadius: "10px" }} />

            <Card className="shadow p-4" style={{ borderRadius: "30px" }}>
              <CardBody className="text-center">
                <h3 className="mb-2">Check Your Email</h3>
                <p className="text-muted small">
                  A reset password link was sent to <b>{userEmail}</b>. Please check your inbox.
                </p>

                {/* 🔁 **Resend Email Button (Previously "Back to Login")** */}
                <div className="d-grid mt-3">
                  <button
                    type="button"
                    disabled={loading}
                    className="btn btn-dark"
                    style={{ height: "50px", borderRadius: "30px" }}
                    onClick={handleResendEmail}
                  >
                    {loading ? <Spinner size="sm" className="me-2" /> : null} Resend Email
                  </button>
                </div>

                {/* 🔙 **Back to Login Button (Previously "Resend Email")** */}
                <p className="mt-3">
                  <span style={{ cursor: "pointer", color: "#007bff" }} onClick={() => navigate("/login")}>
                    Back to Login
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default ReMail;
