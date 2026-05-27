import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
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
            mb: 0.75,
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
          placeholder={placeholder || "Select date..."}
          slots={{ toolbar: () => null }}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: palette.background.paper,
                  fontSize: "0.875rem",
                  color: palette.text.primary,

                  "& fieldset": {
                    borderColor: palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: palette.text.secondary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: palette.primary.dark,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: palette.background.default,
                    color: palette.text.secondary,
                  },
                  "& .MuiSvgIcon-root": {
                    color: `${palette.primary.main} !important`,
                  },

                  "& .MuiIconButton-root": {
                    color: `${palette.primary.main} !important`,
                  },

                  "& input::placeholder": {
                    color: palette.text.secondary,
                    opacity: 0.8,
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
                    <CalendarMonthOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#fff !important", mr: 1 }}
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
