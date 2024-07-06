'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      // define association here
      this.belongsTo(user, { foreignKey: 'follower_id' });
    }
  }
  followers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,

    },
    user_id: {
      type : DataTypes.UUID,
      allowNull : false
    },
    follower_id: {
      type : DataTypes.UUID,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'followers',
    underscored : true
  });
  return followers;
};