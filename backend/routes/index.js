const express = require("express");
const router = express.Router();
const receiptRoute = require("../routes/receipt.routes");

router.use("/receipt", receiptRoute);

module.exports = router;
