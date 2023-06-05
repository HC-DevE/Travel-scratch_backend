module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('reviews', {
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
  "place_id": {
    "type": "INTEGER",
    "allowNull": false,
    "references": {
      "model": "Place",
      "key": "id"
    }
  },
  "rating": {
    "type": "INTEGER",
    "allowNull": false
  },
  "comment": {
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
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('reviews');
        }
      };