"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("schedules", [
      {
        partnerId: 1,
        startedAt: "2020-07-20 15:00:00",
        createdAt,
        updatedAt,
      },
      {
        userId: 1,
        partnerId: 1,
        startedAt: "2020-07-20 16:00:00",
        createdAt,
        updatedAt,
      },
      {
        userId: 3,
        partnerId: 1,
        startedAt: "2020-07-20 17:00:00",
        createdAt,
        updatedAt,
      },
      { partnerId: 3, startedAt: "2020-07-20 10:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 17:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 18:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 19:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 20:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 21:00:00", createdAt, updatedAt },
      { partnerId: 3, startedAt: "2020-07-20 21:00:00", createdAt, updatedAt },
      { partnerId: 9, startedAt: "2020-07-21 13:00:00", createdAt, updatedAt },
      { partnerId: 9, startedAt: "2020-07-21 14:00:00", createdAt, updatedAt },
      { partnerId: 9, startedAt: "2020-07-22 15:00:00", createdAt, updatedAt },
      {
        userId: 3,
        partnerId: 21,
        startedAt: "2020-08-10 15:00:00",
        createdAt,
        updatedAt,
      },
      { partnerId: 21, startedAt: "2020-08-10 16:00:00", createdAt, updatedAt },
      { partnerId: 21, startedAt: "2020-08-10 17:00:00", createdAt, updatedAt },
      {
        userId: 3,
        partnerId: 21,
        startedAt: "2020-08-10 18:00:00",
        createdAt,
        updatedAt,
      },
      { partnerId: 21, startedAt: "2020-08-10 18:00:00", createdAt, updatedAt },
      { partnerId: 21, startedAt: "2020-08-11 15:00:00", createdAt, updatedAt },
      { partnerId: 21, startedAt: "2020-08-12 15:00:00", createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
