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
import { format } from "date-fns"
import React,{ useEffect,useState } from "react"
import { getMechanicalItems } from "../../../api/stock-manager"
import DialogEditItem from "./components/DialogEditItem"
import DialogAlertRemove from "./components/DialogAlertRemove"
import DialogSendEmail from "./components/DialogSendEmail"
import "./ItemsManager.scss"
import DialogAddNewItem from "./components/DialogAddNewItem"
import { getMechanicalItemTypes } from "../../../meta-data/mechanical-item-types"
import SubMenu from "../../SubMenu"
import AddButton from "../../common/add-button/AddButton"
import Pagination from "../../common/pagination/Pagination"
import SearchBar from "../../common/search-bar/SearchBar"
import SortBar from "../../common/sort-bar/SortBar"
import { nestedOptions } from "../../../utils/nestedOptions"

const useStyles = makeStyles({
  table: {},
})

const SORT_OPTIONS = [
  { value: "product_id",label: "Mã" },
  { value: "name",label: "Tên" },
  { value: "type",label: "Loại" },
  { value: "input_time",label: "Ngày nhập kho" },
  { value: "quantity",label: "Số lượng" },
  { value: "position",label: "Vị trí" },
]


function MechanicalItemsManager(props) {
  const classes = useStyles()
  const [allItems,setAllItems] = useState([])
  const [list,setList] = useState([])
  const [selectedItem,setSelectedItem] = useState(null)
  const [itemTypes,setItemTypes] = useState([])

  const [openEditItem,setOpenEditItem] = useState(false)
  const [openAddNewItem,setOpenAddNewItem] = useState(false)
  const [openAlertRemove,setOpenAlertRemove] = useState(false)
  const [openDialogAlertEmail,setOpenDialogAlertEmail] = useState(false)

  const [sortProperty,setSortProperty] = useState("id")
  const [sortOrder,setSortOrder] = useState("ASC")

  const [nameFilter,setNameFilter] = useState("Tất cả")
  const [typeFilter,setTypeFilter] = useState(null)

  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getIninitalData = async () => {
    const fullData = await getMechanicalItems(sortProperty,sortOrder)
    const types = await getMechanicalItemTypes()
    setAllItems(fullData)
    setItemTypes(types)
  }

  const getData = async (sortProperty,sortOrder,type) => {
    const data = await getMechanicalItems(sortProperty,sortOrder,type)
    setList(data)
  }
  useEffect(() => {
    getIninitalData()
  },[])

  useEffect(() => {
    getData(sortProperty,sortOrder,typeFilter)
  },[sortProperty,sortOrder,typeFilter])

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
        item.product_id,
        item.name,
        item.type,
        item.input_time,
        item.quantity,
        item.position,
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
      nestedOptions: nestedOptions(itemTypes,"label")
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
        itemTypes={itemTypes}
      />

      <SearchBar
        rows={rows}
        setList={setList}
        getData={() => {
          getData(sortProperty,sortOrder,typeFilter)
        }}
      />
      <SortBar
        SORT_OPTIONS={SORT_OPTIONS}
        sortProperty={sortProperty}
        setSortProperty={setSortProperty}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  )
  const rowsWithOrders = rows.map((item,i) => {
    return { ...item,stt: i }
  })
  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(10)

  const paginateRows = rowsWithOrders.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)

  return (
    <div className="itemsManager">
      <AddButton onClick={() => setOpenAddNewItem(true)}>Thêm thiết bị</AddButton>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Ngày nhập kho</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Chỉnh sửa / Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRows.map((row,i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.stt}
                </TableCell>
                <TableCell>{row.product_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{getDate(row.input_time)}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{actionsBlock(row)}</TableCell>
              </TableRow>
            ))}
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
  product_id,
  name,
  type,
  input_time,
  quantity,
  position,
  description,
  type_id
) => {
  return {
    id,
    product_id,
    name,
    type,
    input_time,
    quantity,
    position,
    description,
    type_id,
  }
}

export default MechanicalItemsManager
