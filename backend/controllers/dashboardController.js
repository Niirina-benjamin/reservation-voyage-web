const Dashboard =
require("../models/dashboardModel");
exports.getStatistics = (req, res) => {
    Dashboard.getStatistics((err, result) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(result[0]);
    });
};