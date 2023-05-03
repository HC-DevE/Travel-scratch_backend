const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const sequelize = require("../config/db");
const { User, Trip } = require("../models/associations")(sequelize);

//creation of a trip
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

//get all trips
describe("Get all trips", () => {
  let token;

  before(async () => {
    // Sign up the test user for login later
    const signupResponse = await request(app)
      .post("/api/auth/signup")
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "user1test.example@example.fr",
        password_hash: "test1234",
        birth_date: "1990-01-01",
        gender: "male",
      });

    expect(signupResponse.status).to.equal(201);
    expect(signupResponse.body.message).to.equal("User created successfully");



    // Log in the test user to get the auth token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user1test.example@example.fr", //test user email already registered
        password_hash: "test1234", //the users password
      });

    token = loginResponse.body.token;

    // Create trips for the test user
    await request(app)
      .post("/api/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Trip 1",
        description: "A trip for testing",
        start_date: "2023-04-01",
        end_date: "2023-04-10",
      });

    await request(app)
      .post("/api/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Trip 2",
        description: "Another trip for testing",
        start_date: "2023-04-01",
        end_date: "2023-04-10",
      });

    await request(app)

      .post("/api/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Trip 3",
        description: "A trip for testing",
        start_date: "2023-04-01",
        end_date: "2023-04-10",
      });

    //Get all these trips to test 
    const response = await request(app)
      .get("/api/trips/")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).to.equal(200);
    expect(response.body.trips.length).to.equal(3);

    expect(response.body.trips[0].title).to.equal("Test Trip 1");
    expect(response.body.trips[1].title).to.equal("Test Trip 2");
    expect(response.body.trips[2].title).to.equal("Test Trip 3");
  });

  after(async () => {
    // Clean up the created trips after testing
    const existingUser = await User.findOne({
      where: { email: "email@example.com" }
    });
    await Trip.destroy({ where: { user_id: existingUser.id } });
  });

  it("should return an error if the user is not logged in", async () => {
    const response = await request(app).get("/api/trips/").send();

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("You are not logged in");
  });

});
