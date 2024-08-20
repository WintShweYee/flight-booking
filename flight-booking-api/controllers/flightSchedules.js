const {  getFlightSchedulesService } = require("../services/flightSchedules");

exports.getFlightSchedules = async (req, res) => {
  const query = req.query;
  const result = await getFlightSchedulesService(query.origin_airport_id, query.destination_airport_id, query.flight_date);

  return res.status(result.status).json(result.data);
};
