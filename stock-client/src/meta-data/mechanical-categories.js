import { getMechanicalCategories } from "../api/stock-manager"

export const getListMechanicalCategories = async () => {
  const listCategories = await getMechanicalCategories()
  return listCategories.map((item) => ({ label: item.name, value: item.id }))
}
