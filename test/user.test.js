// const app = require("../app");
// const request = require("supertest");
// const chai = require("chai");
// const sequelize = require("../config/db");
// const expect = chai.expect;

// describe("User Registration", () => {
//   it("should register a user and return a success message", async () => {
//     const testPassword = "test1234";
//     const response = await request(app).post("/api/auth/register").send({
//       first_name: "John",
//       last_name: "Doe",
//       email: "john.do45@example.com",
//       password_hash: testPassword,
//       birth_date: "1990-01-01",
//       gender: "male",
//       preferences: "testing",
//     });

//     expect(response.status).to.equal(201);
//     expect(response.body.message).to.equal("User created successfully");
//     expect(response.body.user.email).to.equal("john.do45@example.com");

//     // Check if password is hashed
//     const bcrypt = require("bcrypt");
//     const User = require("../models/User")(sequelize);

//     const user = await User.findOne({
//       where: { email: "john.do45@example.com" },
//     });
//     const passwordMatch = await bcrypt.compare(
//       testPassword,
//       user.password_hash
//     );
//     expect(passwordMatch).to.be.true;
//   });

//   it("should return an error if email already exists", async () => {
//     const response = await request(app)
//       .post("/api/auth/register") // Replace with your actual registration endpoint
//       .send({
//         first_name: "John",
//         last_name: "Doe",
//         email: "john.do45@example.com",
//         password_hash: "test1234",
//         birth_date: "1990-01-01",
//         gender: "male",
//         preferences: "testing",
//       });

//     expect(response.status).to.equal(400);
//     expect(response.body.message).to.equal("Email already exists");
//   });
// });
