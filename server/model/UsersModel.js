import {Sequelize} from 'sequelize';
import db from '../config/elephantsql.js';

const {DataTypes} = Sequelize;

const Users = db.define('users',{
  first_name:{
    type:DataTypes.STRING
  },
  last_name:{
    type:DataTypes.STRING
  },
  phone:{
    type:DataTypes.STRING
  },
  email: {
    type:DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  whatsapp_key: {
    type: DataTypes.STRING
  },
  // createdAt:{
  //   field:'createdat'
  // }
  // id createdAt updatedAt
},
{timestamps: false}
)

export default Users;
