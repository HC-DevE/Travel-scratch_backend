// GroupMember.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class GroupMember extends Model {}
  GroupMember.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Group",
          key: "id",
        },
        primaryKey: true,
        foreignKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        primaryKey: true,
        foreignKey: true,
      },
      role: {
        type: DataTypes.ENUM("member", "admin"),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      primaryKey: false,
      modelName: "GroupMember",
      tableName: "group_members",
      timestamps: false,
      underscored: true,
    }
  );
  return GroupMember;
};
