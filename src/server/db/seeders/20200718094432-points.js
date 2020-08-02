"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("points", [
      { userId: 1, point: 0, createdAt, updatedAt },
      { userId: 2, point: 20000, createdAt, updatedAt },
      { userId: 3, point: 0, createdAt, updatedAt },
      { userId: 4, point: 20000, createdAt, updatedAt },
      { userId: 5, point: 0, createdAt, updatedAt },
      { userId: 6, point: 20000, createdAt, updatedAt },
      { userId: 7, point: 0, createdAt, updatedAt },
      { userId: 8, point: 20000, createdAt, updatedAt },
      { userId: 9, point: 0, createdAt, updatedAt },
      { userId: 10, point: 20000, createdAt, updatedAt },
      { userId: 11, point: 0, createdAt, updatedAt },
      { userId: 12, point: 20000, createdAt, updatedAt },
      { userId: 13, point: 0, createdAt, updatedAt },
      { userId: 14, point: 0, createdAt, updatedAt },
      { userId: 15, point: 0, createdAt, updatedAt },
      { userId: 16, point: 0, createdAt, updatedAt },
      { userId: 17, point: 0, createdAt, updatedAt },
      { userId: 18, point: 0, createdAt, updatedAt },
      { userId: 19, point: 0, createdAt, updatedAt },
      { userId: 20, point: 0, createdAt, updatedAt },
      { userId: 21, point: 0, createdAt, updatedAt },
      { userId: 22, point: 0, createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("partnerDetails", null, {});
  },
};
