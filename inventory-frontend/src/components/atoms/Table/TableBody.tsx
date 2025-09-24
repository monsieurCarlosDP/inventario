import { TableBody as MUITableBody, type TableBodyProps } from "@mui/material";

interface ITableBodyProps extends TableBodyProps {
  children: React.ReactNode;
}

const TableBody = ({ children, ...props }: ITableBodyProps) => {
  return <MUITableBody {...props}>{children}</MUITableBody>;
};

export default TableBody;
