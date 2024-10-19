import { TablePagination } from '@material-ui/core'
import React from 'react'

function Pagination({count,page,setPage,rowsPerPage,setRowsPerPage}) {

  const handlePageChange = (event,newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
  }
    return (
            <TablePagination
                count={count}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 20]}
            />
    )
}

export default Pagination