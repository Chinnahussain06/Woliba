import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import MDTypography from "../MDTypography";
import { ErrorMessage } from "formik";

const MDDatePicker = ({
  name,
  seconds,
  onChange,
  label,
  placeholder,
  required,
  ...props
}) => {
  const theme = useTheme();
  const { palette } = theme;

  const dateValue = seconds ? dayjs(seconds, "YYYY-MM-DD") : null;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue ? newValue.format("YYYY-MM-DD") : null);
    }
  };

  return (
    // ✅ mb:2 matches MDFormField (was mb:4)
    <Box sx={{ mb: 2, textAlign: "left" }}>
      {label && (
        <MDTypography
          component="label"
          htmlFor={name}
          sx={{
            display: "block",
            fontSize: "1rem",
            fontWeight: 400,
            color: palette.text.primary,
            mb: 0.75, // ✅ matches MDFormField label margin
          }}
        >
          {label}
          {required && (
            <span style={{ color: palette.primary.main, marginLeft: "4px" }}>
              *
            </span>
          )}
        </MDTypography>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          value={dateValue}
          onChange={handleChange}
          format="YYYY-MM-DD"
          slots={{ toolbar: () => null }}
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: placeholder || "Select date...",
              sx: {
                // ✅ No extra mb here — Box handles spacing
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px", // ✅ matches MDFormField (was 20-25px)
                  backgroundColor: palette.background.paper,
                  fontSize: "0.875rem",
                  color: palette.text.primary,

                  "& fieldset": {
                    borderColor: palette.divider, // ✅ matches
                  },
                  "&:hover fieldset": {
                    borderColor: palette.text.secondary, // ✅ matches
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: palette.primary.dark, // ✅ matches
                  },
                  "&.Mui-disabled": {
                    backgroundColor: palette.background.default,
                    color: palette.text.secondary,
                  },
                },
                "& input::placeholder": {
                  color: palette.text.secondary,
                  opacity: 0.8,
                },
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon
                      sx={{ color: palette.primary.main, fontSize: "20px" }}
                    />
                  </InputAdornment>
                ),
              },
            },

            // ✅ Popup paper radius kept rounded (calendar popup, not the input)
            layout: {
              sx: {
                "& .MuiPaper-root": { borderRadius: "20px" },
              },
            },

            calendarHeader: {
              sx: {
                "& .MuiPickersCalendarHeader-label": {
                  color: palette.text.primary,
                  fontWeight: 600,
                  fontSize: "1rem",
                },
                "& .MuiIconButton-root": {
                  color: palette.primary.main,
                },
              },
            },

            day: {
              sx: {
                borderRadius: "6px",
                margin: "2px",
                fontSize: "0.85rem",
                color: palette.text.primary,
                "&.Mui-selected": {
                  backgroundColor: `${palette.text.secondary} !important`,
                  color: "#fff !important",
                  borderRadius: "8px",
                },
                "&:hover": {
                  backgroundColor: palette.action.hover,
                },
              },
            },

            actionBar: {
              actions: ["accept"],
              sx: {
                p: 2,
                "& .MuiButton-root": {
                  backgroundColor: palette.primary.main,
                  color: "#fff",
                  width: "100%",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  padding: "10px",
                  "&:hover": { backgroundColor: palette.primary.dark },
                },
              },
            },
          }}
          localeText={{ okButtonLabel: "Done" }}
          {...props}
        />
      </LocalizationProvider>

      {/* ✅ Matches MDFormField helper text gap exactly */}
      <ErrorMessage name={name}>
        {(msg) => (
          <Box
            sx={{
              minHeight: "1.25rem",
              m: "3px 0 0",
              fontSize: "0.75rem",
              color: palette.error.main,
            }}
          >
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
