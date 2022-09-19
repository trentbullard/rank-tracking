import {
  Box,
  TablePagination,
} from '@mui/material';

const Pagination = props => {
  const {
    count,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <Box display="flex" justifyContent="flex-end" width="100%">
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        SelectProps={{
          sx: {
            ml: "0px",
            mr: "5px",
          },
        }}
        sx={{
          ".MuiTablePagination-actions": {
            mx: "0px",
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
