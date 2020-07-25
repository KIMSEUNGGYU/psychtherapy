"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("points", [
      { userId: 1, point: 100000, createdAt, updatedAt },
      { userId: 2, point: 200000, createdAt, updatedAt },
      { userId: 3, point: 300000, createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("partnerDetails", null, {});
  },
};
