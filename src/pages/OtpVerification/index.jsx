import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Paper, Divider, Alert, Button } from "@mui/material";
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
import MDButton from "@/src/components/MDButton";

function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  // selectors
  const apiError = useAppSelector(selectError);
  const successMessage = useAppSelector(selectSuccessMessage);
  const email = useAppSelector(selectRegistrationEmail);
  const otpToken = useAppSelector(selectOtpToken);
  const timeLeft = useAppSelector(selectOtpTimer);
  const status = useAppSelector(selectStatus);
  const resendStatus = useAppSelector(selectResendStatus);

  const isLoading = status === "loading";
  const isResending = resendStatus === "loading";
  const isOtpComplete = otp.every(Boolean);

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      dispatch(setOtpTimer(timeLeft - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, dispatch]);

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
      dispatch(setOtpTimer(180));
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
      })
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
          maxWidth: 500,
          p: { xs: 4, sm: 5 },
          borderRadius: 3,
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26,58,95,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MDTypography variant="h5" textAlign="center" mb={1.5}>
          Input verification code
        </MDTypography>

        <MDTypography variant="body2" textAlign="center" mb={4}>
          We&apos;ve sent a 6-digit OTP to your work email.
        </MDTypography>

        {apiError && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {apiError}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            onClose={() => dispatch(clearSuccessMessage())}
          >
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* OTP INPUTS */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            {otp.map((val, i) => (
              <Box
                key={i}
                component="input"
                value={val}
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => updateOtp(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={i === 0 ? handlePaste : undefined}
                inputMode="numeric"
                maxLength={1}
                sx={{
                  width: 42,
                  height: 42,
                  textAlign: "center",
                  fontSize: 18,
                  borderRadius: 1.2,
                  border: "1px solid #E2E8F0",
                  outline: "none",
                  background: "#FAFAFA",
                  "&:focus": {
                    borderColor: "#D2686E",
                    boxShadow: "0 0 0 3px rgba(210,104,110,0.15)",
                    background: "#fff",
                  },
                }}
              />
            ))}
          </Box>

          {/* TIMER */}
          <Box textAlign="center" mb={3}>
            {timeLeft > 0 ? (
              <MDTypography variant="caption">
                Resend OTP in {formatTime(timeLeft)}
              </MDTypography>
            ) : (
              <MDTypography
                variant="caption"
                onClick={handleResendOtp}
                sx={{ cursor: "pointer", color: "#D2686E", fontWeight: 600 }}
              >
                Resend OTP
              </MDTypography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* BUTTONS */}
          <Box display="flex" justifyContent="center" gap={2}>
            <MDButton
              variant="outlined"
              onClick={() =>
                navigate("/register/user-details-verification")
              }
            >
              <ArrowBackIosNew fontSize="small" />
              Back
            </MDButton>

            <MDLoadingButton
              type="submit"
              loading={isLoading}
              disabled={!isOtpComplete}
              sx={{ width: 140 }}
            >
              Submit
            </MDLoadingButton>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  );
}

export default OtpVerification;