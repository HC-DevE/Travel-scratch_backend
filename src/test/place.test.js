const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const sequelize = require("../config/db");
const { Place } = require("../models/associations")(sequelize);


//create place
describe("Place Creation", () => {
  let token;

  before(async () => {
    // Log in the test user to get the auth token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john.doe@example.com", // Replace with the email of an existing user
        password_hash: "test1234", // Replace with the correct password for the existing user
      });

    token = loginResponse.body.token;
  });

  it("should create a place successfully", async () => {
    const response = await request(app)
      .post("/api/places/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Place 1",
        description: "A place for testing",
        location: {
          type: "Point",
          coordinates: [1.2345, 1.2345],
          crs: "EPSG:4326"
        }
      });

    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.data.name).to.equal("Test Place 1");
  });

  after(async () => {
    // Clean up the created places after testing
    await Place.destroy({ where: { name: "Test Place 1" } });
  });
});
