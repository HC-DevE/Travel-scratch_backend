// const request = require("supertest");
// const { expect } = require("chai");
// const app = require("../app");

// describe("User Login", () => {
//   it("should log in the user and return an auth token", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "john.doe@example.com",
//         password_hash: "test1234",
//       });

//     expect(response.status).to.equal(200);
//     expect(response.body.success).to.equal(true);
//     expect(response.body).to.have.property("token");
//   });

//   it("should return an error if email is not found", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "nonexistent@example.com",
//         password_hash: "wrongpassword",
//       });

//     expect(response.status).to.equal(400);
//     expect(response.body.message).to.equal("Email not found");
//   });

//   it("should return an error if the password is incorrect", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "john.doe@example.com", // Replace with the email of an existing user
//         password_hash: "wrongpassword",
//       });

//     expect(response.status).to.equal(400);
//     expect(response.body.message).to.equal("Incorrect password");
//   });
// });
