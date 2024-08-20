"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE airports (
        id INT AUTO_INCREMENT NOT NULL,
        airport_name VARCHAR(255) NOT NULL UNIQUE,
        time_zone VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        PRIMARY KEY (id),
        INDEX idx_airports (airport_name asc) VISIBLE
      )
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("airports");
  }
};