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
