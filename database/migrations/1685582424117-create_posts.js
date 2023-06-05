module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('posts', {
  "id": {
    "type": "INTEGER",
    "allowNull": false,
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
  "content": {
    "type": "TEXT",
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
  },
  "title": {
    "type": "VARCHAR",
    "length": 255,
    "allowNull": false
  },
  "type": {
    "type": "ENUM('trip', 'other')",
    "allowNull": false,
    "defaultValue": "trip"
  },
  "trip_id": {
    "type": "INTEGER",
    "allowNull": true,
    "references": {
      "model": "Trip",
      "key": "id"
    }
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('posts');
        }
      };