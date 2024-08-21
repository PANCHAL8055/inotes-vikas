import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./user.model.js";

const Notes = sequelize.define(
  "Notes",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Reference to the User model
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "notes",
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Establish the relationship
Notes.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Notes;
