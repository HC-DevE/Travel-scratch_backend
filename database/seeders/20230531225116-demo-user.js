"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create users from ./models/User.js
    await queryInterface.bulkInsert("users", [
      {
        first_name: "John",
        last_name: "Dave",
        email: "tzirw@example.com",
        password_hash: "fgsfdDGpZkDu4g53f4gf4g@fgg5-g553fXdD",
        birth_date: "1990-01-01",
        gender: "male",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password_hash: "dkFiZo-DGpZkXDu5fds65d4gfgC5g9ds@EG",
        birth_date: "1990-01-01",
        gender: "female",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // delete users from ./models/User.js
    await queryInterface.bulkDelete("users", null, {});
  },
};
