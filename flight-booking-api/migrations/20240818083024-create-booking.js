"use stric";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE booking (
        id BIGINT AUTO_INCREMENT,
        flight_schedules_id BIGINT NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        middle_name VARCHAR(255) NULL,
        last_name VARCHAR(255) NOT NULL,
        phone_no TEXT NOT NULL,
        email TEXT NOT NULL,
        passport_no TEXT NOT NULL,
        passport_issue_date DATE NOT NULL,
        passport_expiry_date DATE NOT NULL,
        credit_card_no TEXT NOT NULL,
        credit_card_pin TEXT NOT NULL,
        credit_card_exp TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        PRIMARY KEY (id),
        INDEX idx_booking (flight_schedules_id desc) VISIBLE
      )
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("booking");
  }
};