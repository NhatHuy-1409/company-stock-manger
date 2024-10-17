import { getMechanicalItemsType } from "../api/stock-manager"

export const getMechanicalItemTypes = async () => {
  const listMechanicalItemTypes = await getMechanicalItemsType("id", "ASC")
  console.log(listMechanicalItemTypes)
  return listMechanicalItemTypes.map((item) => ({
    label: item.name,
    value: item.id,
  }))
}
