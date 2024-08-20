"use strict";

module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("Booking", 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      flight_schedules_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      middle_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_no: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      passport_no : {
        allowNull: false,
        type: Sequelize.TEXT
      },
      passport_issue_date : {
        allowNull: false,
        type: Sequelize.DATE
      },
      passport_expiry_date : {
        allowNull: false,
        type: Sequelize.DATE
      },
      credit_card_no : {
        allowNull: false,
        type: Sequelize.TEXT
      },
      credit_card_pin : {
        allowNull: false,
        type: Sequelize.TEXT
      },
      credit_card_exp : {
        allowNull: false,
        type: Sequelize.TEXT
      }
    },
    {
      paranoid: true,
      tableName: "booking",
      underscored: true
    }
  );

  return Booking;
};