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
        updateSendToList(user_id);
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

    const isSent = ()=>{
        alert('message has sent successfuly')
        setSendToList([]);
    }

    const whatsappIconClass = (id)=>{
        return sendToList.includes(id) ? "fa-brands fa-square-whatsapp  fa-xl fa-beat" : "fa-brands fa-square-whatsapp  fa-lg" 
    }
    const whatsappIconColor = (id)=>{
        return sendToList.includes(id) ? "#79df26" : "#7e8186" 
    }

    return(
        <Stack spacing={5} alignItems="center" p={3} className='counter_sidebar'>
            <Stack spacing={2} direction='column'>
            {
                
                users.map((user,index)=>
                <Stack key={index} direction='row'spacing={2} alignItems="center" justifyContent='center' >
                    <Avatar sx={{bgcolor:usersObj[user.id].color}} onClick={()=>selectEmp(user.id)} >{usersObj[user.id].avatar_name}</Avatar>
                    <i className ='fa-brands fa-square-whatsapp  fa-lg'
                        style={{ color: whatsappIconColor(user.id),fontSize:'26px'}} 
                        onClick={()=>updateSendToList(user.id)}>
                    </i>
                    <Paper sx={{width:'68px',height:'24px',padding:0,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'inherit'}}>
                    <p style={{fontSize:'12px',margin:0}}>{`${usersObj[user.id].name}: `}</p>
                    </Paper>
                    <Paper sx={{width:'24px',height:'24px',padding:0}}>
                        <Typography sx={{fontSize:'15px'}}>
                            {shiftCounterObj ?
                            shiftCounterObj[user.id].length : null 
                        }
                            </Typography>
                    </Paper>
                </Stack>)
            }
            </Stack>
            
            <WhatsApp sendToList={sendToList} updateSendToList={updateSendToList} isSent={isSent}/>
        </Stack>
    )
}

export default SideBar;