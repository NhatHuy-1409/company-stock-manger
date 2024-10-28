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
import { getElectricCategories } from "../../../api/stock-manager"
import "./CategoriesManager.scss"
import DialogAddNewCategory from "./components/DialogAddNewCategory"
import DialogEditCategory from "./components/DialogEditCategory"
import DialogRemoveCategory from "./components/DialogRemoveCategory"
import AddButton from "../../common/add-button/AddButton"
import Pagination from "../../common/pagination/Pagination"
import SearchBar from "../../common/search-bar/SearchBar"
import SortBar from "../../common/sort-bar/SortBar"
import SubMenu from "../../SubMenu"

function createData(id,name,description) {
  return { id,name,description }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})
const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "name",label: "Tên" },
]

function ElectricCategoriesManager(props) {
  const [allItems,setAllItems] = useState([])
  const [list,setList] = useState([])
  const classes = useStyles()
  const [selectedItem,setSelectedItem] = useState(null)

  const [openEditItem,setOpenEditItem] = useState(false)
  const [openAddNewCategory,setOpenAddNewCategory] = useState(false)
  const [openAlertRemove,setOpenAlertRemove] = useState(false)

  const [sortProperty,setSortProperty] = useState("id")
  const [sortOrder,setSortOrder] = useState("ASC")

  const [nameFilter,setNameFilter] = useState("Tất cả")

  const getIninitalData = async () => {
    const fullData = await getElectricCategories(sortProperty,sortOrder)

    setAllItems(fullData)
  }

  const getData = async (sortProperty,sortOrder) => {
    const data = await getElectricCategories(sortProperty,sortOrder)
    setList(data)
  }

  useEffect(() => {
    getData(sortProperty,sortOrder)
  },[sortProperty,sortOrder])

  useEffect(() => {
    getIninitalData()
  },[])


  const rows = [
    ...list.map((item) => createData(item.id,item.name,item.description)),
  ]

  const handleAddNewSuccess = () => {
    getData()
  }

  const handleClickOpen = (category) => {
    setOpenEditItem(true)
    setSelectedItem(category)
  }

  const handleDeleteItem = (category) => {
    setSelectedItem(category)
    setOpenAlertRemove(true)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const dialogAddNewCategory = openAddNewCategory ? (
    <DialogAddNewCategory
      open={openAddNewCategory}
      handleClose={() => setOpenAddNewCategory(false)}
      onAddNewSuccess={handleAddNewSuccess}
    />
  ) : null

  const dialogEditCategory = openEditItem ? (
    <DialogEditCategory
      open={openEditItem}
      handleClose={handleClose}
      selectedItem={selectedItem}
      onUpdateSuccess={handleAddNewSuccess}
    />
  ) : null

  const dialogAlertRemove = openAlertRemove ? (
    <DialogRemoveCategory
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedItem}
      onSuccess={() => getData()}
    />
  ) : null

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleClickOpen(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    )
  }

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    }
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
      />
      <SearchBar
        rows={rows}
        setList={setList}
        getData={() => {
          getData(
            sortProperty,
            sortOrder
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

  const rowsWithOrders = rows.map((item,i) => {
    return { ...item,stt: i }
  })

  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(10)

  const paginateRows = rowsWithOrders.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)
  return (
    <div className="categoriesManager">
      <AddButton onClick={() => setOpenAddNewCategory(true)}> Thêm danh mục thiết bị</AddButton>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
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
                <TableCell>{row.name}</TableCell>
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
      {dialogAddNewCategory}
      {dialogEditCategory}
      {dialogAlertRemove}
    </div>
  )
}

export default ElectricCategoriesManager
