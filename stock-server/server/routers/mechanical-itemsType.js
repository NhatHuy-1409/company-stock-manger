const express = require("express")
const dbLogin = require("../db")
const ERROR = require("../constants/code")
const nodemailer = require("nodemailer")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const { sort_property, sort_order, category } = req.query
    let results = await dbLogin.getAllMechanicalItemsType(
      sort_property,
      sort_order,
      category
    )
    res.json(results)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post("/update", async (req, res, next) => {
  try {
    const payload = req.body
    console.log(payload)
    let results = await dbLogin.updateMechanicalItemType(payload)
    res.json(results)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body
    let results = await dbLogin.addMechanicalItemType(payload)
    res.json(results)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post("/delete", async (req, res, next) => {
  try {
    const payload = req.body
    let results = await dbLogin.deleteMechanicalItemType(payload)
    res.json(results)
    // sendDeleteEmail();
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
