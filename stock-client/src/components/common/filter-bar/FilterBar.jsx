import React from 'react'
import { removeVietnameseTones } from '../../../utils/removeVietnameseTones'
import { Select,TextField } from '@material-ui/core'

const SORT_ORDER_OPTIONS = [
    { value: "ASC",label: "Tăng dần" },
    { value: "DESC",label: "Giảm dần" },
]

function FilterBar({ subMenu,rows,setList,getData,sortOptions,sortProperty,setSortProperty,sortOrder,setSortOrder }) {
    return (
        <div className="selectSort">
            Lọc theo:&nbsp;
            {/* <SubMenu
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                menu={FILTER_OPTIONS}
                list={allItems}
                setList={setList}
                setTypeFilter={setTypeFilter}
                setStatusFilter={setStatusFilter}
                setStockFilter={setStockFilter}
                setUserFilter={setUserFilter}
                itemTypes={itemTypes}
                itemStatuses={itemStatuses}
                itemStocks={itemStocks}
                itemUsers={itemUsers}
            /> */}
            {subMenu}
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={(e) => {
                    const searchValue = removeVietnameseTones(
                        e.target.value.toLowerCase()
                    )

                    if (searchValue !== "") {
                        setList(
                            rows.filter((item) =>
                                removeVietnameseTones(item?.name?.toLowerCase())?.includes(
                                    searchValue.toLowerCase()
                                )
                            ) || ""
                        )
                    } else {
                        getData()
                        // getData(
                        //     sortProperty,
                        //     sortOrder,
                        //     typeFilter,
                        //     statusFilter,
                        //     stockFilter,
                        //     userFilter
                        // )
                    }
                }}
            />
            Sắp xếp theo:&nbsp;
            <Select
                native
                label="Sắp xếp"
                value={sortProperty}
                onChange={(e) => setSortProperty(e.target.value)}
            >
                {sortOptions.map((item) => (
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
        </div>
    )
}

export default FilterBar