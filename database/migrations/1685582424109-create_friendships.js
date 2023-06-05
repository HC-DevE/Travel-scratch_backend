module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("friendships", {
      user_id: {
        type: "INTEGER",
        allowNull: false,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      friend_id: {
        type: "INTEGER",
        allowNull: false,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      status: {
        type: "ENUM('pending', 'accepted', 'rejected')",
        allowNull: false,
        defaultValue: "pending",
      },
      created_at: {
        type: "DATE",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: "DATE",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("friendships");
  },
};
