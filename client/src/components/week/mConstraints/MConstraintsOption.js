// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import { Avatar, Tooltip, AvatarGroup } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../App";


const MConstraintsOption = (props) => {
    const {usersObj} = useContext(AppContext);
    const optionsNames = {favorite:'preference', open:'open', unselected:'unselected', close:'closed'}

    const onClick = (user_id) => {
        console.log(user_id);
        switch (props.option) {
            case 'close': alert('This shift is not open'); break;
            case 'unselected': onSelectNull(user_id); break;
            default: props.onSelect(user_id)
        }
    }

    const onSelectNull = (user_id) => {
        alert(`${usersObj[user_id].name} didn't select any option, Send him a reminder`)
    }

    return (
            <div className={`m_const_option ${props.option}_box`}>
                <p className={props.option} style={{fontSize:10,margin:0}}>{props.option}: </p>
                <AvatarGroup max={8}>
                    {props.employees.map((emp, index) =>
                        <UserAvatar key={index} emp={emp} onClick={onClick} />
                    )}
                </AvatarGroup>
            </div>
    )
}

export default MConstraintsOption


const UserAvatar = (props) => {
    const { emp, onClick } = props;
    const { usersObj } = useContext(AppContext);
    const noCommentStyle = {
        bgcolor: usersObj[emp.user_id].color,
        opacity:0.6, 
        width: 25,
        height: 25,
        fontSize: 12,
        transition: 'z-index 0.2s',
        '&:hover': {
            zIndex: 1,
            opacity: 1
        }
    }
    const commentStyle = {
        border: '3px dashed black',
        animation: 'rippleA 1.2s infinite',
        '@keyframes rippleA': {
            '0%': {
                border: '1px dashed black'
            },
            '50%': {
                border: '2px dashed black'
            },
            '100%': {
                border: '1px dashed black'
            }
        }
    }

    return (
        <Tooltip title={emp.note || ''}>
            <Avatar
                // key={index}
                onClick={() =>  onClick(emp.user_id)}
                sx={[noCommentStyle, emp.note ? commentStyle : {}]}
            >
                {usersObj[emp.user_id].avatar_name}
            </Avatar>
        </Tooltip>
    )
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