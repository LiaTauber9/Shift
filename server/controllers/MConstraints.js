import Constraints from "../model/ConstraintsModel.js";
import Users from "../model/UsersModel.js";
import { Op } from 'sequelize';

export const getUsers = async(req,res)=>{
    const isActive= req.header('active')
    try{
        let response;
        if(isActive){
            response =  await Users.findAll({where:{active:isActive}});
        }else{
            response =  await Users.findAll();
        }
        // console.log(response);
        res.json(response)
    }catch(e){console.log(e)}
   
}