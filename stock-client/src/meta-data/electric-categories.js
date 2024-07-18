import { getElectricCategories } from "../api/stock-manager"

export const getListElectricCategories = async () => {
  const listCategories = await getElectricCategories()
  return listCategories.map((item) => ({ label: item.name, value: item.id }))
}
