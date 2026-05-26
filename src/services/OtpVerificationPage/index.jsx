import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Paper, Divider, Alert } from "@mui/material";

// Icons
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDTypography from "../../components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDButton from "../../components/MDButton";
import DashboardLayout from "../../pages/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { verifyOtp, resendOtp } from "../../redux/thunks/otpThunks";

import {
  clearError,
  clearSuccessMessage,
  setOtpTimer,
} from "../../redux/slices/registrationSlice";

import {
  selectError,
  selectOtpToken,
  selectSuccessMessage,
  selectRegistrationEmail,
  selectOtpTimer,
  selectStatus,
  selectResendStatus,
} from "../../redux/selectors/registrationSelectors";

export default function OtpVerificationPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputRefs = useRef([]);

  const apiError = useAppSelector(selectError);

  const successMessage = useAppSelector(selectSuccessMessage);

  const email = useAppSelector(selectRegistrationEmail);

  const otpToken = useAppSelector(selectOtpToken);

  const timeLeft = useAppSelector(selectOtpTimer);

  const status = useAppSelector(selectStatus);

  const resendStatus = useAppSelector(selectResendStatus);

  const isLoading = status === "loading";

  const isResending = resendStatus === "loading";

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      dispatch(setOtpTimer(timeLeft - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  // Format Timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${mins} : ${secs}`;
  };

  // OTP Input Change
  const handleOtpChange = (element, index) => {
    const value = element.value;

    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace Support
  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;

    const updatedOtp = [...otp];

    if (otp[index]) {
      updatedOtp[index] = "";

      setOtp(updatedOtp);

      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();

      updatedOtp[index - 1] = "";

      setOtp(updatedOtp);
    }
  };

  // Paste Support
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData.getData("text").trim().slice(0, 6);

    if (!/^\d{6}$/.test(pastedValue)) return;

    const digits = pastedValue.split("");

    setOtp(digits);

    inputRefs.current[5]?.focus();
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timeLeft > 0 || isResending) return;

    const result = await dispatch(
      resendOtp({
        email,
      }),
    );

    if (resendOtp.fulfilled.match(result)) {
      dispatch(setOtpTimer(180));
    }
  };

  // Submit OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const joinedOtp = otp.join("");

    if (joinedOtp.length !== 6 || isLoading) return;

    const result = await dispatch(
      verifyOtp({
        otp: joinedOtp,
        token: otpToken,
      }),
    ).unwrap();

    console.log("OTP Verified:", result);

    navigate("/register/login-credentials");
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: {
            xs: 4,
            sm: 5,
          },
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26, 58, 95, 0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Heading */}
        <MDTypography
          variant="h5"
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
          We've sent a 6-digit OTP to your work email. Please enter it below to
          continue.
        </MDTypography>

        {/* Error */}
        {apiError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
            }}
            onClose={() => dispatch(clearError())}
          >
            {apiError}
          </Alert>
        )}

        {/* Success */}
        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: "12px",
            }}
            onClose={() => dispatch(clearSuccessMessage())}
          >
            {successMessage}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleOtpSubmit}>
          {/* OTP Inputs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: {
                xs: 1,
                sm: 1.5,
              },
              mb: 3,
              px: {
                xs: 1,
                sm: 3,
              },
            }}
          >
            {otp.map((digit, index) => (
              <Box
                key={index}
                component="input"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                sx={{
                  width: {
                    xs: "38px",
                    sm: "46px",
                  },
                  height: {
                    xs: "38px",
                    sm: "46px",
                  },
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: 700,
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

          {/* Timer */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            {timeLeft > 0 ? (
              <MDTypography
                variant="caption"
                sx={{
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
                sx={{
                  color: "#D2686E",
                  cursor: "pointer",
                  fontSize: "0.825rem",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                Didn&apos;t receive code? Resend OTP
              </MDTypography>
            )}
          </Box>

          <Divider
            sx={{
              borderColor: "#F1F5F9",
              borderBottomWidth: 1,
              my: 3,
            }}
          />

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
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
              <ArrowBackIosNew
                sx={{
                  fontSize: "0.75rem",
                }}
              />
              Back
            </MDButton>

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
