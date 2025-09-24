import { Typography, type SxProps, type Theme } from "@mui/material";
import TableCell from "../../atoms/Table/TableCell";

interface ITableHeaderCellProps {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const TableHeaderCell = ({
  children,
  align = "left",
  sortable = false,
  onClick,
  ...props
}: ITableHeaderCellProps) => {
  return (
    <TableCell
      align={align}
      onClick={onClick}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        fontWeight: "bold",
        cursor: sortable ? "pointer" : "default",
        "&:hover": sortable
          ? {
              backgroundColor: "primary.dark",
            }
          : {},
        ...props.sx,
      }}
      {...props}
    >
      <Typography variant="body2" fontWeight="bold">
        {children}
      </Typography>
    </TableCell>
  );
};

export default TableHeaderCell;
