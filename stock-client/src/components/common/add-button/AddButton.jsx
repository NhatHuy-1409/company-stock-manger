import { Button,ButtonGroup } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add';

function AddButton({ children,...restProps }) {
    return (
        <ButtonGroup>
            <Button color="primary" {...restProps}>
                <AddIcon />
                {children}
            </Button>
        </ButtonGroup>
    )
}

export default AddButton