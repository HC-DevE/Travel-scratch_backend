module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('tripplaces', {
  "id": {
    "type": "INTEGER",
    "allowNull": false,
    "primaryKey": true,
    "autoIncrement": true
  },
  "trip_id": {
    "type": "INTEGER",
    "allowNull": false,
    "references": {
      "model": "Trip",
      "key": "id"
    }
  },
  "place_id": {
    "type": "INTEGER",
    "allowNull": false,
    "references": {
      "model": "Place",
      "key": "id"
    }
  },
  "created_at": {
    "type": "DATE",
    "allowNull": false,
    "defaultValue": {
      "val": "CURRENT_TIMESTAMP"
    }
  },
  "visit_date": {
    "type": "DATE",
    "allowNull": true
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('tripplaces');
        }
      };