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
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { addItem } from "../../../../api/stock-manager"
import { getItemTypes } from "../../../../meta-data/item-types"
import { statuses } from "../../../../meta-data/statuses"
import { stocks } from "../../../../meta-data/stocks"
import { TextField } from "@material-ui/core"

export default function DialogAddNewItem({
  open,
  handleClose,
  onUpdateSuccess,
}) {
  // modal value
  const [typeId, setTypeId] = useState("1")
  const [statusId, setStatusId] = useState("1")
  const [stockId, setStockId] = useState("1")
  const [description, setDescription] = useState("")
  const [inputTime, setInputTime] = useState(new Date())
  const [name, setName] = useState("")
  const [productId, setProductId] = useState("")
  const [personInCharge, setPersonInCharge] = useState("")

  // list options
  const [statusOptions, setStatusOptions] = useState([])
  const [stockOptions, setStockOptions] = useState([])
  const [itemTypes, setItemTypes] = useState([])

  // error state

  const [nameErr, setNameErr] = useState(null)
  const [productIdErr, setProductIdErr] = useState(null)
  const [personInChargeErr, setPersonInChargeErr] = useState(null)

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses()
      setStatusOptions(listStt)
    }
    const getStocks = async () => {
      const listStocks = await stocks()
      setStockOptions(listStocks)
    }
    const getListItemTypes = async () => {
      const itemTypes = await getItemTypes()
      setItemTypes(itemTypes)
    }

    getStatuses()
    getStocks()
    getListItemTypes()
  }, [])

  const handleNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  const handleCheckValidateName = (event) => {
    if (!event || !event.target.value) {
      setNameErr("Không được bỏ trống tên")
      return
    }
    setNameErr(null)
  }
  const handleProductIdChange = (event) => {
    const { value } = event.target
    setProductId(value)
  }

  const handleCheckValidateProductId = (event) => {
    if (!event || !event.target.value) {
      setProductIdErr("Không được bỏ trống tên")
      return
    }
    setProductIdErr(null)
  }
  const handlePersonInChargeChange = (event) => {
    const { value } = event.target
    setPersonInCharge(value)
  }

  const handleCheckValidatePersonInCharge = (event) => {
    if (!event || !event.target.value) {
      setPersonInChargeErr("Không được bỏ trống tên")
      return
    }
    setPersonInChargeErr(null)
  }

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
      product_id: productId,
      name,
      type: typeId,
      status: statusId,
      stock_id: stockId,
      person_in_charge: personInCharge,
      input_time: inputTime ? format(inputTime, "yyyy-MM-dd") : null,
      description: description,
    }
    console.log(payload)
    addItem(payload)
      .then((res) => {
        console.log("pl: ", payload)
        onUpdateSuccess()
        handleClose()
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
            <TextField
              fullWidth
              label="Mã thiết bị"
              value={productId}
              onChange={handleProductIdChange}
              onBlur={handleCheckValidateProductId}
              error={productIdErr}
              helperText={productIdErr}
            />
            <TextField
              fullWidth
              label="Tên thiết bị"
              value={name}
              onChange={handleNameChange}
              onBlur={handleCheckValidateName}
              error={nameErr}
              helperText={nameErr}
            />
            <Select
              native
              fullWidth
              label="Type"
              value={typeId}
              onChange={handleTypeIdChange}
            >
              {itemTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select
              native
              fullWidth
              label="Status"
              value={statusId}
              onChange={handleStatusChange}
            >
              {statusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select
              displayEmpty
              native
              fullWidth
              label="Stock"
              value={stockId}
              onChange={handleStockChange}
            >
              {stockOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <TextField
              fullWidth
              label="Người phụ trách"
              value={personInCharge}
              onChange={handlePersonInChargeChange}
              onBlur={handleCheckValidatePersonInCharge}
              error={personInChargeErr}
              helperText={personInChargeErr}
            />
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
