import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Paper, Divider, Alert } from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDButton from "@/src/components/MDButton";
import DashboardLayout from "@/src/Layouts/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { verifyOtp, resendOtp } from "@/src/redux/thunks/registrationThunks";
import { clearError } from "@/src/redux/slices/registrationSlice";
import {
  selectEmail,
  selectOtpToken,
  selectStatus,
  selectResendStatus,
  selectError,
} from "@/src/redux/selectors/registrationSelectors";

function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(180);
  const inputRefs = useRef([]);

  const email = useAppSelector(selectEmail);
  const otpToken = useAppSelector(selectOtpToken);
  const apiError = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);
  const resendStatus = useAppSelector(selectResendStatus);

  const isLoading = status === "loading";
  const isResending = resendStatus === "loading";
  const isOtpComplete = otp.every(Boolean);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m} : ${s}`;
  }, []);

  const updateOtp = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;

    setOtp((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      return next;
    });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d{6}$/.test(pasted)) return;
    setOtp(pasted.split(""));
    inputRefs.current[5]?.focus();
  };

  const handleResend = async () => {
    if (timeLeft > 0 || isResending || !email) return;

    const result = await dispatch(resendOtp({ email }));
    if (resendOtp.fulfilled.match(result)) {
      setOtp(Array(6).fill(""));
      setTimeLeft(180);
    }
  };

  const handleSubmit = async () => {
    if (!isOtpComplete || isLoading || !otpToken) return;

    const result = await dispatch(
      verifyOtp({ otp: otp.join(""), token: otpToken }),
    );

    if (verifyOtp.fulfilled.match(result)) {
      navigate("/register/login-credentials");
    }
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "560px",
          p: { xs: 4, md: 7 },
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
        <MDTypography variant="h5" fontWeight={700} mb={2} textAlign="center">
          Input verification code
        </MDTypography>

        <MDTypography
          variant="subtitle2"
          textAlign="center"
          color="text.secondary"
          sx={{ lineHeight: 1.6, mb: 4, mt: 1 }}
        >
          We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>
        </MDTypography>

        {apiError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearError())}
            sx={{ width: "100%", mb: 3 }}
          >
            {apiError}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            mb: 4,
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
                width: "52px",
                height: "52px",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: 600,
                borderRadius: "10px",
                border: "1.5px solid #D9DEE7",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D2686E")}
              onBlur={(e) => (e.target.style.borderColor = "#D9DEE7")}
            />
          ))}
        </Box>

        <MDTypography
          variant="body2"
          textAlign="center"
          onClick={handleResend}
          sx={{
            mb: 3,
            fontWeight: 500,
            color: timeLeft > 0 ? "text.secondary" : "#D2686E",
            cursor: timeLeft === 0 && !isResending ? "pointer" : "default",
            userSelect: "none",
          }}
        >
          {timeLeft > 0
            ? `Resend OTP in ${formatTime(timeLeft)}`
            : isResending
              ? "Sending..."
              : "Resend OTP"}
        </MDTypography>

        <Divider sx={{ width: "100%", mb: 3 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <MDButton
            variant="outlined"
            onClick={() => navigate("/register/user-details-verification")}
            startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
            sx={{ width: "140px", py: 1.25 }}
          >
            Back
          </MDButton>

          <MDLoadingButton
            loading={isLoading}
            disabled={!isOtpComplete}
            onClick={handleSubmit}
            sx={{ width: "140px", py: 1.25 }}
          >
            Verify OTP
          </MDLoadingButton>
        </Box>
      </Paper>
    </DashboardLayout>
  );
}

export default OtpVerification;
