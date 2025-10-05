import { Box, Pagination, Typography } from "@mui/material";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: TablePaginationProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 2, px: 2, py: 1 }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalItems} items
      </Typography>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default TablePagination;
