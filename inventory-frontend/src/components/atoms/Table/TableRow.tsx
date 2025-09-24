import { TableRow as MUITableRow, type TableRowProps } from "@mui/material";

interface ITableRowProps extends TableRowProps {
  children: React.ReactNode;
}

const TableRow = ({ children, sx, ...props }: ITableRowProps) => {
  return (
    <MUITableRow
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUITableRow>
  );
};

export default TableRow;
