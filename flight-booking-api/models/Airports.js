"use strict";

module.exports = (sequelize, Sequelize) => {
  const Airports = sequelize.define("Airports", 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airport_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time_zone: {
        allowNull: false,
        type: Sequelize.STRING
      }
    },
    {
      paranoid: true,
      tableName: "airports",
      underscored: true
    }
  );

  return Airports;
};