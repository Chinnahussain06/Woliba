import React from "react";
import { Field } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MDTypography from "../MDTypography";

export default function MDFormField({
  label,
  name,
  type = "text",
  required,
  variant = "outlined",
  value,
  error,
  helperText,
  InputProps,
  ...rest
}) {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        const hasError =
          error !== undefined ? error : !!(meta.touched && meta.error);

        const resolvedHelperText =
          helperText !== undefined
            ? helperText
            : meta.touched && meta.error
              ? meta.error
              : null;

        return (
          <Box sx={{ textAlign: "left" }}>
            {label && (
              <MDTypography
                component="label"
                htmlFor={name}
                sx={{
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: palette.secondary.main,
                  mb: 0.5,
                }}
              >
                {label}
                {required && (
                  <span
                    style={{
                      color: palette.primary.main,
                      marginLeft: "4px",
                    }}
                  >
                    *
                  </span>
                )}
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
              helperText={resolvedHelperText || " "}
              slotProps={{
                formHelperText: {
                  sx: {
                    minHeight: "1.25rem",
                    m: "2px 0 0",
                    fontSize: "0.75rem",
                    color: palette.text.secondary,
                  },
                },
                input: {
                  ...InputProps,
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: rest.disabled
                      ? palette.background.default
                      : palette.background.paper,

                    fontSize: "0.875rem",
                    color: rest.disabled
                      ? palette.text.secondary
                      : palette.text.primary,

                    "& input::placeholder": {
                      color: palette.text.secondary,
                      opacity: 0.8,
                    },

                    "&.Mui-disabled": {
                      color: palette.text.secondary,
                      WebkitTextFillColor: palette.text.secondary,
                      backgroundColor: palette.background.default,
                    },

                    ...(InputProps?.sx || {}),
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: palette.text.secondary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: palette.primary.dark,
                  },
                },

                ...(rest.sx || {}),
              }}
            />
          </Box>
        );
      }}
    </Field>
  );
}
