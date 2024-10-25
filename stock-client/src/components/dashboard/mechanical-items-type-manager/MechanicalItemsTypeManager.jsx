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
  getMechanicalCategories,
  getMechanicalItems,
  getMechanicalItemsType,
} from "../../../api/stock-manager"
import "./ItemsTypeManager.scss"
import DialogAddNewItemType from "./components/DialogAddNewItemType"
import DialogEditItemType from "./components/DialogEditItemType"
import DialogAlertRemoveItemType from "./components/DialogAlertRemoveItemType"
import SubMenu from "../../SubMenuType"
import AddButton from "../../common/add-button/AddButton"
import Pagination from "../../common/pagination/Pagination"
import { nestedOptions } from "../../../utils/nestedOptions"
import SortBar from "../../common/sort-bar/SortBar"
import SearchBar from "../../common/search-bar/SearchBar"

function createData(id,name,category,unit,description,category_id) {
  return { id,name,category,unit,description,category_id }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SORT_OPTIONS = [
  { value: "id",label: "Mã" },
  { value: "name",label: "Tên" },
  { value: "category",label: "Danh mục" },
]

function MechanicalItemsTypeManager(props) {
  const [list,setList] = useState([])
  const [allItems,setAllItems] = useState([])
  const [allItemTypes,setAllItemTypes] = useState([])
  const [categories,setCategories] = useState([])

  const classes = useStyles()
  const [selectedItem,setSelectedItem] = useState(null)

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
    const data = await getMechanicalItemsType(sortProperty,sortOrder)
    setAllItemTypes(data)
  }

  const getAllItems = async (sortProperty,sortOrder) => {
    const data = await getMechanicalItems(sortProperty,sortOrder)
    setAllItems(data)
  }
  const getIninitalData = async () => {
    const categories = await getMechanicalCategories()
    setCategories(categories)
  }
  const getData = async (sortProperty,sortOrder,category) => {
    const data = await getMechanicalItemsType(sortProperty,sortOrder,category)
    console.log(data)
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

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    },
    {
      value: "Danh mục",
      menuLevel: 0,
      nestedOptions: nestedOptions(categories,"name")
    },
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

  const totals = allItems.reduce((accumulator,currentValue) => {
    // Kiểm tra nếu accumulator đã có type này hay chưa
    if (!accumulator[currentValue.type]) {
      accumulator[currentValue.type] = 0
    }
    // Cộng quantity vào type tương ứng
    accumulator[currentValue.type] += currentValue.quantity

    return accumulator
  },{})
  //Pagination
  const [page,setPage] = useState(0)

  const [rowsPerPage,setRowsPerPage] = useState(10)

  const paginateRows = rows.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRows.map((row,i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {i}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{totals[row.name] || 0}</TableCell>
                <TableCell>{row.unit}</TableCell>
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
      {dialogAddNewItemType}
      {dialogEditItemType}
      {dialogAlertRemove}
    </div>
  )
}

export default MechanicalItemsTypeManager
