"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      // { email: "gyu1", password: "1234", type: 0, createdAt, updatedAt },
      // { email: "gyu2", password: "1234", type: 0, createdAt, updatedAt },
      // { email: "gyu3", password: "1234", type: 0, createdAt, updatedAt },
      // { email: "doctor1", password: "1234", type: 1, createdAt, updatedAt },
      // { email: "doctor2", password: "1234", type: 1, createdAt, updatedAt },
      // { email: "doctor3", password: "1234", type: 1, createdAt, updatedAt },
      {
        email: "min1@gmail.com",
        password: "excbxhpgwg",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min2@gmail.com",
        password: "kgpamgyikn",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min3@gmail.com",
        password: "hlguytpafa",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min4@gmail.com",
        password: "tdpcgjnhmu",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min5@gmail.com",
        password: "sxtmtfngyw",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min6@gmail.com",
        password: "qkangxhfze",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min7@gmail.com",
        password: "lujgpikaqk",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min8@gmail.com",
        password: "nwevdpuqkx",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min9@gmail.com",
        password: "slsbadswaq",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min10@gmail.com",
        password: "ndfvicnqol",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min11@gmail.com",
        password: "awxhambiuy",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min12@gmail.com",
        password: "qxfivjrxig",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min13@gmail.com",
        password: "lmlbscuvil",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min14@gmail.com",
        password: "xvvnxmujsr",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min15@gmail.com",
        password: "cgekjwuhmp",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min16@gmail.com",
        password: "gzzrovboti",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "min17@gmail.com",
        password: "hdppobwbkx",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "min18@gmail.com",
        password: "rckpgrxhrg",
        type: 0,
        createdAt,
        updatedAt,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
