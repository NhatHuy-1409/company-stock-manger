import { FormControl, InputLabel, Select } from '@material-ui/core'
import React from 'react'

function FormSelect({label,value,onChange,options,user}) {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                displayEmpty
                native
                fullWidth
                // label="Stock"
                value={value}
                onChange={onChange}
            >
                {options.map((item) => (
                    <option key={item.value} value={item.value}  disabled={item.permission === "admin" && !user?.isAdmin}>
                        {item.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}

export default FormSelect