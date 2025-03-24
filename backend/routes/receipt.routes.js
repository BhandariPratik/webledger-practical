const express = require("express");
const router = express.Router();

// middleware
const { checkJwt } = require("../middleware/auth0-middleware");

//receipt Controller
const {
  getReceiptList,
  saveOrUnsaveReceipt,
} = require("../controller/receipt.controller");

//receipt Routes
router.get("/search", checkJwt, getReceiptList);
router.post("/saveOrUnsaveReceipt", checkJwt, saveOrUnsaveReceipt);

module.exports = router;
