import React from "react"
import "./leftNavigationBar.scss"
import { connect } from "react-redux"

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
  // {
  //   name: "Quản lý user",
  //   component: "UsersManager",
  //   accessRights: ["admin"],
  // },
  // {
  //   name: "Yêu cầu duyệt",
  //   component: "RequestsBrowsingManager",
  //   accessRights: ["user", "admin"],
  // },
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
  // {
  //   name: "Quản lý user",
  //   component: "UsersManager",
  //   accessRights: ["admin"],
  // },
  // {
  //   name: "Yêu cầu duyệt",
  //   component: "RequestsBrowsingManager",
  //   accessRights: ["user", "admin"],
  // },
]

const NAV_MENU = [
  {
    title: "Quản lý danh sách thiết bị công ty",
    items: NAV_ITEM,
  },
  {
    title: "Quản lý kho điện tử",
    items: NAV_ELECTRIC_ITEM,
  },
]

function LeftNavigationBar(props) {
  const classNames = (item) => {
    return `item ${item.component === props.activeComponent ? "active" : ""}`
  }

  // const listNav = !props.user
  //   ? null
  //   : NAV_ITEM.map((item, index) => {
  //       return item.accessRights[0] === "admin" &&
  //         !props.user.isAdmin ? null : (
  //         <div
  //           className={classNames(item)}
  //           key={index}
  //           onClick={() => props.onItemClick(item)}
  //         >
  //           {item.name}
  //         </div>
  //       )
  //     })

  const listNav = (items) => {
    return !props.user
      ? null
      : items.map((item, index) => {
          return item?.accessRights[0] === "admin" &&
            !props.user.isAdmin ? null : (
            <div
              className={classNames(item)}
              key={index}
              onClick={() => props.onItemClick(item)}
            >
              {item.name}
            </div>
          )
        })
  }
  // const listNav = !props.user ? null : NAV_MENU?.map((item, index) => {})
  return (
    <div className="leftNavigationBar">
      <div className="wrapper">
        {NAV_MENU?.map(({ title, items }) => {
          return (
            <div>
              <h3>{title}</h3>
              {listNav(items)}
            </div>
          )
        })}
        {/* {listNav} */}
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
