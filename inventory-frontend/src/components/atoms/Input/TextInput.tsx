import {
  TextField as MUITextField,
  type BaseTextFieldProps,
} from "@mui/material";

type TSizes = "small" | "medium";
type TTextFields = "password" | "text" | "number";
interface ITextFieldProps extends BaseTextFieldProps {
  size?: TSizes;
  type?: TTextFields;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  size = "medium",
  type = "text",
  onChange,
  ...props
}: ITextFieldProps) => {
  return (
    <MUITextField onChange={onChange} size={size} type={type} {...props} />
  );
};

export default TextField;
