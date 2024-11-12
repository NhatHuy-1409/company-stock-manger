import { mkConfig,generateCsv,download } from 'export-to-csv'; //or use your library of choice here

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
};

const handleExportData = (data) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
};

export { handleExportData,handleExportRows }