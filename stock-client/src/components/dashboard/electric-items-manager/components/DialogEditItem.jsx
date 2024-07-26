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
import "./DialogEditItem.scss"
import { format } from "date-fns"
import { updateElectricItem } from "../../../../api/stock-manager"
import { connect } from "react-redux"
import { TextField } from "@material-ui/core"

function DialogEditItem({
  open,
  handleClose,
  selectedItem,
  onUpdateSuccess,
  user,
}) {
  // modal value
  const [typeId, setTypeId] = useState(selectedItem.type_id)
  const [description, setDescription] = useState(selectedItem.description || "")
  const [inputTime, setInputTime] = useState(
    selectedItem.input_time ? new Date(selectedItem.input_time) : null
  )
  const [name, setName] = useState(selectedItem.name)
  const [productId, setProductId] = useState(selectedItem.product_id)
  const [position, setPosition] = useState(selectedItem.position)
  const [quantity, setQuantity] = useState(1)

  // list options
  const [itemTypes, setItemTypes] = useState([])

  // error state

  const [nameErr, setNameErr] = useState(null)
  const [productIdErr, setProductIdErr] = useState(null)
  const [positionErr, setPositionErr] = useState(null)

  useEffect(() => {
    const getListItemTypes = async () => {
      const itemTypes = await getElectricItemTypes()
      setItemTypes(itemTypes)
    }
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
  const handlePositionChange = (event) => {
    const { value } = event.target
    setPosition(value)
  }

  const handleCheckValidatePosition = (event) => {
    if (!event || !event.target.value) {
      setPositionErr("Không được bỏ trống tên")
      return
    }
    setPositionErr(null)
  }

  const handleQuantity = (event) => {
    const { value } = event.target
    setQuantity(value)
  }

  const handleTypeIdChange = (event) => {
    const { value } = event.target
    setTypeId(value)
  }

  const handleSubmitForm = () => {
    const payload = {
      id: selectedItem.id,
      product_id: productId,
      name: name,
      type: typeId,
      input_time: inputTime ? format(inputTime, "yyyy-MM-dd") : null,
      quantity: quantity,
      position: position,
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
              label="Loại"
              value={typeId}
              onChange={handleTypeIdChange}
            >
              {itemTypes.map((item) => (
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
                <TextField
                  inputProps={{ type: "number" }}
                  fullWidth
                  label="Số lượng"
                  value={quantity}
                  onChange={handleQuantity}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              fullWidth
              label="Vị trí"
              value={position}
              onChange={handlePositionChange}
              onBlur={handleCheckValidatePosition}
              error={positionErr}
              helperText={positionErr}
            />
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
