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
import {
  getCategories,
  getItems,
  getItemsType,
} from "../../../api/stock-manager"
import "./ItemsTypeManager.scss"
import DialogAddNewItemType from "./components/DialogAddNewItemType"
import DialogEditItemType from "./components/DialogEditItemType"
import DialogAlertRemoveItemType from "./components/DialogAlertRemoveItemType"
import SubMenu from "../../SubMenuType"
import AddButton from "../../common/add-button/AddButton"
import Pagination from "../../common/pagination/Pagination"
import { nestedOptions } from "../../../utils/nestedOptions"
import SearchBar from "../../common/search-bar/SearchBar"
import SortBar from "../../common/sort-bar/SortBar"

function createData(id,name,category,unit,description,category_id) {
  return { id,name,category,unit,description,category_id }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "name",label: "Tên" },
  { value: "category",label: "Danh mục" },
]

function ItemsTypeManager(props) {
  const [list,setList] = useState([])
  const [allItems,setAllItems] = useState([])
  const [allItemTypes,setAllItemTypes] = useState([])
  const classes = useStyles()
  const [selectedItem,setSelectedItem] = useState(null)
  const [categories,setCategories] = useState([])

  const [openEditItem,setOpenEditItem] = useState(false)
  const [openAddNewItem,setOpenAddNewItem] = useState(false)
  const [openAlertRemove,setOpenAlertRemove] = useState(false)
  const [sortProperty,setSortProperty] = useState("id")
  const [sortOrder,setSortOrder] = useState("ASC")

  const [nameFilter,setNameFilter] = useState("Tất cả")
  const [categoryFilter,setCategoryFilter] = useState(null)

  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getAllItemTypes = async (sortProperty,sortOrder) => {
    const data = await getItemsType(sortProperty,sortOrder)
    setAllItemTypes(data)
  }
  const getAllItems = async (sortProperty,sortOrder) => {
    const data = await getItems(sortProperty,sortOrder)
    setAllItems(data)
  }
  const getIninitalData = async () => {
    const categories = await getCategories()
    setCategories(categories)
  }
  const getData = async (sortProperty,sortOrder,category) => {
    const data = await getItemsType(sortProperty,sortOrder,category)
    setList(data)
  }

  const handleAddNewSuccess = () => {
    getData(sortProperty,sortOrder)
    setOpenAddNewItem(false)
  }

  const handleEditSuccess = () => {
    getData(sortProperty,sortOrder)
    setOpenEditItem(false)
  }

  const handleDeleteItem = (item) => {
    setOpenAlertRemove(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    getData(sortProperty,sortOrder,categoryFilter)
    getAllItems(sortProperty,sortOrder)
    getAllItemTypes(sortProperty,sortOrder)
  },[sortProperty,sortOrder,categoryFilter])

  useEffect(() => {
    getIninitalData()
  },[])

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    },
    {
      value: "Danh mục",
      menuLevel: 0,
      nestedOptions: nestedOptions(categories,"name"),
    },
  ]

  const rows = [
    ...list.map((item) =>
      createData(
        item.id,
        item.name,
        item.category,
        item.unit,
        item.description,
        item.category_id,
        item.quantity
      )
    ),
  ]

  const selectSort = (
    <div className="selectSort">
      Lọc theo:&nbsp;
      <SubMenu
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        menu={FILTER_OPTIONS}
        list={allItemTypes}
        setList={setList}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      <SearchBar
        rows={rows}
        setList={setList}
        getData={() => {
          getData(sortProperty,sortOrder,categoryFilter)
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

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleClickOpen(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    )
  }

  const dialogAddNewItemType = openAddNewItem ? (
    <DialogAddNewItemType
      open={openAddNewItem}
      handleClose={() => setOpenAddNewItem(false)}
      onAddNewSuccess={handleAddNewSuccess}
    />
  ) : null

  const dialogEditItemType = openEditItem ? (
    <DialogEditItemType
      open={openEditItem}
      selectedItem={selectedItem}
      handleClose={handleClose}
      onEditSuccess={handleEditSuccess}
    />
  ) : null

  const dialogAlertRemove = openAlertRemove ? (
    <DialogAlertRemoveItemType
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedItem}
      onSuccess={() => getData(sortProperty,sortOrder)}
    />
  ) : null

  const rowsWithOrders = rows.map((item,i) => {
    return { ...item,stt: i }
  })


  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(10)

  const paginateRows = rowsWithOrders.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)

  return (
    <div className="itemsTypeManager">
      <AddButton onClick={() => setOpenAddNewItem(true)}>Thêm loại thiết bị</AddButton>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Chỉnh sửa / Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRows.map((row,i) => {
              const quantity = allItems?.filter(
                (item) => item.type === row.name
              )?.length
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.stt}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{row.unit}</TableCell>
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
      {dialogAddNewItemType}
      {dialogEditItemType}
      {dialogAlertRemove}
    </div>
  )
}

export default ItemsTypeManager
