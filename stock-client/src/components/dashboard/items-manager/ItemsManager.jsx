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
import { getItems, getStatuses, getStocks } from "../../../api/stock-manager"
import DialogAddNewItem from "./components/DialogAddNewItem"
import DialogEditItem from "./components/DialogEditItem"
import DialogAlertRemove from "./components/DialogAlertRemove"
import DialogSendEmail from "./components/DialogSendEmail"
import "./ItemsManager.scss"
import { TextField } from "@material-ui/core"
import SubMenu from "../../SubMenu"
import { getItemTypes } from "../../../meta-data/item-types"
const useStyles = makeStyles({
  table: {},
})

const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "product_id", label: "Mã" },
  { value: "name", label: "Tên" },
  { value: "type", label: "Loại" },
  { value: "status_id", label: "Trạng thái" },
  { value: "stock_id", label: "Bộ phận" },
  { value: "person_in_charge", label: "Người phụ trách" },
  { value: "input_time", label: "Ngày nhập kho" },
]

const SORT_ORDER_OPTIONS = [
  { value: "ASC", label: "Tăng dần" },
  { value: "DESC", label: "Giảm dần" },
]

function ItemsManager(props) {
  const classes = useStyles()
  const [allItems, setAllItems] = useState([])
  const [list, setList] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [itemStatuses, setItemStatuses] = useState([])
  const [itemStocks, setItemStocks] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const [openEditItem, setOpenEditItem] = useState(false)
  const [openAddNewItem, setOpenAddNewItem] = useState(false)
  const [openAlertRemove, setOpenAlertRemove] = useState(false)
  const [openDialogAlertEmail, setOpenDialogAlertEmail] = useState(false)

  const [sortProperty, setSortProperty] = useState("id")
  const [sortOrder, setSortOrder] = useState("ASC")

  const [nameFilter, setNameFilter] = useState("Tất cả")
  const [typeFilter, setTypeFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [stockFilter, setStockFilter] = useState(null)

  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getIninitalData = async () => {
    const fullData = await getItems(sortProperty, sortOrder)
    const types = await getItemTypes()
    const statuses = await getStatuses()
    const stocks = await getStocks()
    setAllItems(fullData)
    setItemTypes(types)
    setItemStatuses(statuses)
    setItemStocks(stocks)
  }

  const getData = async (sortProperty, sortOrder, type, status, stock) => {
    const data = await getItems(sortProperty, sortOrder, type, status, stock)

    setList(data)
  }
  useEffect(() => {
    getData(sortProperty, sortOrder, typeFilter, statusFilter, stockFilter)
  }, [sortProperty, sortOrder, typeFilter, statusFilter, stockFilter])

  useEffect(() => {
    getIninitalData()
  }, [])

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
        item.status,
        item.stock,
        item.stock_type,
        item.status_id,
        item.stock_id,
        item.stock_type_id,
        item.description,
        item.type_id,
        item.type,
        item.person_in_charge,
        item.product_id
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
    <DialogAddNewItem
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

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    },
    {
      value: "Loại",
      menuLevel: 0,
      nestedOptions: itemTypes?.map((item) => {
        return {
          value: item?.label,
          menuLevel: 1,
        }
      }),
    },
    {
      value: "Trạng thái",
      menuLevel: 0,
      nestedOptions: itemStatuses?.map((item) => {
        return {
          value: item?.name,
          menuLevel: 1,
        }
      }),
    },
    {
      value: "Bộ phận",
      menuLevel: 0,
      nestedOptions: itemStocks?.map((item) => {
        return {
          value: item?.name,
          menuLevel: 1,
        }
      }),
    },
  ]

  // Hàm chuyển đổi chuỗi sang dạng không dấu
  const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    str = str.replace(/Đ/g, "D")
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, "") // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ")
    str = str.trim()
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    )
    return str
  }

  const selectSort = (
    <div className="selectSort">
      Lọc theo:&nbsp;
      <SubMenu
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        menu={FILTER_OPTIONS}
        list={allItems}
        setList={setList}
        setTypeFilter={setTypeFilter}
        setStatusFilter={setStatusFilter}
        setStockFilter={setStockFilter}
        itemTypes={itemTypes}
        itemStatuses={itemStatuses}
        itemStocks={itemStocks}
      />
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
            getData(
              sortProperty,
              sortOrder,
              typeFilter,
              statusFilter,
              stockFilter
            )
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
  function convertDateFormat(dateStr) {
    const [day, month, year] = dateStr.split("/")
    return `${year}-${month}-${day}`
  }
  function calculateDaysBetween(date1, date2 = new Date()) {
    // Chuyển đổi chuỗi ngày tháng năm thành đối tượng Date
    const formattedDate1 = convertDateFormat(date1) // Chuyển đổi định dạng
    const d1 = new Date(formattedDate1)
    const d2 = new Date(date2)

    // Tính chênh lệch thời gian giữa hai ngày (đơn vị là millisecond)
    const timeDifference = Math.abs(d2 - d1)

    // Chuyển đổi chênh lệch thời gian từ millisecond sang ngày
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    return dayDifference
  }

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
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Loại thiết bị</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Bộ phận</TableCell>
              <TableCell>Người phụ trách</TableCell>
              <TableCell>Ngày nhập kho</TableCell>
              <TableCell>Thời gian sử dụng (ngày)</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              const date1 = getDate(row.input_time)
              return (
                <TableRow key={row.id}>
                  <TableCell>{i}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.product_id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{`${row.stock} `}</TableCell>
                  <TableCell>{row.person_in_charge}</TableCell>
                  <TableCell>{getDate(row.input_time)}</TableCell>
                  <TableCell>{calculateDaysBetween(date1)}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{actionsBlock(row)}</TableCell>
                </TableRow>
              )
            })}
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

const createData = (
  id,
  name,
  input_time,
  status,
  stock,
  stock_type,
  status_id,
  stock_id,
  stock_type_id,
  description,
  type_id,
  type,
  person_in_charge,
  product_id
) => {
  return {
    id,
    name,
    input_time,
    status,
    stock,
    stock_type,
    status_id,
    stock_id,
    stock_type_id,
    description,
    type_id,
    type,
    person_in_charge,
    product_id,
  }
}

export default ItemsManager
