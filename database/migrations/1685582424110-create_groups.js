module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("groups", {
      id: {
        type: "INTEGER",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      created_by: {
        type: "INTEGER",
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      trip_id: {
        type: "INTEGER",
        allowNull: false,
        references: {
          model: "Trip",
          key: "id",
        },
      },
      name: {
        type: "VARCHAR",
        length: 255,
        allowNull: false,
      },
      description: {
        type: "TEXT",
        allowNull: true,
      },
      created_at: {
        type: "DATE",
        allowNull: false,
        defaultValue: {},
      },
      updated_at: {
        type: "DATE",
        allowNull: false,
        defaultValue: {},
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("groups");
  },
};
