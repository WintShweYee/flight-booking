"use stric";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE flight_schedules (
        id BIGINT AUTO_INCREMENT,
        flight_id BIGINT NOT NULL,
        origin_airport_id INTEGER NOT NULL,
        destination_airport_id INTEGER NOT NULL,
        depature_date DATE NOT NULL,
        depature_time TIME NOT NULL,
        arrival_date DATE NOT NULL,
        arrival_time TIME NOT NULL,
        price INTEGER NOT NULL,
        total_booked_number TINYINT NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        PRIMARY KEY (id, origin_airport_id),
        INDEX idx_flight_schedules (depature_date DESC, origin_airport_id DESC, destination_airport_id DESC) VISIBLE
      )
      PARTITION BY HASH (origin_airport_id)
      PARTITIONS 10;
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("flight_schedules");
  }
};