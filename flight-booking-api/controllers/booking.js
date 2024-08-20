const {  createBookingService } = require("../services/booking");

exports.createBooking = async (req, res) => {
  const body = req.body;
  const result = await createBookingService(
    body.flight_schedule_id, 
    body.first_name, 
    body.middle_name,
    body.last_name,
    body.phone_no,
    body.email,
    body.passport_no,
    body.passport_issue_date,
    body.passport_expiry_date,
    body.credit_card_no,
    body.credit_card_pin,
    body.credit_card_exp
  );

  return res.status(result.status).json(result.data);
};
