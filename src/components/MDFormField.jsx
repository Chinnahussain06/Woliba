import React from "react";
import { Field } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MDTypography from "./MDTypography";

/**
 * MDFormField: A highly reusable, generic Formik form field component
 * styled using Material-UI (MUI).
 * It features clean branding accents, validation support, and flexible props.
 */
export default function MDFormField({
  label,
  name,
  type = "text",
  required,
  variant = "outlined",
  value,
  error,
  helperText,
  InputProps, // Destructure here to prevent it from going into ...rest and spreading
  ...rest
}) {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        // Support both explicit parent-passed error state and automatic Formik metadata
        const hasError = error !== undefined ? error : !!(meta.touched && meta.error);
        const resolvedHelperText = helperText !== undefined 
          ? helperText 
          : (meta.touched && meta.error ? meta.error : null);

        return (
          <Box sx={{ mb: 2, textAlign: "left" }}>
            {label && (
              <MDTypography
                component="label"
                htmlFor={name}
                sx={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#1E3A5F",
                  mb: 0.75,
                }}
              >
                {label}
                {required && <span style={{ color: "#d2686e", marginLeft: "4px" }}>*</span>}
              </MDTypography>
            )}
            <TextField
              {...field}
              {...rest}
              value={value !== undefined ? value : (field.value ?? "")}
              id={name}
              type={type}
              variant={variant}
              fullWidth
              error={hasError}
              helperText={resolvedHelperText || " "} // Keep stable space for layout shifts
              slotProps={{
                formHelperText: {
                  sx: {
                    minHeight: "1.25rem",
                    m: "3px 0 0", // Left-aligned with the text field box
                    fontSize: "0.75rem",
                  }
                },
                input: {
                  ...InputProps, // Merge any external input props (e.g. End Adornments)
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: rest.disabled ? "#F8FAFC" : "#FFFFFF",
                    fontSize: "0.875rem",
                    color: rest.disabled ? "#64748B" : "#1E3A5F",
                    "& input::placeholder": {
                      color: "#9EA9BA",
                      opacity: 0.8,
                    },
                    "&.Mui-disabled": {
                      color: "#64748B",
                      WebkitTextFillColor: "#64748B",
                      backgroundColor: "#F8FAFC",
                    },
                    ...(InputProps?.sx || {})
                  }
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#CBD5E1", // Light Gray / Silver Border
                  },
                  "&:hover fieldset": {
                    borderColor: "#A0AEC0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A0AEC0", // Simple border on focus to keep it elegant and continuous
                  },
                },
                ...(rest.sx || {})
              }}
            />
          </Box>
        );
      }}
    </Field>
  );
}
