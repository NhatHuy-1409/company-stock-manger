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
import React,{ useEffect,useState } from "react"
import { getItems,getStatuses,getStocks } from "../../../api/stock-manager"
import DialogAddNewItem from "./components/DialogAddNewItem"
import DialogEditItem from "./components/DialogEditItem"
import DialogAlertRemove from "./components/DialogAlertRemove"
import DialogSendEmail from "./components/DialogSendEmail"
import "./ItemsManager.scss"
import { TextField } from "@material-ui/core"
import SubMenu from "../../SubMenu"
import { getItemTypes } from "../../../meta-data/item-types"
import { removeVietnameseTones } from "../../../utils/removeVietnameseTones"
import Pagination from "../../common/pagination/Pagination"
import { calculateDaysBetween } from "../../../utils/calculateDaysBetween"
const useStyles = makeStyles({
  table: {},
})

const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "product_id",label: "Mã" },
  { value: "name",label: "Tên" },
  { value: "type",label: "Loại" },
  { value: "status_id",label: "Trạng thái" },
  { value: "stock_id",label: "Bộ phận" },
  { value: "person_in_charge",label: "Người phụ trách" },
  { value: "input_time",label: "Ngày nhập kho" },
]

const SORT_ORDER_OPTIONS = [
  { value: "ASC",label: "Tăng dần" },
  { value: "DESC",label: "Giảm dần" },
]

function ItemsManager(props) {
  const classes = useStyles()
  const [allItems,setAllItems] = useState([])
  const [list,setList] = useState([])
  const [itemTypes,setItemTypes] = useState([])
  const [itemStatuses,setItemStatuses] = useState([])
  const [itemStocks,setItemStocks] = useState([])
  const [itemUser,setItemUser] = useState([])
  const [selectedItem,setSelectedItem] = useState(null)

  const [openEditItem,setOpenEditItem] = useState(false)
  const [openAddNewItem,setOpenAddNewItem] = useState(false)
  const [openAlertRemove,setOpenAlertRemove] = useState(false)
  const [openDialogAlertEmail,setOpenDialogAlertEmail] = useState(false)

  const [sortProperty,setSortProperty] = useState("id")
  const [sortOrder,setSortOrder] = useState("ASC")

  const [nameFilter,setNameFilter] = useState("Tất cả")
  const [typeFilter,setTypeFilter] = useState(null)
  const [statusFilter,setStatusFilter] = useState(null)
  const [stockFilter,setStockFilter] = useState(null)


  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getIninitalData = async () => {
    const fullData = await getItems(sortProperty,sortOrder)
    const types = await getItemTypes()
    const statuses = await getStatuses()
    const stocks = await getStocks()
    setAllItems(fullData)
    setItemTypes(types)
    setItemStatuses(statuses)
    setItemStocks(stocks)

  }

  const getData = async (sortProperty,sortOrder,type,status,stock) => {
    const data = await getItems(sortProperty,sortOrder,type,status,stock)

    setList(data)
  }
  useEffect(() => {
    getData(sortProperty,sortOrder,typeFilter,statusFilter,stockFilter)
  },[sortProperty,sortOrder,typeFilter,statusFilter,stockFilter])

  useEffect(() => {
    getIninitalData()
  },[])

  const handleUpdateDataSuccess = () => {
    getData(sortProperty,sortOrder)
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
        item.product_id,
        item.user,
        item.user_id
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
      onSuccess={() => getData(sortProperty,sortOrder)}
    />
  ) : null

  const dialogAlertSendEmail = openDialogAlertEmail ? (
    <DialogSendEmail
      open={openDialogAlertEmail}
      handleClose={() => setOpenDialogAlertEmail(false)}
      onSuccess={() => getData(sortProperty,sortOrder)}
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

  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(5)

  const paginateRows = rows.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)

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
            {paginateRows.map((row,i) => {
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
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{getDate(row.input_time)}</TableCell>
                  <TableCell>{calculateDaysBetween(date1)}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{actionsBlock(row)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <Pagination
          count={rows?.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
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
  return format(cvDate,"dd/MM/yyyy")
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
  product_id,
  user,
  user_id
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
    user,
    user_id
  }
}

export default ItemsManager
