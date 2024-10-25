import { Select } from '@material-ui/core'
import React from 'react'

const SORT_ORDER_OPTIONS = [
    { value: "ASC",label: "Tăng dần" },
    { value: "DESC",label: "Giảm dần" },
]


function SortBar({ SORT_OPTIONS,sortProperty,setSortProperty,sortOrder,setSortOrder }) {
    return (
        <>
            Sắp xếp theo:&nbsp;
            <Select
                native
                label="Sắp xếp"
                value={sortProperty}
                onChange={(e) => setSortProperty(e.target.value)}
            >
                {SORT_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </Select>
            Thứ tự:&nbsp;
            <Select
                native
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                {SORT_ORDER_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </Select>
        </>
    )
}

export default SortBar