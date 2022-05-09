"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert("Users", [
    //   {
    //     // email: "example@example.com",
    //     // password: "123456",
    //     // firstName: "Bình",
    //     // lastName: "Đoàn Thanh",
    //     // address: "66 CMT8, Khuê Trung.p, Đà Nẵng city",
    //     // phoneNumber: "0879806806",
    //     // gender: "1",
    //     // image: "",
    //     // roleId: "1",
    //     // positionId: "2",
    //     // createdAt: new Date(),
    //     // updatedAt: new Date(),
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
