import {
  expect,
  test
} from "@jest/globals";
const {  getFlightSchedulesService } = require("../services/flightSchedules");

test("Get all airporsts - date invalide", async() => {
  const response = await getFlightSchedulesService(1, 2, "2024-08-01");

  expect(response.status).toBe(400);
  expect(response.data.message).toBe("flightDate is invalid");
});

test("Get all airporsts - success", async() => {
  const response = await getFlightSchedulesService(1, 2, "2024-09-18");

  expect(response.status).toBe(200);
  expect(response.data.length).toBeGreaterThanOrEqual(0);
});