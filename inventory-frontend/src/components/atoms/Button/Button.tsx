import { Button as MUIButton, type ButtonProps } from "@mui/material";

export type TButtonSizes = "small" | "medium" | "large";

export interface IButton extends ButtonProps {
  size?: TButtonSizes;
}

const Button = ({ children, size, onClick, ...props }: IButton) => {
  return (
    <MUIButton size={size} onClick={onClick} {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
