import React from "react"
import DashBoardLayout from "../layout/dashboard/DashBoard"
import ItemsManager from "../components/dashboard/items-manager/ItemsManager"
import UsersManager from "../components/dashboard/users-manager/UsersManager"
import CategoriesManager from "../components/dashboard/categories-manager/CategoriesManager"
import RequestsBrowsingManager from "../components/dashboard/requests-browsing-manager/RequestsBrowsingManager"
import ItemsTypeManager from "../components/dashboard/items-type-manager/ItemsTypeManager"
import { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import ElectricItemsManager from "../components/dashboard/electric-items-manager/ElectricItemsManager"
import ElectricItemsTypeManager from "../components/dashboard/electric-items-type-manager/ElectricItemsTypeManager"
import ElectricCategoriesManager from "../components/dashboard/electric-categories-manager/ElectricCategoriesManager"
import MechanicalItemsManager from "../components/dashboard/mechanical-items-manager/MechanicalItemsManager"
import MechanicalItemsTypeManager from "../components/dashboard/mechanical-items-type-manager/MechanicalItemsTypeManager"
import MechanicalCategoriesManager from "../components/dashboard/mechanical-categories-manager/MechanicalCategoriesManager"

const COMPONENTS = {
  ItemsManager: <ItemsManager />,
  ItemsTypeManager: <ItemsTypeManager />,
  CategoriesManager: <CategoriesManager />,

  ElectricItemsManager: <ElectricItemsManager />,
  ElectricItemsTypeManager: <ElectricItemsTypeManager />,
  ElectricCategoriesManager: <ElectricCategoriesManager />,

  MechanicalItemsManager: <MechanicalItemsManager />,
  MechanicalItemsTypeManager: <MechanicalItemsTypeManager />,
  MechanicalCategoriesManager: <MechanicalCategoriesManager />,

  UsersManager: <UsersManager />,
  RequestsBrowsingManager: <RequestsBrowsingManager />,
}

function DashBoard(props) {
  const history = useHistory()

  useEffect(() => {
    const checkUser = () => {
      const { user } = props
      if (!user) {
        history.push("/login")
      }
    }
    checkUser()
  })

  const [activeComponent, setActiveComponent] = useState("ItemsManager")

  const onItemClick = (item) => {
    setActiveComponent(item.component)
  }

  const renderActiveComponent = COMPONENTS[activeComponent]

  return (
    <DashBoardLayout
      onItemClick={onItemClick}
      activeComponent={activeComponent}
    >
      {renderActiveComponent}
    </DashBoardLayout>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(DashBoard)
