import { Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDButton from "@/src/components/MDButton";

// Redux
import { useAppSelector } from "@/src/redux/hooks";
import { selectFirstName, selectLastName } from "@/src/redux/selectors/registrationSelectors";

const WelcomePage = () => {
  const navigate = useNavigate();

  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);

  const user = {
    firstName,
    lastName,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shivani",
  };

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f8fafc 0%, #f0f9ff 100%)",
          p: 3,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "620px",
            zIndex: 1,
          }}
        >
          <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
            <Avatar
              src={user.avatar}
              alt={user.firstName}
              sx={{
                width: 160,
                height: 160,
                border: "8px solid white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #D2686E, #F8A5B2)",
              }}
            />
          </Box>

          <MDTypography
            variant="h3"
            sx={{
              color: "#1E3A5F",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Welcome {user.firstName} {user.lastName}!
          </MDTypography>

          <MDTypography
            variant="h6"
            sx={{
              color: "#475569",
              lineHeight: 1.7,
              mb: 6,
              fontWeight: 400,
              px: 2,
            }}
          >
            Welcome to Woliba! You&apos;ll find wellness challenges, fitness and
            recipe videos, and daily tips to support your health goals. Download
            our iOS or Android app and start your wellbeing journey today.
          </MDTypography>

          <MDButton variant="contained" onClick={handleGetStarted}>
            Let&apos;s get Started
          </MDButton>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
