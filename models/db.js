import Sequelize from "sequelize";

const sequelize = new Sequelize('postapp', 'root', '123',{
  host: 'localhost',
  dialect: 'mysql'
});


export default {
  Sequelize: Sequelize,
  sequelize: sequelize
}