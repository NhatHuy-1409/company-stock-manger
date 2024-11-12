import React,{ useMemo,useState } from 'react'
import TableTemplate from '../../table-template/TableTemplate'
import { addCompanyItem,deleteCompanyItem,getCompanyItems,updateCompanyItem } from '../../../api/company-items'
import validateCompanyItem from './validateCompanyItem';


function CompanyItemsList() {
    const [validationErrors,setValidationErrors] = useState({});

    const columns = useMemo(
        () => [
            // {
            //     accessorKey: 'id',
            //     header: 'Id',
            //     enableEditing: false,
            //     size: 80,
            // },
            {
                accessorKey: 'name',
                header: 'Name of Items',
                enableColumnPinning: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'code_asset',
                header: 'Code of Asset',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.code_asset,
                    helperText: validationErrors?.code_asset,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            code_asset: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'code_software',
                header: 'Code of Software',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.code_software,
                    helperText: validationErrors?.code_software,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            code_software: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'location',
                header: 'Location',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.location,
                    helperText: validationErrors?.location,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            location: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },

            {
                accessorKey: 'user',
                header: 'Used/Maintained Department',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.user,
                    helperText: validationErrors?.user,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            user: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'quantity_book',
                header: 'Quantity (Balance of Accounting)',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.quantity_book,
                    helperText: validationErrors?.quantity_book,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            quantity_book: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'quantity_check',
                header: 'Quantity (Inventoried)',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.quantity_check,
                    helperText: validationErrors?.quantity_check,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            quantity_check: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'supplier',
                header: 'Supplier',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.supplier,
                    helperText: validationErrors?.supplier,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            supplier: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'buying_date',
                header: 'Buying/Delivery Date',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'date',
                    error: !!validationErrors?.buying_date,
                    helperText: validationErrors?.buying_date,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            buying_date: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'price',
                header: 'Price',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.price,
                    helperText: validationErrors?.price,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            price: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'document_no',
                header: 'Document No.',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.document_no,
                    helperText: validationErrors?.document_no,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            document_no: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'note',
                header: 'Remark',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.note,
                    helperText: validationErrors?.note,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            note: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
        ],
        [validationErrors],
    );

    const apiFunctions = {
        getItems: getCompanyItems,
        addItem: addCompanyItem,
        updateItem: updateCompanyItem,
        deleteItem: deleteCompanyItem
    }

    return (
        <TableTemplate columns={columns} apiFunctions={apiFunctions} validateItem={validateCompanyItem} validationErrors={validationErrors} setValidationErrors={setValidationErrors} />
    )
}

export default CompanyItemsList