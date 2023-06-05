module.exports = {
        up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('groupmembers', {
  "group_id": {
    "type": "INTEGER",
    "allowNull": false,
    "primaryKey": true,
    "references": {
      "model": "Group",
      "key": "id"
    }
  },
  "user_id": {
    "type": "INTEGER",
    "allowNull": false,
    "primaryKey": true,
    "references": {
      "model": "User",
      "key": "id"
    }
  },
  "role": {
    "type": "ENUM('member', 'admin')",
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
  }
});
        },
      
        down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('groupmembers');
        }
      };