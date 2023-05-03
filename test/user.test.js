const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const sequelize = require("../config/db");
const expect = chai.expect;


//register user
describe("User Registration", () => {
  it("should register a user and return a success message", async () => {
    const testPassword = "test1234";
    const response = await request(app).post("/api/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "john.do45@example.com",
      password_hash: testPassword,
      birth_date: "1990-01-01",
      gender: "male",
      preferences: "testing",
    });

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal("User created successfully");
    expect(response.body.user.email).to.equal("john.do45@example.com");

    // Check if password is hashed
    const bcrypt = require("bcrypt");
    const User = require("../models/User")(sequelize);

    const user = await User.findOne({
      where: { email: "john.do45@example.com" },
    });
    const passwordMatch = await bcrypt.compare(
      testPassword,
      user.password_hash
    );
    expect(passwordMatch).to.be.true;
  });

  it("should return an error if email already exists", async () => {
    const response = await request(app)
      .post("/api/auth/register") // Replace with your actual registration endpoint
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "john.do45@example.com",
        password_hash: "test1234",
        birth_date: "1990-01-01",
        gender: "male",
        preferences: "testing",
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Email already exists");
  });
});

//login user
describe("User Login", () => {
  it("should log in the user and return an auth token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john.doe@example.com",
        password_hash: "test1234",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body).to.have.property("token");
  });

  it("should return an error if email is not found", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password_hash: "wrongpassword",
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Email not found");
  });

  it("should return an error if the password is incorrect", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john.doe@example.com", // Replace with the email of an existing user
        password_hash: "wrongpassword",
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Incorrect password");
  });
});