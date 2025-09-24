import { TableHead as MUITableHead, type TableHeadProps } from "@mui/material";

interface ITableHeadProps extends TableHeadProps {
  children: React.ReactNode;
}

const TableHead = ({ children, sx, ...props }: ITableHeadProps) => {
  return (
    <MUITableHead
      sx={{
        backgroundColor: "#f5f5f5",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUITableHead>
  );
};

export default TableHead;
