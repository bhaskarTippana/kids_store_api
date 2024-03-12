const titles = require("../model/titles.js");
const getTitles = async (req, res) => {
  try {
    let response = await titles.find({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
};
module.exports = getTitles;
