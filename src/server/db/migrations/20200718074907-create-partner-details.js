"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("partnerDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      partnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.TINYINT,
      },
      age: {
        type: Sequelize.TINYINT,
      },
      url: {
        type: Sequelize.STRING,
      },
      shortInfo: {
        type: Sequelize.STRING,
      },
      career: {
        type: Sequelize.TEXT,
      },
      info: {
        type: Sequelize.TEXT,
      },
      chatCost: {
        type: Sequelize.INTEGER,
      },
      keyword: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.TINYINT,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("partnerDetails");
  },
};
