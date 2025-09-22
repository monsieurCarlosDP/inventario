import {
  TextField as MUITextField,
  type BaseTextFieldProps,
} from "@mui/material";

type TSizes = "small" | "medium";
type TTextFields = "password" | "text" | "number" | "textarea";
interface ITextFieldProps extends BaseTextFieldProps {
  size?: TSizes;
  type?: TTextFields;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  size = "medium",
  type = "text",
  onChange,
  sx,
  ...props
}: ITextFieldProps) => {
  console.log(sx);
  return (
    <MUITextField
      onChange={onChange}
      size={size}
      type={type}
      fullWidth
      {...props}
    />
  );
};

export default TextField;
