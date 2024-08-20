const {  getAllAirportsService } = require("../services/airports");

//get all airports
exports.getAllAirports = async (req, res) => {
  const result = await getAllAirportsService();

  return res.status(result.status).json(result.data);
};
