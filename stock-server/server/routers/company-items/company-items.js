const express = require("express")
const dbLogin = require("../../db")

const router = express.Router()

router.post("/addItems",async (req,res,next) => {
    try {
        const payload = req.body

        let results = await dbLogin.addCompanyItems(payload)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})
router.post("/getAllItems",async (req,res,next) => {
    try {
        let results = await dbLogin.getAllCompanyItems()
        console.log({ results });

        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post("/update",async (req,res,next) => {
    try {
        const payload = req.body
        let results = await dbLogin.updateCompanyItem(payload)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post("/add",async (req,res,next) => {
    try {
        const payload = req.body

        let results = await dbLogin.addCompanyItem(payload)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post("/delete",async (req,res,next) => {
    try {
        const payload = req.body
        let results = await dbLogin.deleteCompanyItem(payload)

        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
