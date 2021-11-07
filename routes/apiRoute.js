const express = require("express");
const router = express.Router();

const dataRoute = require("./dataRoute");
router.use(express.json());

router.use("/data", dataRoute);

module.exports = router;
