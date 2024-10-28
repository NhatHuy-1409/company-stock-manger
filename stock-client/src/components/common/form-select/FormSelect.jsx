import { FormControl,InputLabel,Select } from '@material-ui/core'
import React from 'react'

function FormSelect({ id,label,value,onChange,options,user }) {
    return (
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                displayEmpty
                native
                fullWidth
                value={value}
                onChange={onChange}

            >
                {options.map((item) => (
                    <option key={item.value} value={item.value} disabled={item.permission === "admin" && !user?.isAdmin}>
                        {item.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}

export default FormSelect