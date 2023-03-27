import { Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { useContext } from "react";
import { AppContext } from "../../../App";
import { getUsersObj } from "../../../utils/users";

const MConstraintsOption = (props) => {
    const { users } = useContext(AppContext);
    const usersObj = getUsersObj(users);
    // console.log('usersObj MConstraintsOption',usersObj);
    // const optionColor = {open:'blue',close:'red',favorite:'green'}

    const acordionOnClick = (emp)=>{
        if(props.option==='close'){
            alert('This shift is not open')
        }else{
            props.sendWhatsapp(emp)
        }
    }

    return (
        props.option === 'close' ||  props.option === 'null'?
            <div style={{width:30,height:30, display:'inline'}}>
                <Accordion >
                    <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                       
                    >
                        <Typography className={props.option}>{props.option}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Typography >
                        {props.employees.map((emp, index) =>
                        <span>
                            <span key={index} onClick={() => acordionOnClick(emp)} style={{ backgroundColor: `${usersObj[emp.user_id].color}80` }}>| {usersObj[emp.user_id].name} |</span>
                            {
                                emp.note ? <span onClick={() => { alert(emp.note) }}>*</span> : ''
                            }
                        </span>
                    )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
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