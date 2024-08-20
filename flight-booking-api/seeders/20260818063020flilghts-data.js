'use strict';
const db = require("../models");
const {Flights} = db;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Flights.bulkCreate(
      [
        {
          id: 1,
          flight_name: "F0001",
          total_seat: 100
        },
        {
          id: 2,
          flight_name: "F0002",
          total_seat: 100
        },
        {
          id: 3,
          flight_name: "F0003",
          total_seat: 100
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("flights", null, {});
  }
};
