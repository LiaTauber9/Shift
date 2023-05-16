import Constraints from "../model/ConstraintsModel.js";
import { Op } from 'sequelize';

export const getConstraints = async (req, res) => {
    
    const {user_id, date_start, date_end}=req.query;
    console.log('req.body=>',req.query);

    try {
        const existsShifts = await Constraints.findAll({
            where: {
                [Op.and]: [{
                    date: {
                        [Op.between]: [date_start, date_end]
                    },
                    user_id:{[Op.and]:[user_id]}
                }]

            }
        })

        // console.log(existsShifts);
        res.json(existsShifts)
    } catch (e) {
        res.json({ msg: 'error' })
    }
}
export const mGetConstraints = async (req, res) => {
    
    const {user_id, date_start, date_end}=req.body;
    console.log('req.body=>',req.body);

    try {
        const existsShifts = await Constraints.findAll({
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
        res.json(existsShifts)
    } catch (e) {
        console.log(e);
        res.json({ msg: 'error' })
    }
}

export const upsertConstraints = async(req,res)=>{
    try{
        const upsert = req.body;
    console.log('upsertConstraints req.body=>',upsert);
    const [shiftConstraint, created] = await Constraints.bulkCreate(upsert,{updateOnDuplicate:['option','note']})
    res.json({msg:'upsert constraints succeed'})
    }catch(e){
        console.log('upsertConstraints error=>',e);
        res.json({msg:'upsert constraints error'})
    }
    

}


export const insertConstraints = async(req,res)=>{
    const constArr = req.body;
    try{
        const insert = await Constraints.bulkCreate(constArr)
        res.json({msg:'insert succeed'})
    }catch{
        res.json({msg:'insert error'})
    }
    console.log('insertConstraints response=>',constArr);
}

export const updateConstraints = async(req,res)=>{
    const constArr = req.body;
    for(const row of constArr){
        const{user_id, date, part, option} = row;
        try{
            const update = Constraints.update(
                {option},
                {where:{user_id,date,part}}
            )
            res.json({msg:'update succeed'})
        }catch(e){console.log(row,e)}        
    }
}











// export const addConstraints = async (req, res) => {
//     const newConst = req.body
//     console.log('req.body=>', req.body);
//     let exists;
//     try {
//         exists = await Constraints.findAll({
//             where: {
//                 user_id: newConst.user_id,
//                 date: newConst.date,
//                 day: newConst.day,
//                 part: newConst.part
//             }
//         });
//     } catch (e) {
//         console.log(e);
//     }

//     if (exists.length === 0) {
//         try {
//             const newC = await Constraints.create(newConst);
//             res.json({ msg: 'Constraints added' })
//         } catch (e) {
//             console.log(e);
//         }
//     } else {
//         try {
//             await Constraints.update({ option: newConst.option }, {
//                 where: {
//                     user_id: newConst.user_id,
//                     date: newConst.date,
//                     day: newConst.day,
//                     part: newConst.part
//                 }
//             });
//             res.json({ msg: 'Constraints updated' })
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }




