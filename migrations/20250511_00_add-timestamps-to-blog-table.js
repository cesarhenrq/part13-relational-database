const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isAfter: 1991,
        isBefore: new Date().getFullYear(),
      },
      defaultValue: new Date().getFullYear(),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
