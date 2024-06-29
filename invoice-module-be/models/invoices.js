'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoices.hasMany(models.InvoiceProducts, { foreignKey: 'invoiceId' });
    }
  }
  Invoices.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Invoice date is required' },
        notEmpty: { msg: 'Invoice date is required' }
      }
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Customer name is required' },
        notEmpty: { msg: 'Customer name is required' }
      }
    },
    salespersonName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Salesperson name is required' },
        notEmpty: { msg: 'Salesperson name is required' }
      }
    },
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};