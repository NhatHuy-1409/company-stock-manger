export function excelDateToJSDate(serial) {
    // Excel date format starts from January 1, 1900 (serial number 1)
    // Subtract 1 as Excel's date system starts from day 1
    const baseDate = new Date(1900,0,1);
    baseDate.setDate(baseDate.getDate() + serial - 1);

    // Format the date as "dd/mm/yyyy"
    const day = String(baseDate.getDate()).padStart(2,'0');
    const month = String(baseDate.getMonth() + 1).padStart(2,'0'); // Months are 0-indexed
    const year = baseDate.getFullYear();

    return `${day}/${month}/${year}`;
}