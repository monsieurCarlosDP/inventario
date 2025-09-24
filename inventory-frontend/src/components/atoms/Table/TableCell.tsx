import { TableCell as MUITableCell, type TableCellProps } from "@mui/material";

interface ITableCellProps extends TableCellProps {
  children: React.ReactNode;
}

const TableCell = ({ children, sx, ...props }: ITableCellProps) => {
  return (
    <MUITableCell
      sx={{
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        // Responsive text wrapping: nowrap on mobile, normal on desktop
        whiteSpace: { xs: "nowrap", md: "normal" },
        // Text overflow only on mobile
        overflow: { xs: "hidden", md: "visible" },
        textOverflow: { xs: "ellipsis", md: "clip" },
        // Responsive padding: smaller on mobile, standard on desktop
        padding: { xs: "8px 12px", md: "16px" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUITableCell>
  );
};

export default TableCell;
