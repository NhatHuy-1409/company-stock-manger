import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import React, { useEffect, useState } from "react"
import {
  getCategories,
  getItems,
  getItemsType,
} from "../../../api/stock-manager"
import "./ItemsTypeManager.scss"
import DialogAddNewItemType from "./components/DialogAddNewItemType"
import DialogEditItemType from "./components/DialogEditItemType"
import DialogAlertRemoveItemType from "./components/DialogAlertRemoveItemType"
import { TextField } from "@material-ui/core"
import SubMenu from "../../SubMenuType"

function createData(id, name, category, unit, description, category_id) {
  return { id, name, category, unit, description, category_id }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SORT_OPTIONS = [
  // { value: "id", label: "Mã" },
  { value: "name", label: "Tên" },
  { value: "category", label: "Danh mục" },
]

const SORT_ORDER_OPTIONS = [
  { value: "ASC", label: "Tăng dần" },
  { value: "DESC", label: "Giảm dần" },
]

function ItemsTypeManager(props) {
  const [list, setList] = useState([])
  const [allItems, setAllItems] = useState([])
  const [allItemTypes, setAllItemTypes] = useState([])
  const classes = useStyles()
  const [selectedItem, setSelectedItem] = useState(null)
  const [categories, setCategories] = useState([])

  const [openEditItem, setOpenEditItem] = useState(false)
  const [openAddNewItem, setOpenAddNewItem] = useState(false)
  const [openAlertRemove, setOpenAlertRemove] = useState(false)
  const [sortProperty, setSortProperty] = useState("id")
  const [sortOrder, setSortOrder] = useState("ASC")

  const [nameFilter, setNameFilter] = useState("Tất cả")
  const [categoryFilter, setCategoryFilter] = useState(null)

  const handleClickOpen = (item) => {
    setOpenEditItem(true)
    setSelectedItem(item)
  }

  const handleClose = () => {
    setOpenEditItem(false)
    setSelectedItem(null)
  }

  const getAllItemTypes = async (sortProperty, sortOrder) => {
    const data = await getItemsType(sortProperty, sortOrder)
    setAllItemTypes(data)
  }
  const getAllItems = async (sortProperty, sortOrder) => {
    const data = await getItems(sortProperty, sortOrder)
    setAllItems(data)
  }
  const getIninitalData = async () => {
    const categories = await getCategories()
    setCategories(categories)
  }
  const getData = async (sortProperty, sortOrder, category) => {
    const data = await getItemsType(sortProperty, sortOrder, category)
    setList(data)
  }

  const handleAddNewSuccess = () => {
    getData(sortProperty, sortOrder)
    setOpenAddNewItem(false)
  }

  const handleEditSuccess = () => {
    getData(sortProperty, sortOrder)
    setOpenEditItem(false)
  }

  const handleDeleteItem = (item) => {
    setOpenAlertRemove(true)
    setSelectedItem(item)
  }

  useEffect(() => {
    getData(sortProperty, sortOrder, categoryFilter)
    getAllItems(sortProperty, sortOrder)
    getAllItemTypes(sortProperty, sortOrder)
  }, [sortProperty, sortOrder, categoryFilter])

  useEffect(() => {
    getIninitalData()
  }, [])

  const FILTER_OPTIONS = [
    {
      value: "Tất cả",
      menuLevel: 0,
    },
    {
      value: "Danh mục",
      menuLevel: 0,
      nestedOptions: categories?.map((item) => {
        return {
          value: item?.name,
          menuLevel: 1,
        }
      }),
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
  str = str.replace(/[!@%^*()+=<>,.:;'\"&#[\]~$_`{}|\\]/g, " "); // Removed unnecessary escape for "

    return str
  }
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
            getData(sortProperty, sortOrder, categoryFilter)
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
      onSuccess={() => getData(sortProperty, sortOrder)}
    />
  ) : null

  return (
    <div className="itemsTypeManager">
      <Button color="primary" onClick={() => setOpenAddNewItem(true)}>
        Thêm loại thiết bị
      </Button>
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
            {rows.map((row, i) => {
              const quantity = allItems?.filter(
                (item) => item.type === row.name
              )?.length
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {/* {row.id} */}
                    {i}
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
        </Table>
      </TableContainer>
      {dialogAddNewItemType}
      {dialogEditItemType}
      {dialogAlertRemove}
    </div>
  )
}

export default ItemsTypeManager
