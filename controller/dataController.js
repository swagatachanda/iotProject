const dataModel = require("../models/data");

exports.addData = async (req, res) => {
    const dataDetails = {
        timestamp: new Date(),
        data: req.body.data,
    };
    for (item in dataDetails) {
        if (
            dataDetails[item] === undefined &&
            !["timestamp", "data"].includes(item)
        ) {
            delete dataDetails[item];
        } else if (
            dataDetails[item] === undefined &&
            ["timestamp", "data"].includes(item)
        ) {
            res.status(406).json({
                error: `${item} invalid`,
                errorOccured: `${item}`,
            });
        }
    }
    console.log(dataDetails);
    const newData = new dataModel();
    for (item in dataDetails) {
        newData[`${item}`] = dataDetails[`${item}`];
    }
    try {
        const dataSave = await newData.save();
        res.status(201).json({
            sucess: true,
            details: dataSave,
        });
    } catch (err) {
        res.status(500).json({
            error: "database unresponsive",
            errorMessage: "database",
        });
    }
};
exports.getData = async (req, res) => {
    var q = {};
    var pagination;
    const fields = ["start", "end", "pagination"];
    for (var item in req.query) {
        if (fields.includes(item)) {
            if (item == "pagination") {
                pagination = req.query[`${item}`];
            } else {
                q[`${item}`] = req.query[`${item}`];
            }
        }
    }
    console.log(q);
    if (JSON.stringify(q) === "{}") {
        if (pagination === undefined || pagination === null) {
            try {
                const Datas = await dataModel.find();
                return res.status(200).json({
                    success: true,
                    details: Datas,
                });
            } catch (err) {
                return res.status(501).json({
                    error: "Database unresponsive",
                    errorOccurred: "Database",
                });
            }
        } else {
            try {
                const Datas = await dataModel.find().limit(Number(pagination));
                return res.status(200).json({
                    success: true,
                    details: Datas,
                });
            } catch (err) {
                return res.status(501).json({
                    error: "Database unresponsive",
                    errorOccurred: "Database",
                });
            }
        }
    } else {
        for (var items in q) {
            q[`${items}`] = new Date(q[`${items}`] * 1000);
        }
        if (
            q.start === undefined ||
            q.start === "" ||
            q.start === " " ||
            q.start === null
        ) {
            return res.status(405).json({
                error: "Start time must be provided",
                errorOccured: "Invalid start time",
            });
        } else if (
            q.end === undefined ||
            q.end === "" ||
            q.end === " " ||
            q.end === null
        ) {
            if (pagination === undefined || pagination === null) {
                try {
                    const Datas = await dataModel.find({
                        timestamp: { $gt: q.start },
                    });
                    return res.status(200).json({
                        success: true,
                        details: Datas,
                    });
                } catch (err) {
                    return res.status(501).json({
                        error: "Database unresponsive",
                        errorOccurred: "Database",
                    });
                }
            } else {
                try {
                    const Datas = await dataModel
                        .find({ timestamp: { $gt: q.start } })
                        .limit(Number(pagination));
                    return res.status(200).json({
                        success: true,
                        details: Datas,
                    });
                } catch (err) {
                    return res.status(501).json({
                        error: "Database unresponsive",
                        errorOccurred: "Database",
                    });
                }
            }
        } else {
            if (pagination === undefined || pagination === null) {
                try {
                    const Datas = await dataModel.find({
                        timestamp: { $gt: q.start, $lte: q.end },
                    });
                    return res.status(200).json({
                        success: true,
                        details: Datas,
                    });
                } catch (err) {
                    return res.status(501).json({
                        error: "Database unresponsive",
                        errorOccurred: "Database",
                    });
                }
            } else {
                try {
                    const Datas = await dataModel
                        .find({ timestamp: { $gt: q.start, $lte: q.end } })
                        .limit(Number(pagination));
                    return res.status(200).json({
                        success: true,
                        details: Datas,
                    });
                } catch (err) {
                    return res.status(501).json({
                        error: "Database unresponsive",
                        errorOccurred: "Database",
                    });
                }
            }
        }
    }
};
