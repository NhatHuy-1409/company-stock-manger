import { TextField } from '@material-ui/core'
import React from 'react'
import { removeVietnameseTones } from '../../../utils/removeVietnameseTones'

function SearchBar({ rows,setList,getData }) {
    return (
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
                }
            }}
        />
    )
}

export default SearchBar