const express = require("express")
const router = express.Router();

const controller = require("../controller/controller")

router.post('/', controller.postFetchOptions)

module.exports = router