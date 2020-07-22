"use strict";

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
        },
        {
          userId: 2,
          name: "kim2",
          gender: 1,
          age: 26,
        },
        {
          userId: 3,
          name: "kim3",
          gender: 1,
          age: 26,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userDetails", null, {});
  },
};
