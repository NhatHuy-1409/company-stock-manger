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
import React,{ useEffect,useState } from "react"
import { getPermissions,getStatuses,getStocks,getUsers } from "../../../api/stock-manager"
import DialogAddNewUser from "./components/DialogAddNewUser"
import DialogAlertRemoveUser from "./components/DialogAlertRemoveUser"
import DialogEditUser from "./components/DialogEditUser"
import DialogAlertResetPassword from "./components/DialogAlertResetPassword"
// import ToastServive from "react-material-toast"
import "./UsersManager.scss"
import AddButton from "../../common/add-button/AddButton"
import Pagination from "../../common/pagination/Pagination"
import SortBar from "../../common/sort-bar/SortBar"
import SearchBar from "../../common/search-bar/SearchBar"
import { nestedOptions } from "../../../utils/nestedOptions"
import SubMenu from "../../SubMenuUser"

// const toast = ToastServive.new({
//   place: "bottomRight",
//   duration: 2,
//   maxCount: 8,
// })

function createData(
  id,
  full_name,
  email,
  permission,
  permission_id,
  status,stock,stock_id
) {
  return {
    id,
    full_name,
    email,
    permission,
    permission_id,
    status,
    stock,stock_id
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "full_name",label: "Tên" },
  { value: "email",label: "Email" },
  { value: "stock_id",label: "Bộ phận" },
  { value: "permission",label: "Vai trò" },
  { value: "status",label: "Trạng thái" },
]

function UsersManager(props) {
  const [allItems,setAllItems] = useState([])

  const [list,setList] = useState([])
  const classes = useStyles()

  const [itemPermissions,setItemPermissions] = useState([])
  const [itemStatuses,setItemStatuses] = useState([{ name: "Hoạt Động" },{ name: "Bị Khóa" }])
  const [itemStocks,setItemStocks] = useState([])

  const [selectedUser,setSelectedUser] = useState()

  // const [itemStocks,setItemStocks] = useState([])

  const [openAddNewUser,setOpenAddNewUser] = useState(false)
  const [openAlertRemove,setOpenAlertRemove] = useState(false)
  const [openEditUser,setOpenEditUser] = useState(false)
  const [openResetPassword,setOpenResetPassword] = useState(false)

  const [sortProperty,setSortProperty] = useState("id")
  const [sortOrder,setSortOrder] = useState("ASC")

  const [nameFilter,setNameFilter] = useState("Tất cả")
  const [permissionFilter,setPermissionFilter] = useState(null)
  const [statusFilter,setStatusFilter] = useState(null)
  const [stockFilter,setStockFilter] = useState(null)
  const [emailFilter,setEmailFilter] = useState(null)


  const getIninitalData = async () => {
    const fullData = await getUsers(sortProperty,sortOrder)
    const permissions = await getPermissions()
    const statuses = await getStatuses()
    const stocks = await getStocks()

    setAllItems(fullData)
    // setItemStatuses(statuses)
    setItemStocks(stocks)
    setItemPermissions(permissions)
  }

  const getData = async (sortProperty,sortOrder,permission,status,stock,email) => {
    const data = await getUsers(sortProperty,sortOrder,permission,status,stock,email)
    // const stocks = await getStocks()

    setList(data)
    // setItemStocks(stocks)
    console.log({ data });

  }

  useEffect(() => {
    getData(sortProperty,sortOrder,permissionFilter,statusFilter,stockFilter,emailFilter)
  },[sortProperty,sortOrder,permissionFilter,statusFilter,stockFilter,emailFilter])

  useEffect(() => {
    getIninitalData()
  },[])

  const rows = [
    ...list.map((item) =>
      createData(
        item.id,
        item.full_name,
        item.email,
        item.permission,
        item.permission_id,
        item.status,
        item.stock,
        item.stock_id
      )
    ),
  ]

  const handleUpdateData = () => {
    getData()
  }

  const handleClose = () => {
    setOpenEditUser(false)
    setOpenResetPassword(false)
    setSelectedUser(null)
  }

  const handleDeleteItem = (item) => {
    setSelectedUser(item)
    setOpenAlertRemove(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setOpenEditUser(true)
  }

  const handleResetPassword = (user) => {
    setSelectedUser(user)
    setOpenResetPassword(true)
  }

  const handleResetPasswordSuccess = () => {
    handleClose()
    getData()
    // toast.info("reset password success!")
  }

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleEditUser(item)} />
        {/* <VpnKeyOutlinedIcon onClick={() => handleResetPassword(item)} /> */}
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    )
  }

  const dialogAddNewUser = openAddNewUser ? (
    <DialogAddNewUser
      open={openAddNewUser}
      handleClose={() => setOpenAddNewUser(false)}
      onAddNewSuccess={handleUpdateData}
    />
  ) : null

  const dialogAlertRemove = openAlertRemove ? (
    <DialogAlertRemoveUser
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedUser}
      onSuccess={() => getData()}
    />
  ) : null

  const dialogEditUser = openEditUser ? (
    <DialogEditUser
      open={openEditUser}
      selectedUser={selectedUser}
      handleClose={handleClose}
      onEditSuccess={handleUpdateData}
    />
  ) : null

  const dialogResetPassword = openResetPassword ? (
    <DialogAlertResetPassword
      open={openResetPassword}
      handleClose={handleClose}
      selectedItem={selectedUser}
      onSuccess={handleResetPasswordSuccess}
    />
  ) : null

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    },
    {
      value: "Bộ phận",
      menuLevel: 0,
      nestedOptions: nestedOptions(itemStocks,"name"),
    },
    {
      value: "Loại",
      menuLevel: 0,
      nestedOptions: nestedOptions(itemPermissions,"name"),
    },
    // {
    //   value: "Trạng thái",
    //   menuLevel: 0,
    //   nestedOptions: nestedOptions(itemStatuses,"name"),
    // },
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
        setPermissionFilter={setPermissionFilter}
        setStatusFilter={setStatusFilter}
        setStockFilter={setStockFilter}
        // setEmailFilter={setEmailFilter}
        itemPermissions={itemPermissions}
        itemStatuses={itemStatuses}
        itemStocks={itemStocks}
      />
      <SearchBar
        rows={rows}
        setList={setList}
        getData={() => {
          getData(
            sortProperty,
            sortOrder,
            permissionFilter,
            statusFilter,
            stockFilter,
            emailFilter
          )
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

  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(10)

  const paginateRows = rows.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)

  return (
    <div className="usersManager">
      <AddButton onClick={() => setOpenAddNewUser(true)}>
        Thêm tài khoản nhân viên
      </AddButton>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Bộ phận</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRows.map((row,i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {i}
                </TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>{row.permission}</TableCell>
                <TableCell>
                  {row.status === "active" ? "Hoạt động" : "Bị Khoá"}
                </TableCell>
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
      {dialogAddNewUser}
      {dialogAlertRemove}
      {dialogEditUser}
      {dialogResetPassword}
    </div>
  )
}

export default UsersManager
