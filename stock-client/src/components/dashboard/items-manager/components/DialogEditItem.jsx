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
import React,{ useEffect,useState } from "react"
import { getItemTypes } from "../../../../meta-data/item-types"
import { statuses } from "../../../../meta-data/statuses"
import { stocks } from "../../../../meta-data/stocks"
import { users } from "../../../../meta-data/users"
import "./DialogEditItem.scss"
import { format } from "date-fns"
import { updateItem } from "../../../../api/stock-manager"
import { connect } from "react-redux"
import { TextField } from "@material-ui/core"
import FormSelect from "../../../common/form-select/FormSelect"

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

  // list options
  const [statusOptions,setStatusOptions] = useState([])
  const [stockOptions,setStockOptions] = useState([])
  const [userOptions,setUserOptions] = useState([])
  const [itemTypes,setItemTypes] = useState([])

  // error state

  const [nameErr,setNameErr] = useState(null)
  const [productIdErr,setProductIdErr] = useState(null)

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
          Chỉnh sửa: {selectedItem && `${selectedItem.name}`}
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

            <FormSelect
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
