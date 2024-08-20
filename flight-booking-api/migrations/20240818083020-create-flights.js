"use stric";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE flights (
        id BIGINT AUTO_INCREMENT,
        flight_name VARCHAR(255) NOT NULL,
        total_seat INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        PRIMARY KEY (id),
        INDEX idx_flights (flight_name ASC) VISIBLE
      )
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("flights");
  }
};