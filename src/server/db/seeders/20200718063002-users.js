"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        email: "doctor1@gmail.com",
        password: "excbxhpgwg",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu2@gmail.com",
        password: "kgpamgyikn",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor3@gmail.com",
        password: "hlguytpafa",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu4@gmail.com",
        password: "tdpcgjnhmu",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor5@gmail.com",
        password: "sxtmtfngyw",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu6@gmail.com",
        password: "qkangxhfze",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor7@gmail.com",
        password: "lujgpikaqk",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu8@gmail.com",
        password: "nwevdpuqkx",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor9@gmail.com",
        password: "slsbadswaq",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu10@gmail.com",
        password: "ndfvicnqol",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor11@gmail.com",
        password: "awxhambiuy",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu12@gmail.com",
        password: "qxfivjrxig",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor13@gmail.com",
        password: "lmlbscuvil",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu14@gmail.com",
        password: "xvvnxmujsr",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor15@gmail.com",
        password: "cgekjwuhmp",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu16@gmail.com",
        password: "gzzrovboti",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor17@gmail.com",
        password: "hdppobwbkx",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu18@gmail.com",
        password: "rckpgrxhrg",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor19@gmail.com",
        password: "qkivnswbkx",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu20@gmail.com",
        password: "qkivnshws",
        type: 0,
        createdAt,
        updatedAt,
      },
      {
        email: "doctor21@gmail.com",
        password: "hdpwmdwbkx",
        type: 1,
        createdAt,
        updatedAt,
      },
      {
        email: "gyu22@gmail.com",
        password: "rckvowjsrg",
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
