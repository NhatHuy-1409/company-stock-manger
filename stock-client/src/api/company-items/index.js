import { excelDateToJSDate } from "../../utils/excelDateToJSDate"
import { apiInstance } from "../stock-manager"

const addCompanyItems = (payload) => {

    const newPayload = payload.map((item) => {
        const { price,buying_date,quantity_book,quantity_check,...rest } = item
        return {
            ...rest,
            price: parseFloat(price),
            quantity_book: parseInt(quantity_book),
            quantity_check: parseInt(quantity_check),
            buying_date: excelDateToJSDate(buying_date)

        }
    })
    console.log("data to server",newPayload);

    return new Promise((resolve,reject) => {
        apiInstance
            .post("company-items/addItems",newPayload)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

const getCompanyItems = (payload) => {
    console.log("Get all items");

    return new Promise((resolve,reject) => {
        apiInstance
            .post("company-items/getAllItems",payload)
            .then((response) => {
                const data = response.data.map((item) => {
                    const newItem = {
                        ...item,
                        price: item?.price?.toString(),
                        quantity_book: item?.quantity_book?.toString(),
                        quantity_check: item?.quantity_check?.toString(),
                    }

                    return newItem

                })
                resolve(data)

            })
            .catch((error) => {
                reject(error)
            })
    })
}

const addCompanyItem = (payload) => {
    const { price,quantity_book,quantity_check,...rest } = payload
    const newPayload = {
        ...rest,
        price: parseFloat(price),
        quantity_book: parseInt(quantity_book),
        quantity_check: parseInt(quantity_check),
    }

    return new Promise((resolve,reject) => {
        apiInstance
            .post("company-items/add",newPayload)
            .then((response) => {

                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

const updateCompanyItem = (payload) => {
    const { price,quantity_book,quantity_check,...rest } = payload
    const newPayload = {
        ...rest,
        price: parseFloat(price),
        quantity_book: parseInt(quantity_book),
        quantity_check: parseInt(quantity_check),
    }

    return new Promise((resolve,reject) => {
        apiInstance
            .post("company-items/update",newPayload)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

const deleteCompanyItem = (payload) => {
    console.log("Data to api",{ payload });

    return new Promise((resolve,reject) => {
        apiInstance
            .post("company-items/delete",{ id: payload })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export { addCompanyItems,getCompanyItems,addCompanyItem,updateCompanyItem,deleteCompanyItem } 