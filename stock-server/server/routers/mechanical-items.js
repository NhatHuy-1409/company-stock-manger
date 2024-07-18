const express = require("express")
const dbLogin = require("../db")
const ERROR = require("../constants/code")
const nodemailer = require("nodemailer")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const { orderby, sort_order } = req.query
    let results = await dbLogin.getAllMechanicalItems(orderby, sort_order)
    res.json(results)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    let results = await dbLogin.getMechanicalItem(id)
    res.json(results[0])
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get("/type/:type_id", async (req, res, next) => {
  try {
    const { type_id } = req.params
    let results = await dbLogin.getMechanicalItemByTypeId(type_id)
    res.json(results)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post("/update", async (req, res, next) => {
  try {
    const payload = req.body
    let results = await dbLogin.updateMechanicalItem(payload)
    res.json(results)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body
    console.log({ payload })
    let results = await dbLogin.addMechanicalItem(payload)
    res.json(results)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post("/delete", async (req, res, next) => {
  try {
    const payload = req.body
    let results = await dbLogin.deleteMechanicalItem(payload)
    res.json(results)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
