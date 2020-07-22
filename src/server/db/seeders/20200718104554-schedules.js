"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("schedules", [
      {
        partnerId: 4,
        startedAt: "2020-07-18 15:00:00",
        createdAt,
        updatedAt,
      },
      {
        userId: 1,
        partnerId: 4,
        startedAt: "2020-07-18 16:00:00",
        createdAt,
        updatedAt,
      },
      { partnerId: 4, startedAt: "2020-07-18 17:00:00", createdAt, updatedAt },
      { partnerId: 4, startedAt: "2020-07-20 17:00:00", createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
