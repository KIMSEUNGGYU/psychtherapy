"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("keywords", [
      { name: "우울", createdAt, updatedAt },
      { name: "불안", createdAt, updatedAt },
      { name: "강박", createdAt, updatedAt },
      { name: "무기력", createdAt, updatedAt },
      { name: "자살", createdAt, updatedAt },
      { name: "자해", createdAt, updatedAt },
      { name: "친구", createdAt, updatedAt },
      { name: "공항", createdAt, updatedAt },
      { name: "부부", createdAt, updatedAt },
      { name: "연인", createdAt, updatedAt },
      { name: "진로", createdAt, updatedAt },
      { name: "취업", createdAt, updatedAt },
      { name: "성소수자", createdAt, updatedAt },
      { name: "감정조절", createdAt, updatedAt },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("keywords", null, {});
  },
};
