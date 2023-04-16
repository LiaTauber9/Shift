import Schedule from '../model/ScheduleModel.js';
import { Op } from 'sequelize';



export const insertSchedule = async(req,res)=>{
    // const scheduleArr = req.body;
    const scheduleArr = [{user_id:30, date:"2023-02-16",day:4,part:0,start_at:"07:00",end_at:"15:00"}]
    try{
        const insert = await Schedule.bulkCreate(scheduleArr)
        res.json({msg:'insert schedule succeed'})
    }catch(e){
        console.log('insertSchedule error=>',e);
        res.json({msg:'insert schedule error'})
    }
    console.log('insertSchedule response=>',scheduleArr);
}

export const upsertSchedule = async(req,res)=>{
    try{
        const upsert = req.body;
    console.log('upsertSchedule req.body=>',upsert);
    const [shiftSchedule, created] = await Schedule.bulkCreate(upsert,{updateOnDuplicate:['user_id','status','start_at','end_at']})
    res.json({msg:'upsert schedule succeed'})
    }catch(e){
        console.log('upsertSchedule error=>',e);
        res.status(e.status).json({msg:'upsert schedule error'});
    }
    

}



// export const updateConstraints = async(req,res)=>{
//     const constArr = req.body;
//     for(const row of constArr){
//         const{user_id, date, part, option} = row;
//         try{
//             const update = Constraints.update(
//                 {option},
//                 {where:{user_id,date,part}}
//             )
//             res.json({msg:'update succeed'})
//         }catch(e){console.log(row,e)}        
//     }
// }






export const getSchedule = async (req, res) => {
    
    // const {user_id, date_start, date_end}=req.body;
    console.log('req.body=>',req.body);

    try {
        const existsSchedule = await Schedule.findAll({
            where: {
                [Op.and]: [{
                    date: {
                        [Op.between]: [date_start, date_end]
                    },
                    user_id:{[Op.or]:[user_id]}
                }]

            }
        })

        // console.log(existsShifts);
        res.json(existsSchedule)
    } catch (e) {
        res.json({ msg: 'error' })
    }
}
export const getPostedSchedule = async (req, res) => {
    const {date_start, date_end} = req.query;
    const status = req.query.status=='all' ? {[Op.or]:['post','save']} : 'post'
    // const {user_id, date_start, date_end}=req.body;
    console.log('req.body=>',req.body);

    try {
        const existsSchedule = await Schedule.findAll({
            where: {
                [Op.and]: [{
                    date: {
                        [Op.between]: [date_start, date_end]
                    },
                    status:status
                }]

            }
        })

        // console.log(existsShifts);
        res.json(existsSchedule)
    } catch (e) {
        res.json({ msg: 'error' })
    }
}
// export const mGetConstraints = async (req, res) => {
    
//     const {user_id, date_start, date_end}=req.body;
//     console.log('req.body=>',req.body);

//     try {
//         const existsShifts = await Constraints.findAll({
//             where: {
//                 [Op.and]: [{
//                     date: {
//                         [Op.between]: [date_start, date_end]
//                     },
//                     user_id:{[Op.or]:user_id}
//                 }]

//             }
//         })

//         // console.log(existsShifts);
//         res.json(existsShifts)
//     } catch (e) {
//         res.json({ msg: 'error' })
//     }
// }


