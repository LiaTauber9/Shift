import {Sequelize} from 'sequelize';
import db from '../config/elephantsql.js';

const {DataTypes} = Sequelize;

const Schedule = db.define('schedules',{
    id : {
        type: DataTypes.STRING,
        primaryKey: true
      },
    user_id:{
      type:DataTypes.INTEGER
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
    start_at:{
        type:DataTypes.TIME
    },
    end_at:{
        type:DataTypes.TIME
    },
    status:{
        type:DataTypes.STRING
    }
  },
  {timestamps: false}  
  )
export default Schedule  