const mysql = require("mysql2")

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "123456",
  user: "root",
  database: "stock_manager",
  host: "localhost",
  port: "3306",
})

let stockDB = {}

stockDB.adminLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM admins WHERE email = ? AND password = ?`,
      [email, password],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.userLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

// items

stockDB.getAllItems = (orderby, sort_order, type, status, stock_id) => {
  let typeCondition = ""
  if (type !== undefined && type !== null) {
    typeCondition = `WHERE i.type = ${type}`
  }
  let statusCondition = ""
  if (status !== undefined && status !== null) {
    statusCondition = `WHERE i.status = ${status}`
  }
  let stockCondition = ""
  if (stock_id !== undefined && stock_id !== null) {
    stockCondition = `WHERE i.stock_id = ${stock_id}`
  }

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT i.id, product_id, i.name, i.person_in_charge, input_time, i.description,
              it.id AS type_id,
              it.name AS type,
              s.name AS status, s.id AS status_id,
              st.name AS stock, st.id AS stock_id,
              stp.name AS stock_type, stp.id AS stock_type_id
        FROM items i
        LEFT JOIN item_types it
          ON i.type = it.id
        LEFT JOIN statuses s
          ON i.status = s.id
        LEFT JOIN stocks st
          ON i.stock_id = st.id
        LEFT JOIN stock_types stp
          ON st.type = stp.id
        ${typeCondition}
        ${statusCondition}
        ${stockCondition}
        ORDER BY ${orderby} ${sort_order} `,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllElectricItems = (orderby, sort_order, type) => {
  let typeCondition = ""
  if (type !== undefined && type !== null) {
    typeCondition = `WHERE ei.type = ${type}`
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ei.id,ei.product_id,ei.name,input_time, quantity,ei.position, ei.description,
        eit.id AS type_id,
        eit.name AS type
        FROM electric_items ei
        LEFT JOIN electric_item_types eit
          ON ei.type = eit.id
        ${typeCondition} 
        ORDER BY ${orderby} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}
stockDB.getAllMechanicalItems = (orderby, sort_order, type) => {
  let typeCondition = ""
  if (type !== undefined && type !== null) {
    typeCondition = `WHERE mi.type = ${type}`
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mi.id,mi.product_id,mi.name,input_time, quantity,mi.position, mi.description,
        mit.id AS type_id,
        mit.name AS type
        FROM mechanical_items mi
        LEFT JOIN mechanical_item_types mit
          ON mi.type = mit.id
        ${typeCondition} 
        ORDER BY ${orderby} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getByExpiryTime = ({ expiry_time }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT i.id, it.name, input_time, output_time, expiry_time, i.description,
              it.id AS type_id,
              s.name AS status, s.id AS status_id,
              st.name AS stock, st.id AS stock_id,
              stp.name AS stock_type, stp.id AS stock_type_id
        FROM items i
        LEFT JOIN item_types it
          ON i.type = it.id
        LEFT JOIN statuses s
          ON i.status = s.id
        LEFT JOIN stocks st
          ON i.stock_id = st.id
        LEFT JOIN stock_types stp
          ON st.type = stp.id
        WHERE i.expiry_time = ?`,
      [expiry_time],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getItem = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT i.id, it.name, input_time, output_time, expiry_time, i.description,
            it.id AS type_id,
            s.name AS status, s.id AS status_id,
            st.name AS stock, st.id AS stock_id,
            stp.name AS stock_type, stp.id AS stock_type_id
      FROM items i
      LEFT JOIN item_types it
        ON i.type = it.id
      LEFT JOIN statuses s
        ON i.status = s.id
      LEFT JOIN stocks st
        ON i.stock_id = st.id
      LEFT JOIN stock_types stp
        ON st.type = stp.id
      WHERE i.id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}
stockDB.getElectricItem = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ei.id, eit.name, input_time, ei.description,
            eit.id AS type_id
      FROM electric_items ei
      LEFT JOIN electric_item_types eit
        ON ei.type = eit.id
      WHERE i.id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}
stockDB.getMechanicalItem = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mi.id, mit.name, input_time, mi.description,
            mit.id AS type_id
      FROM mechanical_items mi
      LEFT JOIN mechanical_item_types mit
        ON mi.type = mit.id
      WHERE mi.id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getItemByTypeId = (type_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT i.id, it.name, input_time, output_time, expiry_time, i.description,
            it.id AS type_id,
            s.name AS status, s.id AS status_id,
            st.name AS stock, st.id AS stock_id,
            stp.name AS stock_type, stp.id AS stock_type_id
      FROM items i
      LEFT JOIN item_types it
        ON i.type = it.id
      LEFT JOIN statuses s
        ON i.status = s.id
      LEFT JOIN stocks st
        ON i.stock_id = st.id
      LEFT JOIN stock_types stp
        ON st.type = stp.id
      WHERE i.type = ?`,
      [type_id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}
stockDB.getElectricItemByTypeId = (type_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ei.id, eit.name, input_time, ei.description,
            eit.id AS type_id
      FROM electric_items ei
      LEFT JOIN electric_item_types eit
        ON ei.type = eit.id
      WHERE ei.type = ?`,
      [type_id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}
stockDB.getMechanicalItemByTypeId = (type_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mi.id, mit.name, input_time, mi.description,
            mit.id AS type_id
      FROM mechanical_items ei
      LEFT JOIN mechanical_item_types mit
        ON mi.type = mit.id
      WHERE mi.type = ?`,
      [type_id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllItemsType = (sort_property, sort_order, category) => {
  let categoryCondition = ""
  if (category !== undefined && category !== null) {
    categoryCondition = `WHERE it.category = ${category}`
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT it.id, it.name, c.name AS category,c.id AS category_id,unit,it.description
        FROM item_types it 
		    LEFT JOIN categories c 
			    ON it.category = c.id
          ${categoryCondition}
        ORDER BY ${sort_property || ""} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllElectricItemsType = (sort_property, sort_order, category) => {
  let categoryCondition = ""
  if (category !== undefined && category !== null) {
    categoryCondition = `WHERE eit.category = ${category}`
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT eit.id, eit.name, ec.name AS category,ec.id AS category_id,unit,eit.description
        FROM electric_item_types eit 
		    LEFT JOIN electric_categories ec 
			    ON eit.category = ec.id
        ${categoryCondition}
        ORDER BY ${sort_property || ""} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllMechanicalItemsType = (sort_property, sort_order, category) => {
  let categoryCondition = ""
  if (category !== undefined && category !== null) {
    categoryCondition = `WHERE mit.category = ${category}`
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mit.id, mit.name, mc.name AS category,mc.id AS category_id,unit,mit.description
        FROM mechanical_item_types mit 
		    LEFT JOIN mechanical_categories mc 
			    ON mit.category = mc.id
        ${categoryCondition}
        ORDER BY ${sort_property || ""} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllStaffRequest = (sort_property, sort_order) => {
  console.log(sort_property, sort_order)
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 
          sr.id, CONCAT(u.first_name," ",u.last_name) AS full_name, sr.staff_id,
          sr.date_time, sr.detail, sr.current_status AS current_status_id,
          sr.updated_status AS updated_status_id, sr.update_address, sr.status,
          sr.item_id, it.name, sr.current_stock, sr.updated_stock
        FROM staff_requests sr
        LEFT JOIN users u
          ON sr.staff_id = u.id
        LEFT JOIN items i
          ON sr.item_id = i.id
        LEFT JOIN item_types it
          ON i.type = it.id
        ORDER BY ${sort_property || ""} ${sort_order}`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM categories`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

stockDB.getAllElectricCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM electric_categories`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}
stockDB.getAllMechanicalCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM mechanical_categories`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

stockDB.getStocks = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM stocks`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

stockDB.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT u.id, first_name, last_name, CONCAT(first_name," ",last_name) AS full_name,
              email, p.name AS permission,
              p.id AS permission_id,u.status
        FROM users u
        LEFT JOIN permissions p
            ON u.permission = p.id`,
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.getStatuses = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM statuses`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

stockDB.updateItem = ({
  id,
  product_id,
  name,
  type,
  status,
  stock_id,
  person_in_charge,
  input_time,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE items
              SET product_id = ?, name = ?,type = ?, status = ?, stock_id = ?, person_in_charge = ?,input_time = ?, description = ?
              WHERE id = ?`,
      [
        product_id,
        name,
        type,
        status,
        stock_id,
        person_in_charge,
        input_time,
        description,
        id,
      ],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}
stockDB.updateElectricItem = ({
  id,
  product_id,
  name,
  type,
  input_time,
  quantity,
  position,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE electric_items
              SET product_id = ? ,name = ?, type = ?, input_time = ?, quantity = ?, position = ?, description = ?
              WHERE id = ?`,
      [product_id, name, type, input_time, quantity, position, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}
stockDB.updateMechanicalItem = ({
  id,
  product_id,
  name,
  type,
  input_time,
  quantity,
  position,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE mechanical_items
              SET product_id = ? ,name = ?, type = ?, input_time = ?, quantity = ?, position = ?, description = ?
              WHERE id = ?`,
      [product_id, name, type, input_time, quantity, position, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.addItem = ({
  product_id,
  name,
  type,
  status,
  stock_id,
  person_in_charge,
  input_time,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO items ( product_id,name,type,status,stock_id,person_in_charge,input_time,description) 
        VALUES (?, ? , ? , ?, ?, ?, ?,?)`,
      [
        product_id,
        name,
        type,
        status,
        stock_id,
        person_in_charge,
        input_time,
        description,
      ],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.addElectricItem = ({
  product_id,
  name,
  type,
  input_time,
  quantity,
  position,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO electric_items (product_id, name, type, input_time, quantity, position, description) 
        VALUES ( ?, ?, ?, ?,?,?,?)`,
      [product_id, name, type, input_time, quantity, position, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.addMechanicalItem = ({
  product_id,
  name,
  type,
  input_time,
  quantity,
  position,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO mechanical_items (product_id, name, type, input_time, quantity, position, description) 
        VALUES ( ?, ?, ?, ?,?,?,?)`,
      [product_id, name, type, input_time, quantity, position, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

// addStaffRequest
stockDB.addStaffRequest = ({
  staff_id,
  date_time,
  item_id,
  detail,
  current_status,
  updated_status,
  updated_address,
  current_stock,
  updated_stock,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO staff_requests (staff_id, date_time, item_id, detail, current_status, updated_status, update_address, current_stock, updated_stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        staff_id,
        date_time,
        item_id,
        detail,
        current_status,
        updated_status,
        updated_address,
        current_stock,
        updated_stock,
      ],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}

stockDB.deleteItem = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM items WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        success: {
          message: "delete success",
        },
      })
    })
  })
}

stockDB.deleteElectricItem = ({ id }) => {
  console.log({ id })
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM electric_items WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}
stockDB.deleteMechanicalItem = ({ id }) => {
  console.log({ id })
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM mechanical_items WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}

stockDB.addItemType = ({ name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO item_types (name, category, unit, description) 
        VALUES (?, ? , ? , ?)`,
      [name, category, unit, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}

stockDB.addElectricItemType = ({ name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO electric_item_types (name, category, unit, description) 
        VALUES (?, ? , ? , ?)`,
      [name, category, unit, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}
stockDB.addMechanicalItemType = ({ name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO mechanical_item_types (name, category, unit, description) 
        VALUES (?, ? , ? , ?)`,
      [name, category, unit, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}

stockDB.updateItemType = ({ id, name, category, unit, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE item_types
              SET name = ?, category = ?, unit = ?, description = ?
              WHERE id = ?`,
      [name, category, unit, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.updateElectricItemType = ({
  id,
  name,
  category,
  unit,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE electric_item_types
              SET name = ?, category = ?, unit = ?, description = ?
              WHERE id = ?`,
      [name, category, unit, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}
stockDB.updateMechanicalItemType = ({
  id,
  name,
  category,
  unit,
  description,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE mechanical_item_types
              SET name = ?, category = ?, unit = ?, description = ?
              WHERE id = ?`,
      [name, category, unit, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.deleteItemType = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM item_types WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        success: {
          message: "delete success",
        },
      })
    })
  })
}
stockDB.deleteElectricItemType = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM electric_item_types WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}
stockDB.deleteMechanicalItemType = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM mechanical_item_types WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}

stockDB.updateCategory = ({ id, name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE categories
              SET name = ?, description = ?
              WHERE id = ?`,
      [name, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}
stockDB.updateElectricCategory = ({ id, name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE electric_categories
              SET name = ?, description = ?
              WHERE id = ?`,
      [name, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}
stockDB.updateMechanicalCategory = ({ id, name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE mechanical_categories
              SET name = ?, description = ?
              WHERE id = ?`,
      [name, description, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.addCategory = ({ name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO categories (name, description) 
        VALUES (?, ?)`,
      [name, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}
stockDB.addElectricCategory = ({ name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO electric_categories (name, description) 
        VALUES (?, ?)`,
      [name, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}
stockDB.addMechanicalCategory = ({ name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO mechanical_categories (name, description) 
        VALUES (?, ?)`,
      [name, description],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}

stockDB.deleteCategory = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM categories WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        success: {
          message: "delete success",
        },
      })
    })
  })
}
stockDB.deleteElectricCategory = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM electric_categories WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}
stockDB.deleteMechanicalCategory = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM mechanical_categories WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "delete success",
          },
        })
      }
    )
  })
}

stockDB.addUser = ({
  email,
  password,
  first_name,
  last_name,
  permission,
  status,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (email, password, first_name, last_name, permission, status) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [email, password, first_name, last_name, permission, status],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "add success",
          },
        })
      }
    )
  })
}

stockDB.updateUser = ({
  id,
  email,
  first_name,
  last_name,
  permission,
  status,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
              SET email = ?, first_name = ?, last_name = ?, permission = ?, status = ?
              WHERE id = ?`,
      [email, first_name, last_name, permission, status, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.resetPassword = ({ id, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
              SET password = ?
              WHERE id = ?`,
      [password, id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve({
          success: {
            message: "update success",
          },
        })
      }
    )
  })
}

stockDB.deleteUser = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        success: {
          message: "delete success",
        },
      })
    })
  })
}

stockDB.getAllPermissions = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM permissions`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

stockDB.approveItem = ({ item_id, item_status, output_time, stock_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE items
        SET output_time = ?, status = ?, stock_id = ?
        WHERE id = ?`,
      [output_time, item_status, stock_id, item_id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

stockDB.approveRequest = ({ request_id, request_status }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE staff_requests
        SET status = ?
        WHERE id = ?`,
      [request_status, request_id],
      (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      }
    )
  })
}

module.exports = stockDB
