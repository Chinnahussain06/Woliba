import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Divider, useTheme } from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDButton from "@/src/components/MDButton";
import MDFormCard from "@/src/components/MDFormCard";
import MDAlert from "@/src/components/MDAlert";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardNavbar from "@/src/layouts/DashboardNavbar";
import Footer from "@/src/layouts/Footer";

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

const OTP_LENGTH = 6;

function OtpVerification() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectEmail);
  const otpToken = useAppSelector(selectOtpToken);
  const apiError = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);
  const resendStatus = useAppSelector(selectResendStatus);

  const isLoading = status === "loading";
  const isResending = resendStatus === "loading";

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(180);
  const inputRefs = useRef([]);

  const isOtpComplete = otp.every(Boolean);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  const updateOtp = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < OTP_LENGTH - 1) {
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

    const pasted = e.clipboardData.getData("text").trim().slice(0, OTP_LENGTH);

    if (!/^\d{6}$/.test(pasted)) return;

    setOtp(pasted.split(""));
    inputRefs.current[OTP_LENGTH - 1]?.focus();
  };

  const handleResend = async () => {
    if (timeLeft > 0 || isResending || !email) return;

    const result = await dispatch(resendOtp({ email }));

    if (resendOtp.fulfilled.match(result)) {
      setOtp(Array(OTP_LENGTH).fill(""));
      setTimeLeft(180);
    }
  };

  const handleSubmit = async () => {
    if (!isOtpComplete || isLoading || !otpToken) return;

    const result = await dispatch(
      verifyOtp({
        otp: otp.join(""),
        token: otpToken,
      }),
    );

    if (verifyOtp.fulfilled.match(result)) {
      navigate("/register/login-credentials");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <MDFormCard
          title="Input verification code"
          subtitle="We've sent a 6-digit OTP to your email. Please enter it below"
          maxWidth="560px"
        >
          <MDAlert message={apiError} onClose={() => dispatch(clearError())} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: "6px", sm: "10px", md: "12px" },
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
                  width: "100%",
                  maxWidth: "52px",
                  height: "52px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  border: `1.5px solid ${theme.palette.border.main}`,
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.dark)}
                onBlur={(e) => (e.target.style.borderColor = theme.palette.border.main)}
              />
            ))}
          </Box>

          <MDTypography
            variant="body2"
            textAlign="center"
            onClick={handleResend}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              fontWeight: 500,
              color: timeLeft > 0 ? theme.palette.text.secondary : theme.palette.primary.main,
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

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <MDButton
              variant="outlined"
              onClick={() => navigate("/register/user-details-verification")}
              startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
            >
              Back
            </MDButton>

            <MDLoadingButton
              loading={isLoading}
              loadingText="Verifying..."
              disabled={!isOtpComplete || isLoading}
              onClick={handleSubmit}
            >
              Verify OTP
            </MDLoadingButton>
          </Box>
        </MDFormCard>
      </Box>

      <Footer />
    </DashboardLayout>
  );
}

export default OtpVerification;
