import { TableBody } from '@material-ui/core'
import React from 'react'

function ListItems(tableHeaders,tableBody,selectSort) {

    const dialogEditItem = openEditItem ? (
        <DialogEditItem
          open={openEditItem}
          handleClose={handleClose}
          selectedItem={selectedItem}
          onUpdateSuccess={handleUpdateDataSuccess}
        />
      ) : null
    
      const dialogAddNewItem = openAddNewItem ? (
        <DialogAddNewItem
          open={openAddNewItem}
          handleClose={() => setOpenAddNewItem(false)}
          selectedItem={selectedItem}
          onUpdateSuccess={handleUpdateDataSuccess}
        />
      ) : null
    
      const dialogAlertRemove = openAlertRemove ? (
        <DialogAlertRemove
          open={openAlertRemove}
          handleClose={() => setOpenAlertRemove(false)}
          selectedItem={selectedItem}
          onSuccess={() => getData(sortProperty, sortOrder)}
        />
      ) : null
    
      const dialogAlertSendEmail = openDialogAlertEmail ? (
        <DialogSendEmail
          open={openDialogAlertEmail}
          handleClose={() => setOpenDialogAlertEmail(false)}
          onSuccess={() => getData(sortProperty, sortOrder)}
        />
      ) : null
      
    return (
        <div>
            <div className="itemsManager">
                <ButtonGroup>
                    <Button color="primary" onClick={() => setOpenAddNewItem(true)}>
                        Thêm thiết bị
                    </Button>
                </ButtonGroup>
                {selectSort}
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map((header, idx) => (
                                    <TableCell key={idx}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableBody}
                        </TableBody>

                        <Pagination
                            count={rows?.length}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </Table>
                </TableContainer>
                {dialogEditItem}
                {dialogAddNewItem}
                {dialogAlertRemove}
                {dialogAlertSendEmail}
            </div>
        </div>
    )
}

export default ListItems