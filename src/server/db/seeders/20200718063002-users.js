"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      { email: "gyu1", password: "1234", type: 0, createdAt, updatedAt },
      { email: "gyu2", password: "1234", type: 0, createdAt, updatedAt },
      { email: "gyu3", password: "1234", type: 0, createdAt, updatedAt },
      { email: "doctor1", password: "1234", type: 1, createdAt, updatedAt },
      { email: "doctor2", password: "1234", type: 1, createdAt, updatedAt },
      { email: "doctor3", password: "1234", type: 1, createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
