import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { Button,Typography } from '@material-ui/core';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { addCompanyItems } from '../../api/company-items/index';

const removeSpacesFromKeys = (data) => {
    return data.map(item => {
        const newItem = {};

        // Iterate over each key in the object
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                // Remove spaces from the key and add the value to the new item
                const newKey = key.replace(/\s+/g,'');
                newItem[newKey] = item[key];
            }
        }

        return newItem;
    });
};

const updateTypeDate = (data) => {
    return data.map((item) => ({ ...item,buying_date: item?.buying_date ? format(item?.buying_date,"yyyy-MM-dd") : null,}))
}

const UploadExcel = () => {
    const [file,setFile] = useState(null)

    const [excelData,setExcelData] = useState(null);

    const handleFileChange = (event) => {
        const dataFile = event.target.files[0];
        if (dataFile) {
            setFile(dataFile)
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data,{ type: 'array' });

                // Convert the first sheet to JSON
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                console.log({ data,workbook,worksheet });

                // Update the state with the extracted data
                setExcelData(removeSpacesFromKeys(jsonData));
            };

            reader.readAsArrayBuffer(dataFile);
        }
    };

    const handleUpload = () => {
        console.log({ excelData });

        addCompanyItems(excelData)
            .then((res) => {
                console.log("pl: ",excelData)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h5">Upload and Parse Excel File</Typography>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="excel-upload"
            />
            <label htmlFor="excel-upload">
                <Button variant="contained" component="span" >
                    Choose Excel File
                </Button>
            </label>


            {excelData && (

                <div style={{ marginTop: 20 }}>
                    {file && <Typography>{file.name}</Typography>}
                    <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: 10 }}>
                        Upload and Save
                    </Button>
                    <Typography variant="h6">Extracted Data:</Typography>
                    <pre>{JSON.stringify(excelData,null,2)}</pre>
                </div>
            )}
        </div>
    );

};

export default UploadExcel;
