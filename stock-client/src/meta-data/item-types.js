import { getItemsType } from "../api/stock-manager"

export const getItemTypes = async () => {
  const listItemTypes = await getItemsType("id", "ASC")
  return listItemTypes.map((item) => ({ label: item.name, value: item.id }))
}
