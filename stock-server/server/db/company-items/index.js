// const { pool } = require("..");

// const addCompanyItems = (items) => {
//     if (items?.length > 0) {
//         const placeHolders = items?.map(() => `(?, ? , ? , ?, ?, ? , ? , ? , ? , ? , ? , ?)`).join(", ")

//         const values = items?.flatMap((item) => [
//             item.name,
//             item.code_asset,
//             item.code_software,
//             item.location,
//             item.user,
//             item.price,
//             item.quantity_book,
//             item.quantity_check,
//             item.supplier,
//             item.buying_date,
//             item.document_no,
//             item.note,
//         ])

//         return new Promise((resolve,reject) => {
//             pool.query(
//                 `INSERT INTO company_items ( name,code_asset,code_software,location,user,price,quantity_book,quantity_check,supplier,buying_date,document_no,note) 
//               VALUES ${placeHolders}`,
//                 values,
//                 (err,result) => {
//                     if (err) {
//                         return reject(err)
//                     }
//                     return resolve({
//                         success: {
//                             message: "update success",
//                         },
//                     })
//                 }
//             )
//         })
//     }


// }

// module.exports = {
//     addCompanyItems
// }