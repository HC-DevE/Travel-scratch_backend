module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('medias', {
  "id": {
    "type": "INTEGER",
    "primaryKey": true,
    "autoIncrement": true
  },
  "user_id": {
    "type": "INTEGER",
    "allowNull": false,
    "references": {
      "model": "User",
      "key": "id"
    }
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
  "description": {
    "type": "TEXT",
    "allowNull": true
  },
  "url": {
    "type": "VARCHAR",
    "length": 255,
    "allowNull": false
  },
  "created_at": {
    "type": "DATE",
    "allowNull": false,
    "defaultValue": {}
  },
  "updated_at": {
    "type": "DATE",
    "allowNull": false,
    "defaultValue": {}
  },
  "type": {
    "type": "ENUM('photo', 'video')",
    "allowNull": false
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('medias');
        }
      };