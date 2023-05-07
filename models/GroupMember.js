// GroupMember.js
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class GroupMember extends Model {}
  GroupMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      modelName: "GroupMember",
      tableName: "group_members",
      timestamps: false,
    }
  );
  return GroupMember;
};
