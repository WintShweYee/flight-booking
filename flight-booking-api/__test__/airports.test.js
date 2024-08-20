import {
  expect,
  test
} from "@jest/globals";
const {  getAllAirportsService } = require("../services/airports");

test("Get all airporsts - success", async() => {
  const response = await getAllAirportsService();

  expect(response.status).toBe(200);
  expect(response.data.length).toBeGreaterThan(0);
  expect(response.data[0]).toMatchObject({
    id: expect.any(Number),
    airport_name: expect.any(String),
    time_zone: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    deletedAt: null
  });
});