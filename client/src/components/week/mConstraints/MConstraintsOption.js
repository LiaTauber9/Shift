import { Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { getUsersObj } from "../../../utils/users";

const MConstraintsOption = (props) => {
    const { users } = useContext(AppContext);
    const usersObj = getUsersObj(users);
    const [showList, setShowList] = useState(false);

    // console.log('usersObj MConstraintsOption',usersObj);
    // const optionColor = {open:'blue',close:'red',favorite:'green'}

    const acordionOnClick = ()=>{
       
            alert('This shift is not open')
    
    }

    return (
        props.option === 'close' ||  props.option === 'null'?
            <div>
                 <Typography className={props.option} onClick={()=>setShowList(!showList)}>{props.option} </Typography>
                 
              {showList ? 
              <List  sx={{bgcolor:'white', zIndex:1400, position: 'absolute'}}>
              {props.employees.map(emp=>              
                    <ListItem >
                    <span onClick={() => acordionOnClick()} style={{ backgroundColor: `${usersObj[emp.user_id].color}80` }}>| {usersObj[emp.user_id].name} |</span>
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
                            <span key={index} onClick={() => props.onSelect(emp.user_id)} style={{ backgroundColor: `${usersObj[emp.user_id].color}80` }}>| {usersObj[emp.user_id].name} |</span>
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