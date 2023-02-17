'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',[
      {
        name:'NodeJS'
      },
      {
        name:'VueJS'
      },
      {
        name:'ExpressJS'
      },
      {
        name:'ReactJS'
      },
      {
        name:'PhP'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories',null, {})
  }
};
