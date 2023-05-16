import { Card, Avatar, Paper, Typography } from "@mui/material";
import { Stack,  } from "@mui/system";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import WhatsApp from "../../manager/Whatsapp";

const SideBar = (props)=>{
    
    const {usersObj, users} = useContext(AppContext);
    console.log(users);    
    const {shiftCounterObj} = props;
    const [sendToList, setSendToList] = useState([]);
    // users.forEach(user => {
    //     shiftCounterObj[user.id]=0
    // })
    console.log('users,usersObj,shiftCounterObj=>',users,usersObj,shiftCounterObj);
    const selectEmp = (user_id)=>{
        alert(`${usersObj[user_id].name} selected`)
    }

    const updateSendToList = (id)=>{
        const list = [...sendToList]
        const index = list.indexOf(id);
        if(index != -1){
            list.splice(index,1);
        }else{
            list.push(id)
        }
        setSendToList(list);
    }

    const whatsappIconClass = (id)=>{
        return sendToList.includes(id) ? "fa-brands fa-square-whatsapp  fa-xl fa-beat" : "fa-brands fa-square-whatsapp  fa-lg" 
    }

    return(
        <Stack spacing={2}>
            {
                
                users.map((user,index)=>
                <Stack key={index} direction='row'spacing={2} alignItems="center">
                    <Avatar sx={{bgcolor:usersObj[user.id].color}} onClick={()=>selectEmp(user.id)} >{usersObj[user.id].avatar_name}</Avatar>
                    <Paper>
                        <Typography>
                            {shiftCounterObj ?
                            shiftCounterObj[user.id].length : null 
                        }
                            </Typography>
                    </Paper>
                    <i className={whatsappIconClass(user.id)}style={{ color: 'greenyellow'}} onClick={()=>updateSendToList(user.id)}>
                        </i>
                </Stack>)
            }
            
            <WhatsApp sendToList={sendToList} updateSendToList={updateSendToList}/>
        </Stack>
    )
}

export default SideBar;