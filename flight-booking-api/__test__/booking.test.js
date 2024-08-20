import {
  expect,
  test
} from "@jest/globals";
const {  createBookingService } = require("../services/booking");
const dataEncryption = require("../middlewares/encryption");

test("booking create - invalid email test", async() => {
  const response = await createBookingService(
    1,
    "aa", 
    "aa",
    "aa",
    "+099",
    "ro5xn49hqoUDf3JbNfGyNg==",
    "MZ2901",
    "2020-10-10",
    "2024-10-01",
    "019944",
    "123",
    "2026-01-10"
  );


  expect(response.status).toBe(400);
  expect(response.data.message).toBe("email is invalid");
});

test("booking create - invalid email test", async() => {
  const email = dataEncryption.encrypt("sample@thirtysecond.com");
  const phone = dataEncryption.encrypt("+669112034");
  const passportNo = dataEncryption.encrypt("AA0098765");
  const response = await createBookingService(
    1,
    "John", 
    "",
    "Louis",
    phone,
    email,
    passportNo,
    "2020-10-10",
    "2024-10-01",
    "019944",
    "123",
    "2026-01-10"
  );


  expect(response.status).toBe(200);
  expect(response.data.id).toBeGreaterThan(0);
});