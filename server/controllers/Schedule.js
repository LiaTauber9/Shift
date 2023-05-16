import Schedule from '../model/ScheduleModel.js';
import { Op } from 'sequelize';


export const upsertSchedule = async(req,res)=>{
    try{
        const upsert = req.body;
    console.log('upsertSchedule req.body=>',upsert);
    const [shiftSchedule, created] = await Schedule.bulkCreate(upsert,{updateOnDuplicate:['user_id','status','start_at','end_at']})
    res.json({msg:'upsert schedule succeed'})
    }catch(e){
        console.log('upsertSchedule error=>',e);
        res.status(e.status||404).json({msg:'upsert schedule error'})
    }
}


export const getSchedule = async (req, res) => {
    const {date_start, date_end} = req.query;
    const status = req.query.status=='all' ? {[Op.or]:['post','save']} : 'post'
    console.log('req.body=>',req.body);

    try {
        const existsSchedule = await Schedule.findAll({
            where: {
                [Op.and]: [{
                    date: {
                        [Op.between]: [date_start, date_end]
                    },
                    status:status,
                }]

            }
        })
        res.json(existsSchedule)
    } catch (e) {
        res.status(e.status||404).json({ msg: 'error' })
    }
}

export const getMonthlySchedule = async (req, res) => {
    const {date_start, date_end, user_id} = req.query;
    // const status = req.query.status=='all' ? {[Op.or]:['post','save']} : 'post'
    // console.log('req.body=>',req.body);
    console.log('date_start, date_end, user_id=>',date_start, date_end, user_id);
    try {
        const existsSchedule = await Schedule.findAll({
            where: {
                [Op.and]: [{
                    date: {
                        [Op.between]: [date_start, date_end]
                    },
                    // status:status,
                    user_id
                }]

            }
        })
        res.json(existsSchedule)
    } catch (e) {
        res.status(e.status||404).json({ msg: 'error' })
    }
}










