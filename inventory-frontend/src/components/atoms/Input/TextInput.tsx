import {
  TextField as MUITextField,
  type BaseTextFieldProps,
} from "@mui/material";

type TSizes = "small" | "medium";
type TTextFields = "password" | "text" | "number";
interface ITextFieldProps extends BaseTextFieldProps {
  size?: TSizes;
  type?: TTextFields;
}

const TextField = ({ size = "medium", type = "text" }: ITextFieldProps) => {
  return <MUITextField size={size} type={type} variant="outlined" />;
};

export default TextField;
