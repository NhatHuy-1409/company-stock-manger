import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { handleExportRows } from './exportExcel';
import { useCreateItem,useDeleteItem,useGetItems,useUpdateItem } from './apiHandler';
import "./tableTemplate.scss"

const Example = ({ columns,apiFunctions,validationErrors,setValidationErrors,validateItem,...restProps }) => {

    const { getItems,addItem,updateItem,deleteItem } = apiFunctions

    //call CREATE hook
    const { mutateAsync: createUser,isPending: isCreatingUser } =
        useCreateItem(addItem);

    //call READ hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetItems(getItems);

    //call UPDATE hook
    const { mutateAsync: updateUser,isPending: isUpdatingUser } =
        useUpdateItem(updateItem);

    //call DELETE hook
    const { mutateAsync: deleteUser,isPending: isDeletingUser } =
        useDeleteItem(deleteItem);

    //CREATE action
    const handleCreateUser = async ({ values,table }) => {
        const newValidationErrors = validateItem(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        table.setCreatingRow(null); //exit creating mode

    };

    //UPDATE action
    const handleSaveUser = async ({ values,table }) => {

        const newValidationErrors = validateItem(values);

        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }

        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        enableRowSelection: true,
        enableColumnResizing: true,
        positionActionsColumn: "last",
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table,row,internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New Item</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex',flexDirection: 'column',gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table,row,internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit Item</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex',flexDirection: 'column',gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row,table }) => (
            <Box sx={{ display: 'flex',gap: '1rem' }} className="box-actions">
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (

            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => {
                        table.setCreatingRow(true);
                    }}
                >
                    Create New Item
                </Button>

                <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Rows
                </Button>
                <Button
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Page Rows
                </Button>
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Selected Rows
                </Button>
            </Box>
        ),
        initialState: {
            density: 'compact',
        },
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
        enableStickyHeader: true,
        layoutMode: 'grid-no-grow',
        enableColumnPinning: true,
    });

    return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const TableTemplate = ({ columns,...restProps }) => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example columns={columns} {...restProps} />
    </QueryClientProvider>
);

export default TableTemplate;

