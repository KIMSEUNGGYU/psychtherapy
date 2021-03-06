"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userDetails",
      [
        {
          userId: 2,
          name: "farfdswz",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 4,
          name: "azkhzbzh",
          gender: 2,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 6,
          name: "dfwjdmce",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 8,
          name: "bbkgxgdw",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 10,
          name: "idffbhye",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 12,
          name: "xfdnvvpa",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 14,
          name: "ialvjxuo",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 16,
          name: "bsupamta",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 18,
          name: "rvyvqwkk",
          gender: 2,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 20,
          name: "kdivnwsl",
          gender: 2,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 22,
          name: "dkdivwkk",
          gender: 2,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 23,
          name: "admin",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 24,
          name: "root",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
        {
          userId: 27,
          name: "김승규",
          gender: 1,
          age: 26,
          createdAt,
          updatedAt,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userDetails", null, {});
  },
};
