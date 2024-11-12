const validateRequired = (value) => !!value.length;

function validateCompanyItem(user) {
    return {
        name: !validateRequired(user.name)
            ? 'Name is Required'
            : '',
        code_asset: !validateRequired(user.code_asset) ? 'Code of Asset is Required' : '',
        code_software: !validateRequired(user.code_software) ? 'Code of Software is Required' : '',
        location: !validateRequired(user.location) ? 'Location is Required' : '',
        user: !validateRequired(user.user) ? 'is Required' : '',
        quantity_book: !validateRequired(user.quantity_book) ? ' is Required' : '',
        quantity_check: !validateRequired(user.quantity_check) ? ' is Required' : '',
        supplier: !validateRequired(user.supplier) ? ' is Required' : '',
        buying_date: !validateRequired(user.buying_date) ? ' is Required' : '',
        price: !validateRequired(user.price) ? ' is Required' : '',
        document_no: !validateRequired(user.document_no) ? ' is Required' : '',
        note: !validateRequired(user.note) ? ' is Required' : '',
    };
}
export default validateCompanyItem