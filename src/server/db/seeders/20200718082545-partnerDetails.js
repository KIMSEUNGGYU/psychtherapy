"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "partnerDetails",
      [
        {
          partnerId: 4,
          name: "doctor1",
          gender: 1,
          age: 26,
          phoneNumber: "010-1234-1111",
          url: "url 1",
          shortInfo: "shortInfo 1",
          career: "career 1",
          info: "info 1",
          chatCost: 50000,
          keyword: "keyword 1",
          level: 3,
          certificate: 1,
          image: "image 1",
          evaluate: 0,
          createdAt,
          updatedAt,
        },
        {
          partnerId: 5,
          name: "doctor2",
          gender: 1,
          age: 26,
          phoneNumber: "010-1234-2222",
          url: "url 2",
          shortInfo: "shortInfo 2",
          career: "career 2",
          info: "info 2",
          chatCost: 50000,
          keyword: "keyword 2",
          level: 3,
          certificate: 2,
          image: "image 2",
          evaluate: 0,
          createdAt,
          updatedAt,
        },
        {
          partnerId: 6,
          name: "doctor3",
          gender: 1,
          age: 26,
          phoneNumber: "010-1234-3333",
          url: "url 3",
          shortInfo: "shortInfo 3",
          career: "career 3",
          info: "info 3",
          chatCost: 50000,
          keyword: "keyword 3",
          level: 3,
          certificate: 3,
          image: "image 3",
          evaluate: 0,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("partnerDetails", null, {});
  },
};
