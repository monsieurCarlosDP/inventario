import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Checkbox, type CheckboxProps } from "@mui/material";
import React from "react";

interface IStarCheckboxProps
  extends Omit<CheckboxProps, "icon" | "checkedIcon"> {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarCheckbox: React.FC<IStarCheckboxProps> = ({
  checked = false,
  onChange,
  ...props
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      icon={
        <StarBorderIcon
          sx={{
            color: "#ffc107", // Amarillo Material-UI
            fontSize: "1.5rem",
          }}
        />
      }
      checkedIcon={
        <StarIcon
          sx={{
            color: "#ffc107", // Amarillo Material-UI
            fontSize: "1.5rem",
          }}
        />
      }
      sx={{
        "&:hover": {
          backgroundColor: "rgba(255, 193, 7, 0.04)", // Hover amarillo suave
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default StarCheckbox;
