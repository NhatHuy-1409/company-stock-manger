import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Select from "@material-ui/core/Select"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { getMechanicalItems } from "../../../api/stock-manager"
import DialogEditItem from "./components/DialogEditItem"
import DialogAlertRemove from "./components/DialogAlertRemove"
import DialogSendEmail from "./components/DialogSendEmail"
import "./ItemsManager.scss"
import { TextField } from "@material-ui/core"
import DialogAddNewElectricItem from "./components/DialogAddNewElectricItem"

const useStyles = makeStyles({
  table: {},
})

const SORT_OPTIONS = [
  { value: "id", label: "Mã" },
  { value: "name", label: "Tên" },
  { value: "input_time", label: "Ngày nhập" },
  { value: "quantity", label: "Số lượng" },
]

const SORT_ORDER_OPTIONS = [
  { value: "ASC", label: "Tăng dần" },
  { value: "DESC", label: "Giảm dần" },
]

function MechanicalItemsManager(props) {
  const classes = useStyles()
  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const [openEditItem, setOpenEditItem] = useState(false)
  const [openAddNewItem, setOpenAddNewItem] = useState(false)
  const [openAlertRemove, setOpenAlertRemove] = useState(false)
  const [openDialogAlertEmail, setOpenDialogAlertEmail] = useState(false)

  const [sortProperty, setSortProperty] = useState("id")
  const [sortOrder, setSortOrder] = useState("ASC")

  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getData = async (sortProperty, sortOrder) => {
    const data = await getMechanicalItems(sortProperty, sortOrder)
    setList(data)
  }

  useEffect(() => {
    getData(sortProperty, sortOrder)
  }, [sortProperty, sortOrder])

  const handleUpdateDataSuccess = () => {
    getData(sortProperty, sortOrder)
    handleClose()
  }

  const handleDeleteItem = (item) => {
    setOpenAlertRemove(true)
    setSelectedItem(item)
  }

  const rows = [
    ...list.map((item) =>
      createData(
        item.id,
        item.name,
        item.input_time,
        item.quantity,
        item.description,
        item.type_id
      )
    ),
  ]

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleClickOpen(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    )
  }

  const dialogEditItem = openEditItem ? (
    <DialogEditItem
      open={openEditItem}
      handleClose={handleClose}
      selectedItem={selectedItem}
      onUpdateSuccess={handleUpdateDataSuccess}
    />
  ) : null

  const dialogAddNewItem = openAddNewItem ? (
    <DialogAddNewElectricItem
      open={openAddNewItem}
      handleClose={() => setOpenAddNewItem(false)}
      selectedItem={selectedItem}
      onUpdateSuccess={handleUpdateDataSuccess}
    />
  ) : null

  const dialogAlertRemove = openAlertRemove ? (
    <DialogAlertRemove
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedItem}
      onSuccess={() => getData(sortProperty, sortOrder)}
    />
  ) : null

  const dialogAlertSendEmail = openDialogAlertEmail ? (
    <DialogSendEmail
      open={openDialogAlertEmail}
      handleClose={() => setOpenDialogAlertEmail(false)}
      onSuccess={() => getData(sortProperty, sortOrder)}
    />
  ) : null

  const selectSort = (
    <div className="selectSort">
      {/* <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => {
          if (e.target.value !== "") {
            setList(
              rows.filter((item) => item?.name?.includes(e.target.value)) || ""
            )
          } else {
            getData(sortProperty, sortOrder)
          }
        }}
      /> */}
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
    </div>
  )
  return (
    <div className="itemsManager">
      <ButtonGroup>
        <Button color="primary" onClick={() => setOpenAddNewItem(true)}>
          Thêm thiết bị
        </Button>
      </ButtonGroup>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              {/* <TableCell>Vị trí</TableCell> */}
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                {/* <TableCell>{`${row.stock} (${row.stock_type})`}</TableCell> */}
                <TableCell>{getDate(row.input_time)}</TableCell>
                <TableCell>{getDate(row.quantity)}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{actionsBlock(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogEditItem}
      {dialogAddNewItem}
      {dialogAlertRemove}
      {dialogAlertSendEmail}
    </div>
  )
}

const getDate = (stringDate) => {
  if (!stringDate) return "--"
  const cvDate = new Date(stringDate)
  return format(cvDate, "dd/MM/yyyy")
}

const createData = (id, name, input_time, quantity, description, type_id) => {
  return {
    id,
    name,
    input_time,
    quantity,
    description,
    type_id,
  }
}

export default MechanicalItemsManager
