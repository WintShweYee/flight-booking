const db = require("../models");
const { Airports } = db;

exports.getAllAirportsService = async () => {
  try {
    const ariports = await Airports.findAll();
    return {
        status: 200,
        data: ariports
      } ;
  } catch (err) {
    console.error("Error on getAllAirportsService ", err);
    return {
      status: 500, 
      data: {
        message : "server error"
      }
    };
  }
};