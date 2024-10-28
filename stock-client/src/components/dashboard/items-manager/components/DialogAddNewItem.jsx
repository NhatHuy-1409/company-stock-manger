import DateFnsUtils from "@date-io/date-fns"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { format } from "date-fns"
import React,{ useEffect,useState } from "react"
import { addItem } from "../../../../api/stock-manager"
import { getItemTypes } from "../../../../meta-data/item-types"
import { statuses } from "../../../../meta-data/statuses"
import { stocks } from "../../../../meta-data/stocks"
import { users } from "../../../../meta-data/users"
import { TextField } from "@material-ui/core"
import FormSelect from "../../../common/form-select/FormSelect"

export default function DialogAddNewItem({
  open,
  handleClose,
  onUpdateSuccess,
}) {
  // modal value
  const [typeId,setTypeId] = useState("1")
  const [statusId,setStatusId] = useState("1")
  const [stockId,setStockId] = useState("1")
  const [userId,setUserId] = useState("1")
  const [description,setDescription] = useState("")
  const [inputTime,setInputTime] = useState(new Date())
  const [name,setName] = useState("")
  const [productId,setProductId] = useState("")

  // list options
  const [statusOptions,setStatusOptions] = useState([])
  const [stockOptions,setStockOptions] = useState([])
  const [userOptions,setUserOptions] = useState([])
  const [itemTypes,setItemTypes] = useState([])

  // error state

  const [nameErr,setNameErr] = useState("")
  const [productIdErr,setProductIdErr] = useState("")

  const [isValidation,setIsValidation] = useState(false)

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses()
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
      setNameErr("Không được bỏ trống")
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
      setProductIdErr("Không được bỏ trống")
      return
    }
    setProductIdErr(null)
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

  const handleSubmitForm = (e) => {
    const payload = {
      product_id: productId,
      name,
      type: typeId,
      status: statusId,
      stock_id: stockId,
      user_id: userId,
      input_time: inputTime ? format(inputTime,"yyyy-MM-dd") : null,
      description: description,
    }

    addItem(payload)
      .then((res) => {
        console.log("pl: ",payload)
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
        <DialogTitle id="form-dialog-title">Thêm thiết bị</DialogTitle>
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

            <FormSelect
              id="type"
              label="Loại thiết bị"
              value={typeId}
              onChange={handleTypeIdChange}
              options={itemTypes}
            />
            <FormSelect
              label="Trạng thái"
              value={statusId}
              onChange={handleStatusChange}
              options={statusOptions}
            />
            <FormSelect
              label="Bộ phận"
              value={stockId}
              onChange={handleStockChange}
              options={stockOptions}
            />
            <FormSelect
              label="Người phụ trách"
              value={userId}
              onChange={handleUserChange}
              options={userOptions}
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
          <Button onClick={handleSubmitForm} color="primary" disabled={!(name && productId)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
