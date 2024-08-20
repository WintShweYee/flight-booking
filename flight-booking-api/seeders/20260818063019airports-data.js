'use strict';
const db = require("../models");
const {Airports} = db;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Airports.bulkCreate(
      [
        {
          id: 1,
          airport_name: "Bangkok",
          time_zone: "Asia/Bangkok"
        },
        {
          id: 2,
          airport_name: "Chaing Mai",
          time_zone: "Asia/Bangkok"
        },
        {
          id: 3,
          airport_name: "Singapore",
          time_zone: "Asia/Singpore"
        },
        {
          id: 4,
          airport_name: "Vietnam",
          time_zone: "Asia/Vietnam"
        },
        {
          id: 5,
          airport_name: "Indonesia",
          time_zone: "Asia/Indonesia"
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("airports", null, {});
  }
};
