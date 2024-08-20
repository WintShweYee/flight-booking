const db = require("../models");
const moment = require("moment");
const { FlightSchedules, Flights, Booking, sequelize} = db;
const regexValidation = require("../middlewares/regex");
const dataEncryption = require("../middlewares/encryption");

exports.createBookingService = async (
  flight_schedule_id, 
  first_name, 
  middle_name,
  last_name,
  phone_no,
  email,
  passport_no,
  passport_issue_date,
  passport_expiry_date,
  credit_card_no,
  credit_card_pin,
  credit_card_exp
) => {
  const t = await sequelize.transaction();
  try {
    const decryptedEmail = dataEncryption.decrypt(email);

    if(!regexValidation.validateEmail(decryptedEmail)) {
      return {
        status: 400,
        data: {
          message: "email is invalid"
        }
      }
    }

    const flightSchedule = await FlightSchedules.findByPk(flight_schedule_id, {
      include: [{
        model: Flights,
        as: "flight",
        require: true
      }]
    });

    if(!flightSchedule) {
      return {
        status: 400,
        data: {
          message: "flightScheduleId is invalid"
        }
      };
    }

    const {
      flight,
      total_booked_number,
      depature_date
    } = flightSchedule;

    if(total_booked_number >= flight.total_seat) {
      return {
        status: 400,
        data: {
          message: "There is no available seat"
        }
      };
    }

    if(moment(depature_date).isBefore(moment())) {
      return {
        status: 400,
        data: {
          message: "Flight schedlule date is invalid"
        }
      };
    }
    flightSchedule.total_booked_number = flightSchedule.total_booked_number + 1;

    await flightSchedule.save({
      transaction: t
    });
    const res = await Booking.create({
      flight_schedules_id: flight_schedule_id, 
      first_name, 
      middle_name,
      last_name,
      phone_no,
      email,
      passport_no,
      passport_issue_date,
      passport_expiry_date,
      credit_card_no,
      credit_card_pin,
      credit_card_exp
    }, {
      transcation: t
    });
    await t.commit();
    return {
      status: 200,
      data: res
    };
  } catch (err) {
    await t.rollback();
    console.error("Error on getFlightSchedulesService ", err);
    return {
      status: 500, 
      data: {
        message : "server error"
      }
    };
  }
};