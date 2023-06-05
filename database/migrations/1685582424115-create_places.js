module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('places', {
  "id": {
    "type": "INTEGER",
    "allowNull": false,
    "primaryKey": true,
    "autoIncrement": true
  },
  "name": {
    "type": "VARCHAR",
    "length": 255,
    "allowNull": false
  },
  "description": {
    "type": "TEXT",
    "allowNull": false
  },
  "longitude": {
    "type": "DECIMAL",
    "allowNull": false
  },
  "latitude": {
    "type": "DECIMAL",
    "allowNull": false
  },
  "created_at": {
    "type": "DATE",
    "allowNull": false,
    "defaultValue": {
      "val": "CURRENT_TIMESTAMP"
    }
  },
  "updated_at": {
    "type": "DATE",
    "allowNull": false,
    "defaultValue": {
      "val": "CURRENT_TIMESTAMP"
    }
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('places');
        }
      };