import { getElectricItemsType } from "../api/stock-manager"

export const getElectricItemTypes = async () => {
  const listElectricItemTypes = await getElectricItemsType("id", "ASC")
  console.log(listElectricItemTypes)
  return listElectricItemTypes.map((item) => ({
    label: item.name,
    value: item.id,
  }))
}
