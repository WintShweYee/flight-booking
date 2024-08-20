const db = require("../models");
const moment = require("moment");
const {FlightSchedules, Flights} = db;

const flightDetail = (flightSchedule) => {
  return {
    id: flightSchedule.id,
    flight_id: flightSchedule.flight_id,
    origin_airport_id: flightSchedule.origin_airport_id,
    destination_airport_id: flightSchedule.destination_airport_id,
    depature_date: flightSchedule.depature_date,
    depature_time: flightSchedule.depature_time,
    arrival_date: flightSchedule.arrival_date,
    arrival_time: flightSchedule.arrival_time,
    price: flightSchedule.price,
    flight_name: flightSchedule.flight.flight_name,
    seat_available: flightSchedule.total_booked_number < flightSchedule.flight.total_seat
  }
}

exports.getFlightSchedulesService = async (origin_airport_id, destination_airport_id, flight_date) => {
  try {
    const flightDateMm = moment(flight_date);

    if(flightDateMm.isBefore(moment())) {
      return {
        status: 400,
        data: {
          message: "flightDate is invalid"
        }
      }
    }

    const flightSchedules = await FlightSchedules.findAll({
      where: {
        origin_airport_id,
        destination_airport_id,
        depature_date: flightDateMm.toDate()
      },
      include: [{
        model: Flights,
        as: "flight",
        require: true
      }]
    });
    
    const flightScheduesDetail = flightSchedules.map((flightSchedule) => { 
      return flightDetail(flightSchedule) 
    });
    return {
        status: 200,
        data: flightScheduesDetail
      } ;
  } catch (err) {
    console.error("Error on getFlightSchedulesService ", err);
    return {
      status: 500, 
      data: {
        message : "server error"
      }
    };
  }
};