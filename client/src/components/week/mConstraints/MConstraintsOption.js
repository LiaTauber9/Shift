import { Avatar, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useState } from "react";
import { AppContext } from "../../../App";


const MConstraintsOption = (props) => {
    const { users, usersObj } = useContext(AppContext);
    const [showList, setShowList] = useState(false);

    const onSelect = (emp)=>{
        switch(props.option){
            case 'close': alert('This shift is not open'); break;
            case 'null': onSelectNull(emp); break;
            default: props.onSelect(emp.user_id)
        }
    } 

    const onSelectNull = (emp)=>{

    }

    // console.log('usersObj MConstraintsOption',usersObj);
    // const optionColor = {open:'blue',close:'red',favorite:'green'}

    return (
        props.option === 'close' ||  props.option === 'null'?
            <div>
                 <Typography className={props.option} onClick={()=>setShowList(!showList)}>{props.option} </Typography>
                 
              {showList ? 
              <List  sx={{bgcolor:'white', zIndex:1400, position: 'absolute'}}>
              {props.employees.map((emp,index)=>              
                    <ListItem key={index}>
                    <Avatar variant="rounded" onClick={() => onSelect(emp)} sx={{ bgcolor: `${usersObj[emp.user_id].color}80`, width:25, height:25, fontSize:12 }}>HH</Avatar>
                  </ListItem>               
              )
            }
              </List>
              : null
}
            










                {/* <Accordion sx={{bgColor:'white', zIndex:9, width:60}}>
                    <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                       sx={{}}
                    >
                        <Typography className={props.option}>{props.option}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Typography >
                        {props.employees.map((emp, index) =>
                        <span>
                            <span key={index} onClick={() => acordionOnClick()} style={{ backgroundColor: `${usersObj[emp.user_id].color}80` }}>| {usersObj[emp.user_id].name} |</span>
                            {
                                emp.note ? <span onClick={() => { alert(emp.note) }}>*</span> : ''
                            }
                        </span>
                    )}
                        </Typography>
                    </AccordionDetails>
                </Accordion> */}
            </div>
            :
            <div className="m_const_option">
                <p className={props.option} style={{ margin: 0 }}>{props.option}:
                    {props.employees.map((emp, index) =>
                        <span>
                            <span key={index} onClick={()=>onSelect(emp)} style={{ backgroundColor: `${usersObj[emp.user_id].color}80` }}>| {usersObj[emp.user_id].name} |</span>
                            {
                                emp.note ? <span onClick={() => { alert(emp.note) }}>*</span> : ''
                            }
                        </span>
                    )}
                </p>
            </div>
    )
}

export default MConstraintsOption