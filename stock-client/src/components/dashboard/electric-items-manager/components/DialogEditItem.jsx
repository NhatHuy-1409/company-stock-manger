import DateFnsUtils from "@date-io/date-fns"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import React, { useEffect, useState } from "react"
import { getElectricItemTypes } from "../../../../meta-data/electric-item-types"
import { statuses } from "../../../../meta-data/statuses"
import { stocks } from "../../../../meta-data/stocks"
import "./DialogEditItem.scss"
import { format } from "date-fns"
import { updateElectricItem } from "../../../../api/stock-manager"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import { connect } from "react-redux"

function DialogEditItem({
  open,
  handleClose,
  selectedItem,
  onUpdateSuccess,
  user,
}) {
  // modal value
  const [typeId, setTypeId] = useState(selectedItem.type_id)
  const [statusId, setStatusId] = useState(selectedItem.status_id)
  const [stockId, setStockId] = useState(selectedItem.stock_id)
  const [description, setDescription] = useState(selectedItem.description || "")
  const [inputTime, setInputTime] = useState(
    selectedItem.input_time ? new Date(selectedItem.input_time) : null
  )
  const [expiryTime, setExpiryTime] = useState(
    selectedItem.expiry_time ? new Date(selectedItem.expiry_time) : null
  )
  const [outputTime, setOutputTime] = useState(
    selectedItem.output_time ? new Date(selectedItem.output_time) : null
  )

  // list options
  const [statusOptions, setStatusOptions] = useState([])
  const [stockOptions, setStockOptions] = useState([])
  const [electricItemsTypes, setElectricItemsTypes] = useState([])

  useEffect(() => {
    // const getStatuses = async () => {
    //   const listStt = await statuses()
    //   console.log(listStt)
    //   setStatusOptions(listStt)
    // }
    // const getStocks = async () => {
    //   const listStocks = await stocks()
    //   setStockOptions(listStocks)
    // }
    // const getListItemTypes = async () => {
    //   const itemTypes = await getItemTypes()
    //   setItemTypes(itemTypes)
    // }

    // getStatuses()
    // getStocks()
    // getListItemTypes()

    const getListElectricItemsTypes = async () => {
      const electricItemsType = await getElectricItemTypes()
      setElectricItemsTypes(electricItemsType)
    }
    getListElectricItemsTypes()
  }, [])

  const handleStatusChange = (event) => {
    const { value } = event.target
    setStatusId(value)
  }

  const handleStockChange = (event) => {
    const { value } = event.target
    setStockId(value)
  }

  const handleTypeIdChange = (event) => {
    const { value } = event.target
    setTypeId(value)
  }

  const handleSubmitForm = () => {
    const payload = {
      id: selectedItem.id,
      type: typeId,
      input_time: inputTime ? format(inputTime, "yyyy-MM-dd") : null,
      // output_time: outputTime ? format(outputTime, "yyyy-MM-dd") : null,
      // expiry_time: expiryTime ? format(expiryTime, "yyyy-MM-dd") : null,
      // status: statusId,
      // stock_id: stockId,
      quantity: 1,
      description: description,
    }
    updateElectricItem(payload)
      .then((res) => {
        console.log("pl: ", payload)
        onUpdateSuccess()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="dialogEditItem">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Item</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <Select
              native
              fullWidth
              label="Name"
              value={typeId}
              onChange={handleTypeIdChange}
            >
              {electricItemsTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-between">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Ngày nhập"
                  value={inputTime}
                  onChange={(val) => setInputTime(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextareaAutosize
              value={description}
              className="textArea"
              aria-label="minimum height"
              minRows={3}
              placeholder="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(DialogEditItem)
