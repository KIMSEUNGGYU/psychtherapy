"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      { email: "gyu1", password: "1234" },
      { email: "gyu2", password: "1234" },
      { email: "gyu3", password: "1234" },
      { email: "doctor1", password: "1234" },
      { email: "doctor2", password: "1234" },
      { email: "doctor3", password: "1234" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
