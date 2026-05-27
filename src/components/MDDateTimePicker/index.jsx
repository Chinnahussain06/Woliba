import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MDTypography from "../MDTypography";
import { ErrorMessage } from "formik";

const COLORS = {
  primaryRed: "#D37272",
  selectedBlue: "#94A3D8",
  textDark: "#2D4E5E",
  bgDay: "#F8F9FA",
  border: "#E0E0E0",
};

const MDDatePicker = ({
  name,
  seconds,
  onChange,
  label,
  placeholder,
  ...props
}) => {
  const dateValue = seconds ? dayjs(seconds, "YYYY-MM-DD") : null;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue ? newValue.format("YYYY-MM-DD") : null);
    }
  };

  return (
    <Box mb={2}>
      {label && (
        <MDTypography
          variant="h6"
          sx={{
            color: "#1E3A5F",
            mb: 1,
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          {label}
        </MDTypography>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          value={dateValue}
          onChange={handleChange}
          format="YYYY-MM-DD"
          slots={{
            toolbar: () => null,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: placeholder || "Select date...",
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A0AEC0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A0AEC0",
                  },
                },
                mb: 3,
                borderRadius: "8px",
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon
                      sx={{ color: COLORS.primaryRed, fontSize: "20px" }}
                    />
                  </InputAdornment>
                ),
              },
            },
            layout: {
              sx: {
                "& .MuiPaper-root": { borderRadius: "20px" },
              },
            },
            calendarHeader: {
              sx: {
                // Style Month/Year text and Arrows
                "& .MuiPickersCalendarHeader-label": {
                  color: COLORS.textDark,
                  fontWeight: 600,
                  fontSize: "1rem",
                },
                "& .MuiIconButton-root": {
                  color: COLORS.primaryRed, // Red arrows
                },
              },
            },
            day: {
              sx: {
                borderRadius: "6px",
                margin: "2px",
                fontSize: "0.85rem",
                color: COLORS.textDark,
                backgroundColor: COLORS.bgDay, // Light grid background

                // HIGHLIGHT SELECTED DATE
                "&.Mui-selected": {
                  backgroundColor: `${COLORS.selectedBlue} !important`,
                  color: "white !important",
                  borderRadius: "8px",
                },
                "&:hover": {
                  backgroundColor: "rgba(148, 163, 216, 0.2)",
                },
              },
            },
            actionBar: {
              actions: ["accept"],
              sx: {
                p: 2,
                "& .MuiButton-root": {
                  backgroundColor: COLORS.primaryRed,
                  color: "white",
                  width: "100%",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  padding: "10px",
                  "&:hover": { backgroundColor: "#BF6161" },
                },
              },
            },
          }}
          localeText={{ okButtonLabel: "Done" }}
          {...props}
        />
      </LocalizationProvider>

      <ErrorMessage name={name}>
        {(msg) => (
          <Box mt={0.5}>
            <MDTypography variant="caption" color="error">
              {msg}
            </MDTypography>
          </Box>
        )}
      </ErrorMessage>
    </Box>
  );
};

export default MDDatePicker;
