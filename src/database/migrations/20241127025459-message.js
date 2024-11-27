'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Twilio message SID',
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Recipient phone number',
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Sender phone number',
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Message content',
      },
      direction: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Direction of the message (inbound or outbound)',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  },
};
