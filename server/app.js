/*
   * by balzz
   * dont delete my wm
   * follow more instagram: @iqstore78
*/
const express = require("express")
const axios = require("axios")
const path = require("path")
const timg = require("../pages/fitures/txt2img.js")
const tiktod = require("../pages/fitures/tiktok.js")
const igedl = require("../pages/fitures/instagram.js")
const { limit, checkBanned } = require("../declaration/rateLimit.jsx")

const app = express()
app.use(checkBanned)

app.get("/", limit, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/404.html"))
})

/** example ajg **/
app.get("/txt2img", limit, async (req, res) => {
  timg(req, res)
})
app.get("/tiktokDL", limit, async (req, res) => {
  tiktod(req, res)
})
app.get("/instagramDL", limit, async (req, res) => {
  igedl(req, res)
})

module.exports = app
