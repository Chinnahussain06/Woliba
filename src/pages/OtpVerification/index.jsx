import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Paper, Divider, Alert } from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import DashboardLayout from "../../Layouts/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyOtp, resendOtp } from "../../redux/thunks/otpThunks";
import {
  clearError,
  clearSuccessMessage,
} from "../../redux/slices/registrationSlice";

import {
  selectError,
  selectOtpToken,
  selectSuccessMessage,
  selectRegistrationEmail,
  selectStatus,
  selectResendStatus,
} from "../../redux/selectors/registrationSelectors";

import MDButton from "@/src/components/MDButton";

function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const [timeLeft, setTimeLeft] = useState(180);

  // selectors
  const apiError = useAppSelector(selectError);
  const successMessage = useAppSelector(selectSuccessMessage);
  const email = useAppSelector(selectRegistrationEmail);
  const otpToken = useAppSelector(selectOtpToken);
  const status = useAppSelector(selectStatus);
  const resendStatus = useAppSelector(selectResendStatus);

  const isLoading = status === "loading";
  const isResending = resendStatus === "loading";
  const isOtpComplete = otp.every(Boolean);

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m} : ${s}`;
  }, []);

  // ---------------- OTP HANDLERS ----------------
  const updateOtp = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;

    setOtp((prev) => {
      const copy = [...prev];

      if (copy[index]) {
        copy[index] = "";
      } else if (index > 0) {
        copy[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      return copy;
    });
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);

    if (!/^\d{6}$/.test(pasted)) return;

    setOtp(pasted.split(""));
    inputRefs.current[5]?.focus();
  };

  // ---------------- ACTIONS ----------------
  const handleResendOtp = async () => {
    if (timeLeft > 0 || isResending) return;

    const result = await dispatch(resendOtp({ email }));

    if (resendOtp.fulfilled.match(result)) {
      setTimeLeft(180);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6 || isLoading) return;

    await dispatch(
      verifyOtp({
        otp: code,
        token: otpToken,
      }),
    ).unwrap();

    navigate("/register/login-credentials");
  };

  // ---------------- UI ----------------
  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "560px", // ← was 500px
          p: { xs: 4, md: 7 }, // ← was md: 6
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26,58,95,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* TITLE */}
        <MDTypography variant="h5" fontWeight={700} mb={1} textAlign="center">
          Input verification code
        </MDTypography>

        {/* SUBTITLE */}
        <MDTypography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          We&apos;ve sent a 6-digit OTP to your email. Enter it below to
          continue.
        </MDTypography>

        {/* ALERTS */}
        {apiError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearError())}
            sx={{ width: "100%", mb: 2 }}
          >
            {apiError}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            onClose={() => dispatch(clearSuccessMessage())}
            sx={{ width: "100%", mb: 2 }}
          >
            {successMessage}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            mb: 3,
            mt: 4,
          }}
        >
          {otp.map((val, i) => (
            <input
              key={i}
              value={val}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => updateOtp(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={i === 0 ? handlePaste : undefined}
              inputMode="numeric"
              maxLength={1}
              style={{
                width: "48px",
                height: "48px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 500,
                color: "#1a1a1a",
                borderRadius: "8px",
                border: "1.5px solid #D9DEE7",
                outline: "none",
                background: "#fff",
                transition: "border-color 0.15s",
                fontFamily: "inherit",
                boxSizing: "border-box",
                display: "block",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D2686E")}
              onBlur={(e) => (e.target.style.borderColor = "#D9DEE7")}
            />
          ))}
        </Box>

        {/* TIMER */}
        <MDTypography
          variant="body2"
          sx={{
            mb: 2.5,
            color: timeLeft > 0 ? "text.secondary" : "#D2686E",
            fontWeight: 500,
            cursor: timeLeft === 0 ? "pointer" : "default",
            userSelect: "none",
          }}
          onClick={handleResendOtp}
          textAlign="center"
        >
          {timeLeft > 0
            ? `Resend OTP in ${formatTime(timeLeft)}`
            : isResending
              ? "Sending..."
              : "Resend OTP"}
        </MDTypography>

        <Divider sx={{ width: "100%", mb: 2.5 }} />

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MDButton
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register/user-details-verification")}
            sx={{
              width: "140px",
              py: 1.25,
            }}
            startIcon={<ArrowBackIosNew sx={{ fontSize: 14, mr: 0.5 }} />}
          >
            Back
          </MDButton>

          <MDLoadingButton
            fullWidth
            type="submit"
            loading={isLoading}
            disabled={!isOtpComplete}
            onClick={handleSubmit}
            sx={{
              width: "140px",
              py: 1.25,
            }}
          >
            Submit
          </MDLoadingButton>
        </Box>
      </Paper>
    </DashboardLayout>
  );
}

export default OtpVerification;
