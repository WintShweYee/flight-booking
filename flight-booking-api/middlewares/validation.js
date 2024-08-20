const Validator = require("validatorjs");

const getFlightSchedulesValidator = (req, res, next) => {
  const validationRules = {
    "origin_airport_id": "required|integer",
    "destination_airport_id": "required|integer",
    "flight_date": "required|string"
  };

  const data = req.query;
  const validator = new Validator(data, validationRules);
  if (validator.fails()) {
    const errors = validator.errors.all();
    return res.status(400).json({ errors });
  }
  next();
}

const createBookingValidator = (req, res, next) => {
  const validationRules = {
    "flight_schedule_id": "required|integer",
    "first_name": "required|string",
    "middle_name": "string",
    "last_name": "required|string",
    "phone_no": "required|string",
    "email": "required|string",
    "passport_no": "required|string",
    "passport_issue_date": "required|string",
    "passport_expiry_date": "required|string",
    "credit_card_no": "required|string",
    "credit_card_pin": "required|string",
    "credit_card_exp": "required|string",
  };

  const data = req.body;
  const validator = new Validator(data, validationRules);
  if (validator.fails()) {
    const errors = validator.errors.all();
    return res.status(400).json({ errors });
  }
  next();
}

module.exports = { 
  getFlightSchedulesValidator,
  createBookingValidator
};