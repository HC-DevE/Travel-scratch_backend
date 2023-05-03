const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const sequelize = require("../config/db");
const { User, Trip } = require("../models/associations")(sequelize);

describe("Trip Creation", () => {
  let token;

  before(async () => {
    // Log in the test user to get the auth token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john.doe123@example.com", //test user email already registered
        password_hash: "test1234", //the users password
      });

    token = loginResponse.body.token;
  });

  it("should create a trip successfully", async () => {
    const response = await request(app)
      .post("/api/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Trip 1",
        description: "A trip for testing",
        start_date: "2023-04-01",
        end_date: "2023-04-10",
      });

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal("Trip created successfully");
    expect(response.body.trip.title).to.equal("Test Trip 1");
  });

  // Add other test cases here

  after(async () => {
    // Clean up the created trips after testing
    const existingUser = await User.findOne({
      where: { email: "john.doe123@example.com" },
    });
    await Trip.destroy({ where: { user_id: existingUser.id } });
  });
});
