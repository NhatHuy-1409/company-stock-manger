import React from "react"
import "./leftNavigationBar.scss"
import { connect } from "react-redux"

const NAV_USER = [
  {
    name: "Tất cả user",
    component: "UsersManager",
    accessRights: ["admin"],
  },
]

const NAV_ITEM = [
  {
    name: "Danh sách thiết bị",
    component: "ItemsManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Loại thiết bị",
    component: "ItemsTypeManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Danh mục thiết bị",
    component: "CategoriesManager",
    accessRights: ["user", "admin"],
  },
]
const NAV_ELECTRIC_ITEM = [
  {
    name: "Danh sách thiết bị",
    component: "ElectricItemsManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Loại thiết bị",
    component: "ElectricItemsTypeManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Danh mục thiết bị",
    component: "ElectricCategoriesManager",
    accessRights: ["user", "admin"],
  },
]
const NAV_MECHANICAL_ITEM = [
  {
    name: "Danh sách thiết bị",
    component: "MechanicalItemsManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Loại thiết bị",
    component: "MechanicalItemsTypeManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Danh mục thiết bị",
    component: "MechanicalCategoriesManager",
    accessRights: ["user", "admin"],
  },
]

const NAV_MENU = [
  {
    title: "Quản lý danh sách thiết bị công ty",
    items: NAV_ITEM,
    accessRights: ["user", "admin"],
  },
  {
    title: "Quản lý kho điện tử",
    items: NAV_ELECTRIC_ITEM,
    accessRights: ["user", "admin"],
  },
  {
    title: "Quản lý kho cơ khí",
    items: NAV_MECHANICAL_ITEM,
    accessRights: ["user", "admin"],
  },
  {
    title: "Quản lý user",
    items: NAV_USER,
    accessRights: ["admin"],
  },
]

function LeftNavigationBar(props) {
  const classNames = (item) => {
    return `item ${item.component === props.activeComponent ? "active" : ""}`
  }

  const listNav = (items) => {
    return !props.user
      ? null
      : items.map((item, index) => {
          return item?.accessRights[0] === "admin" &&
            !props.user.isAdmin ? null : (
            <p
              className={classNames(item)}
              key={index}
              onClick={() => props.onItemClick(item)}
            >
              {item.name}
            </p>
          )
        })
  }
  return (
    <div className="leftNavigationBar">
      <div className="wrapper">
        {NAV_MENU?.map(({ title, items, accessRights }) => {
          return (
            <div>
              {((props.user.isAdmin && accessRights?.includes("admin")) ||
                (!props.user.isAdmin && accessRights?.includes("user"))) && (
                <h3>{title}</h3>
              )}
              {listNav(items)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(LeftNavigationBar)
