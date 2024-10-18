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
import React,{ useEffect,useState } from "react"
import { getItemTypes } from "../../../../meta-data/item-types"
import { statuses } from "../../../../meta-data/statuses"
import { stocks } from "../../../../meta-data/stocks"
import { users } from "../../../../meta-data/users"
import "./DialogEditItem.scss"
import { format } from "date-fns"
import { updateItem } from "../../../../api/stock-manager"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
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
  const [typeId,setTypeId] = useState(selectedItem.type_id)
  const [statusId,setStatusId] = useState(selectedItem.status_id)
  const [stockId,setStockId] = useState(selectedItem.stock_id)
  const [userId,setUserId] = useState(selectedItem.user_id)
  const [description,setDescription] = useState(selectedItem.description || "")
  const [inputTime,setInputTime] = useState(
    selectedItem.input_time ? new Date(selectedItem.input_time) : null
  )
  const [name,setName] = useState(selectedItem.name)
  const [productId,setProductId] = useState(selectedItem.product_id)
  const [personInCharge,setPersonInCharge] = useState(
    selectedItem.person_in_charge
  )

  // list options
  const [statusOptions,setStatusOptions] = useState([])
  const [stockOptions,setStockOptions] = useState([])
  const [userOptions,setUserOptions] = useState([])
  const [itemTypes,setItemTypes] = useState([])

  // error state

  const [nameErr,setNameErr] = useState(null)
  const [productIdErr,setProductIdErr] = useState(null)
  const [personInChargeErr,setPersonInChargeErr] = useState(null)

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses()
      console.log(listStt)
      setStatusOptions(listStt)
    }
    const getStocks = async () => {
      const listStocks = await stocks()
      setStockOptions(listStocks)
    }
    const getUsers = async () => {
      const listUsers = await users()
      setUserOptions(listUsers)
    }
    const getListItemTypes = async () => {
      const itemTypes = await getItemTypes()
      setItemTypes(itemTypes)
    }

    getStatuses()
    getStocks()
    getListItemTypes()
    getUsers()
  },[])

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
  const handleUserChange = (event) => {
    const { value } = event.target
    setUserId(value)
  }

  const handleTypeIdChange = (event) => {
    const { value } = event.target
    setTypeId(value)
  }

  const handleSubmitForm = () => {
    const payload = {
      id: selectedItem.id,
      product_id: productId,
      name,
      type: typeId,
      status: statusId,
      stock_id: stockId,
      person_in_charge: personInCharge,
      input_time: inputTime ? format(inputTime,"yyyy-MM-dd") : null,
      description: description,
      user_id: userId
    }
    updateItem(payload)
      .then((res) => {
        console.log("pl: ",payload)
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
        <DialogTitle id="form-dialog-title">
          Edit: {selectedItem && `${selectedItem.name} (${selectedItem.id})`}
        </DialogTitle>
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
            <FormControl fullWidth>
              <InputLabel>Loại</InputLabel>
              <Select fullWidth value={typeId} onChange={handleTypeIdChange}>
                {itemTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                fullWidth
                label="Status"
                value={statusId}
                onChange={handleStatusChange}
              >
                {statusOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.permission === "admin" && !user.isAdmin}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Kho</InputLabel>
              <Select fullWidth value={stockId} onChange={handleStockChange}>
                {stockOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.permission === "admin" && !user.isAdmin}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Người phụ trách</InputLabel>
              <Select fullWidth value={userId} onChange={handleUserChange}>
                {userOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.permission === "admin" && !user.isAdmin}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>

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

export default connect(mapStateToProps,null)(DialogEditItem)
