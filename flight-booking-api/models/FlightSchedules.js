"use strict";

module.exports = (sequelize, Sequelize) => {
  const FlightSchedules = sequelize.define("FlightSchedules", 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      flight_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      origin_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      destination_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      depature_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      depature_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      arrival_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      arrival_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_booked_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    },
    {
      paranoid: true,
      tableName: "flight_schedules",
      underscored: true
    }
  );

  FlightSchedules.associate = (models) => {
    FlightSchedules.belongsTo(models.Flights, {
      foreignKey: "flight_id",
      as: "flight"
    });
  };

  return FlightSchedules;
};