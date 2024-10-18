import axios from "axios"

const DEFAULT_TIMEOUT = 10000
const BASE_URL = "http://10.11.25.76:5000"

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
})

export const adminLogin = (email,password,isAdmin) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("admin/login",{ email,password,isAdmin })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getItems = (orderby,sort_order,type,status,stock) => {
  return new Promise((resolve,reject) => {
    let url = `items?orderby=${orderby}&sort_order=${sort_order}`
    if (type !== undefined && type !== null) {
      url += `&type=${type}`
    }
    if (status !== undefined && status !== null) {
      url += `&status=${status}`
    }
    if (stock !== undefined && stock !== null) {
      url += `&stock_id=${stock}`
    }
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getElectricItems = (orderby,sort_order,type) => {
  return new Promise((resolve,reject) => {
    let url = `electric-items?orderby=${orderby}&sort_order=${sort_order}`
    if (type !== undefined && type !== null) {
      url += `&type=${type}`
    }
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getMechanicalItems = (orderby,sort_order,type) => {
  return new Promise((resolve,reject) => {
    let url = `mechanical-items?orderby=${orderby}&sort_order=${sort_order}`
    if (type !== undefined && type !== null) {
      url += `&type=${type}`
    }
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getItem = (id) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get(`items/${id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getItemsByType = (type_id) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get(`items/type/${type_id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getItemsType = (sortProperty,sortOrder,category) => {
  let url = `items-type?sort_property=${sortProperty}&sort_order=${sortOrder}`
  if (category !== undefined && category !== null) {
    url += `&category=${category}`
  }
  return new Promise((resolve,reject) => {
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getElectricItemsType = (sortProperty,sortOrder,category) => {
  let url = `electric-items-type?sort_property=${sortProperty}&sort_order=${sortOrder}`
  if (category !== undefined && category !== null) {
    url += `&category=${category}`
  }
  return new Promise((resolve,reject) => {
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getMechanicalItemsType = (sortProperty,sortOrder,category) => {
  let url = `mechanical-items-type?sort_property=${sortProperty}&sort_order=${sortOrder}`
  if (category !== undefined && category !== null) {
    url += `&category=${category}`
  }
  return new Promise((resolve,reject) => {
    apiInstance
      .get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getCategories = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("categories")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getElectricCategories = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("electric-categories")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getMechanicalCategories = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("mechanical-categories")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getUsers = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("users")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getStatuses = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("statuses")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getStocks = () => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("stocks")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


export const updateItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateElectricItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateMechanicalItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addElectricItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addMechanicalItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getItemsByExpiryTime = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items/about-to-exprire",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteElectricItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteMechanicalItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items-type/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addElectricItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items-type/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addMechanicalItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items-type/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items-type/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateElectricItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items-type/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateMechanicalItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items-type/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items-type/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteElectricItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-items-type/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteMechanicalItemType = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-items-type/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("categories/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addElectricCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-categories/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const addMechanicalCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-categories/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("categories/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateElectricCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-categories/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateMechanicalCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-categories/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("categories/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteElectricCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("electric-categories/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const deleteMechanicalCategory = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("mechanical-categories/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addUser = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("users/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateUser = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("users/update",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteUser = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("users/delete",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getPermissions = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get("permissions")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getStaffRequests = (sortProperty,sortOrder) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .get(`staff-requests?orderby=${sortProperty}&sort_order=${sortOrder}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addStaffRequest = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("staff-requests/add",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const approveItem = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("staff-requests/approve-item",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const resetPassword = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("users/reset-password",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const mailExpiryDeviceToStaff = (payload) => {
  return new Promise((resolve,reject) => {
    apiInstance
      .post("items/mail-expiry-to-staff",payload)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
