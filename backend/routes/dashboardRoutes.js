const express = require("express");
const router = express.Router();
const dashboardController =
require("../controllers/dashboardController");
const authMiddleware =
require("../middleware/authMiddleware");
router.get(
    "/statistics",
    authMiddleware,
    dashboardController.getStatistics
);
module.exports = router;