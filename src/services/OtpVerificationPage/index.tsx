import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// MUI Core Components
import {
  Box,
  Paper,
  Divider,
  Alert,
  IconButton,
} from "@mui/material";

// Generic Brand Components
import MDTypography from "../../components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDButton from "../../components/MDButton";
import DashboardLayout from "../../pages/dashboardLayout";

// MUI Icons
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Centralized API integration
import apiMgr from "../../api/apiMgr";

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3-minute countdown timer

  // References for focus redirection between input boxes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailId = sessionStorage.getItem("registration_email_id") || "";
  const companyName = sessionStorage.getItem("registration_company_name") || "";

  useEffect(() => {
    // Missing required email details -> Redirect back to stage 1
    if (!emailId) {
      navigate("/register/company-verification", { replace: true });
    }
  }, [emailId, navigate]);

  // Handle countdown clock tick
  useEffect(() => {
    if (timeLeft === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins} : ${secs}`;
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    // Allow single numeric character
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Shift focus forward if index isn't last
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] !== "") {
        // Clear current index but keep focus
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        // Shift focus back and clear previous index
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^[0-9]{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      // Focus on the final digit box
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 || isResending) return;

    setIsResending(true);
    setApiError("");
    setApiSuccess("");
    try {
      const payload = {
        emailId,
        companyName,
      };

      const response = await apiMgr.sendOtp(payload);

      if (response && (response.status === false || response.success === false)) {
        throw new Error(response.message || "Failed to resend verification code.");
      }

      setApiSuccess("New verification code sent successfully to your email!");
      setTimeLeft(180); // reset 3 minutes countdown clock
    } catch (err: any) {
      console.error("Resend OTP failed:", err);
      setApiError(err.message || "Could not resend code. Please verify details again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    if (joinedOtp.length < 6 || isLoading) return;

    setIsLoading(true);
    setApiError("");
    setApiSuccess("");
    try {
      const payload = {
        otp: joinedOtp,
        emailId,
        companyName,
      };

      const response = await apiMgr.verifyOtp(payload);

      if (response && (response.status === false || response.success === false)) {
        throw new Error(response.message || "Invalid or expired OTP. Please try again.");
      }

      // Navigate to Login Credentials Page for next step
      navigate("/register/login-credentials");
    } catch (err: any) {
      console.error("Confirm OTP error:", err);
      setApiError(err.message || "Failed to verify. Please enter a valid 6-digit code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Full forms submission block check
  const isOtpComplete = otp.every((char) => char !== "");

  return (
    <DashboardLayout>
      <Paper
        id="registration-card-container"
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: { xs: 4, sm: 5 },
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26, 58, 95, 0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MDTypography
              variant="h5"
              id="registration-main-heading"
              sx={{
                color: "#1E3A5F",
                fontWeight: 700,
                textAlign: "center",
                mb: 1.5,
                letterSpacing: "-0.025em",
              }}
            >
              Input verification code
            </MDTypography>

            <MDTypography
              variant="body2"
              sx={{
                color: "#5A6E85",
                textAlign: "center",
                mb: 4,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                px: 2,
              }}
            >
              We've sent a 6-digit OTP to your work email. Please enter it below to continue.
            </MDTypography>

            {apiError && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  backgroundColor: "rgba(254, 226, 226, 0.9)",
                  color: "#991B1B",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  "& .MuiAlert-icon": {
                    color: "#EF4444",
                  },
                }}
                onClose={() => setApiError("")}
              >
                {apiError}
              </Alert>
            )}

            {apiSuccess && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  backgroundColor: "#ECFDF5",
                  color: "#065F46",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  "& .MuiAlert-icon": {
                    color: "#10B981",
                  },
                }}
                onClose={() => setApiSuccess("")}
              >
                {apiSuccess}
              </Alert>
            )}

            <form id="otp-form" onSubmit={handleOtpSubmit}>
              {/* Horizontally aligned 6-digit input boxes */}
              <Box
                id="otp-input-row"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: { xs: 1, sm: 1.5 },
                  mb: 3,
                  px: { xs: 1, sm: 3 },
                }}
              >
                {otp.map((value, idx) => (
                  <Box
                    key={idx}
                    component="input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    ref={(el: HTMLInputElement | null) => (inputRefs.current[idx] = el)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOtpChange(e.target, idx)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(e, idx)
                    }
                    onPaste={idx === 0 ? handlePaste : undefined}
                    sx={{
                      width: { xs: "38px", sm: "46px" },
                      height: { xs: "38px", sm: "46px" },
                      borderRadius: "10px",
                      border: "1px solid #E2E8F0",
                      textAlign: "center",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#1E3A5F",
                      outline: "none",
                      backgroundColor: "#FAFAFA",
                      transition: "all 0.2s ease-in-out",
                      "&:focus": {
                        borderColor: "#D2686E",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 0 0 3px rgba(210, 104, 110, 0.15)",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Countdown or clickable Resend Link */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                {timeLeft > 0 ? (
                  <MDTypography
                    variant="caption"
                    style={{
                      color: "#5A6E85",
                      fontSize: "0.825rem",
                      fontWeight: 600,
                    }}
                  >
                    Resend OTP in {formatTime(timeLeft)}
                  </MDTypography>
                ) : (
                  <MDTypography
                    variant="caption"
                    component="span"
                    onClick={handleResendOtp}
                    style={{
                      color: "#D2686E",
                      cursor: "pointer",
                      fontSize: "0.825rem",
                      fontWeight: 700,
                      textDecoration: "underline",
                    }}
                  >
                    Didn't receive code? Resend OTP
                  </MDTypography>
                )}
              </Box>

              <Divider sx={{ borderColor: "#F1F5F9", borderBottomWidth: 1, my: 3 }} />

              {/* Action Buttons Row */}
              <Box
                id="action-btn-row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Back button with custom back arrow prefix */}
                <MDButton
                  variant="outlined"
                  onClick={() => navigate("/register/user-details-verification")}
                  sx={{
                    width: "120px",
                    py: 1.25,
                    borderColor: "#D2686E",
                    color: "#D2686E",
                    "&:hover": {
                      borderColor: "#B15156",
                      backgroundColor: "rgba(210, 104, 110, 0.04)",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: "0.75rem" }} />
                  Back
                </MDButton>

                {/* Submit Loading Button */}
                <MDLoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  disabled={!isOtpComplete}
                  sx={{
                    width: "140px",
                    py: 1.25,
                  }}
                >
                  Submit
                </MDLoadingButton>
              </Box>
            </form>
      </Paper>
    </DashboardLayout>
  );
}
