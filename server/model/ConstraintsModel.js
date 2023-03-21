import {Sequelize} from 'sequelize';
import db from '../config/elephantsql.js';

const {DataTypes} = Sequelize;

const Constraints = db.define('constraints',{
    user_id:{
      type:DataTypes.STRING
    },
    date:{
      type:DataTypes.DATEONLY
    },
    day:{
      type:DataTypes.INTEGER
    },
    part:{
      type:DataTypes.INTEGER
    },
    option:{
        type:DataTypes.STRING
    },
    note:{
      type:DataTypes.STRING
    }
  },
  {timestamps: false}  
  )
export default Constraints  