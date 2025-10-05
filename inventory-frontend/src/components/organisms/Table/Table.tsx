import { Table as MUITable, Paper, type TableProps } from "@mui/material";
import TableBody from "../../atoms/Table/TableBody";
import TableHead from "../../atoms/Table/TableHead";
import TableRow from "../../atoms/Table/TableRow";
import TableHeaderCell from "../../molecules/TableHeaderCell/TableHeaderCell";
import TablePagination from "../../molecules/TablePagination/TablePagination";

export interface IColumn {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
}

interface ITableProps extends Omit<TableProps, "children"> {
  columns: IColumn[];
  children: React.ReactNode;
  stickyHeader?: boolean;
  // Pagination props (optional)
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  };
}

const Table = ({
  columns,
  children,
  stickyHeader = false,
  pagination,
  ...props
}: ITableProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        overflow: "hidden",
        // Enable horizontal scrolling only on mobile/tablet
        overflowX: { xs: "auto", md: "hidden" },
        // Smooth scrolling
        scrollBehavior: "smooth",
        // Show scrollbar only on mobile for better UX
        "&::-webkit-scrollbar": {
          height: { xs: 8, md: 0 },
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: 4,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        },
      }}
    >
      <MUITable
        stickyHeader={stickyHeader}
        sx={{
          // On mobile: minimum width to trigger scroll
          // On desktop: full width to occupy all available space
          minWidth: { xs: 650, md: "100%" },
          width: { xs: "max-content", md: "100%" },
        }}
        {...props}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.id}
                align={column.align}
                sortable={column.sortable}
                sx={{
                  // On mobile: use minWidth, on desktop: use width percentage
                  width: { xs: "auto", md: column.width },
                  minWidth: { xs: column.minWidth || 100, md: "auto" },
                  // Prevent header cells from wrapping only on mobile
                  whiteSpace: { xs: "nowrap", md: "normal" },
                }}
              >
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MUITable>

      {pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.onPageChange}
        />
      )}
    </Paper>
  );
};

export default Table;
