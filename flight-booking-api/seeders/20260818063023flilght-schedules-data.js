'use strict';
const db = require("../models");
const {FlightSchedules} = db;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return FlightSchedules.bulkCreate(
      [
        {
          id: 1,
          flight_id: 1,
          origin_airport_id: 1,
          destination_airport_id: 2,
          depature_date: "2024-09-18",
          depature_time: "17:00:00",
          arrival_date: "2024-09-18",
          arrival_time: "19:00:00",
          price: 1500,
          total_booked_number: 0
        },
        {
          id: 2,
          flight_id: 2,
          origin_airport_id: 1,
          destination_airport_id: 2,
          depature_date: "2024-09-18",
          depature_time: "17:00:00",
          arrival_date: "2024-09-18",
          arrival_time: "19:00:00",
          price: 2000,
          total_booked_number: 0
        },
        {
          id: 3,
          flight_id: 1,
          origin_airport_id: 2,
          destination_airport_id: 1,
          depature_date: "2024-09-23",
          depature_time: "17:00:00",
          arrival_date: "2024-09-23",
          arrival_time: "19:00:00",
          price: 2000,
          total_booked_number: 0
        },
        {
          id: 4,
          flight_id: 1,
          origin_airport_id: 2,
          destination_airport_id: 1,
          depature_date: "2024-09-19",
          depature_time: "17:00:00",
          arrival_date: "2024-09-19",
          arrival_time: "19:00:00",
          price: 2000,
          total_booked_number: 100
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("flight_schedules", null, {});
  }
};
