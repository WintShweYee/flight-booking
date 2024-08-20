"use strict";

module.exports = (sequelize, Sequelize) => {
  const Flights = sequelize.define("Flights", 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      flight_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_seat: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 0
      }
    },
    {
      paranoid: true,
      tableName: "flights",
      underscored: true
    }
  );

  return Flights;
};