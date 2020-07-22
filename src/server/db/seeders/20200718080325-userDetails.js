"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userDetails",
      [
        {
          userId: 1,
          name: "kim1",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 2,
          name: "kim2",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 3,
          name: "kim3",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userDetails", null, {});
  },
};
