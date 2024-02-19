import {
  IconButton,
  InputAdornment,
  InputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import ClearIcon from "@mui/icons-material/Clear";

type BaseMuiTextFieldProps = Omit<
  TextFieldProps,
  "label" | "color" | "variant"
>;

export interface FieldTextProps extends BaseMuiTextFieldProps {
  label: string;
  name: string;
  otherProps?: InputProps;
}

export const FieldText: FC<FieldTextProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const { setValue } = useFormContext();
  const { disabled } = otherProps;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextField
            {...field}
            label={label}
            value={field.value || ""}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={{
              ...{
                endAdornment: (
                  <InputAdornment position="end">
                    {field.value && !disabled ? (
                      <IconButton
                        size="small"
                        onClick={() => setValue(name, "")}
                        tabIndex={-1}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              },
            }}
            {...otherProps}
          />
        );
      }}
    />
  );
};
