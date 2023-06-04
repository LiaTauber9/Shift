import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext, WeekContext } from '../../../App';
import MConstraintsOption from './MConstraintsOption';
import '../Week.css';
import { TextField, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MCAcordion, MCAccordionSummary, MCAccordionDetails } from './MConstraintsAcordion';
import {getShiftId, getDateString} from '../../../utils/week_utils';
import { shiftsTime } from '../../../config/shiftsConfig';
import './MConstraints.css';


const MConstraintsShift = (props) => {

    const { part, date, handleClick } = props;
    const { users, usersObj } = useContext(AppContext);
    const { mConstraintsObj, scheduleObj} = useContext(WeekContext);

    const [shiftId] = useState(getShiftId(date,part));
    const [defaultTime] = useState({
        start_at:shiftsTime[part].start_at,
        end_at:shiftsTime[part].end_at
    })
    const [time, setTime] = useState(defaultTime);
    const [selected, setSelected] = useState({
        user_id:null,
        name: null,
        color:null,
    });
    const [constraints, setConstraints]= useState(null);
   

    const initConstraints = ()=>{
        const constraints = {};
        const options = ['favorite','open','unselected','close'];
        options.forEach(option=>constraints[option]=[])
        for(const user of users){
            const id = user.id+shiftId;
            const row = mConstraintsObj[id]
            if(row){
                const option = row.option || 'unselected';
                const {user_id,note} = row; 
                // console.log("option,constraints[option]=>",option,constraints[option]);
                constraints[option].push({user_id,note});
            }else{
                constraints.unselected.push({user_id:user.id,note:null})
            }
        }
        console.log(constraints);
        setConstraints(constraints)
    }

    const initSchedule = ()=>{
        if(scheduleObj[shiftId]){
            const {user_id,start_at,end_at} = scheduleObj[shiftId]
            const {name, color} = usersObj[user_id || 'empty']; 
            setSelected({user_id,name,color});
            setTime({start_at,end_at});
        }
    }

    const setTimeStyle = (timeKey,timeVal)=>{
        const defaultStyle = {
                height:20,
                marginButtom:3,
        }
        const changeStyle =  {...defaultStyle,background:'rgb(217, 217, 209)'}
        const match = defaultTime[timeKey]===timeVal;
        return { '& .MuiInputBase-root': match ? defaultStyle : changeStyle,
        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{padding:0.4},
        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{fontSize:11},
        '& .css-1x5jdmq':{fontSize:'11px',padding:'1px'} 
    }         
        // object for sx property => 
        //{
        //     '& .MuiInputBase-root': {
        //         height:20,
        //         margin:1,
        //         background:'rgb(217, 217, 209)'  // ? optional 
        //       },
        // }      
    }

    const changeTime = (e, key)=>{
        const prevTime = {...time};
        console.log(prevTime);
        const newTime = {...time, [key]:e.target.value};
        setTime(newTime);
        console.log('newTime=>',newTime);
        const {start_at,end_at} = newTime;
        const {user_id} = selected;
        upsertShift(user_id,start_at,end_at)
        .then(res=>{
            if(res==='error'){
                setTime(prevTime);
            }else{
                scheduleObj[shiftId] = res;
            }
        })
        .catch(e=>{
            console.log(e);
            console.log(prevTime);
            
        })
    }

    const onSelect = (user_id)=>{
        const prevSelected = {...selected};
        const {start_at,end_at} = time;
        const {name,color} = usersObj[user_id || 'empty'];
        setSelected({user_id,name,color});
        console.log(user_id);
        upsertShift(user_id,start_at,end_at)
        .then(res=>{
            if(res==='error'){
                setSelected(prevSelected)
            }else{
                scheduleObj[shiftId] = res;
                handleClick();
            }
        })
    }

    const upsertShift = async (user_id,start_at,end_at) => {
        const shift = {
            id: shiftId,
            user_id,
            date: getDateString(date),
            day: date.getDay(),
            part, start_at, end_at
        }
        try {
            const response = await axios.post('schedule/upsert', [shift], {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('upsertSchedule=>', response.data);
            return shift;
        } catch (e) {
            console.log('upsertSchedule error=>', e)
            alert("Couldn't save changes, Please check your conection")
            return 'error'
        }
    }

    useEffect(()=>{
        initConstraints();
        initSchedule();
    },[])
       
        return( 
                constraints ?
               <div className='cell m_constraints_cell'>
                <div className='part m_constraints_part' >
                <div className='time_box'>
                {
                    ['start_at', 'end_at'].map((timeKey,index)=>
                    <TextField className='my-color'
                    sx={setTimeStyle(timeKey, time[timeKey])}
                    key={index} type='time' value={time[timeKey]} onChange={(e)=>changeTime(e,timeKey)} inputProps={{ step: 300 }} />
                    )
                }
                </div>
                
                 <h3 className='shift_selected' onClick={() => onSelect(null)} style={{ backgroundColor: selected.color }}>{selected.name}</h3>
    
                {
                    ['favorite','open'].map((option, index) => <MConstraintsOption key={index} option={option} employees={constraints[option]} onSelect={onSelect} />)
                }
                </div>
                <div className='acordion_box'>
               <MCAcordion direction="up">
                <MCAccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                 />
                <MCAccordionDetails>
                    
                        {
                            ['unselected', 'close'].map((option, index) => <MConstraintsOption key={index} option={option} employees={constraints[option]} onSelect={onSelect} />)
                        }
                   
                </MCAccordionDetails>
               </MCAcordion>
               </div>

                {/* <Stack direction="row" spacing={2} justifySelf={'baseline'}>

                    {
                        ['unselected', 'close'].map((option, index) => <MConstraintsOption key={index} option={option} employees={constraints[option]} onSelect={onSelect} />)
                    }

                </Stack>  */}

            </div>
             
            :
            null
        )
            
       

    }

    export default MConstraintsShift;





//     <Accordion className='acordion_null_close_header' sx={{
//         '& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root':{
//             minHeight:12,
//             height:12,
//             display:'flex',
//             flexDirection:'column',
//         },
//         '& .css-i4bv87-MuiSvgIcon-root':{fontSize:13},
//         '& .css-1xsiedi-MuiButtonBase-root-MuiAccordionSummary-root':{minHeight:12,height:12},
//         '& .css-v1e1aq-MuiPaper-root-MuiAccordion-root':{height:12,height:12}
//     }}>
//     <AccordionSummary
//       expandIcon={<ExpandMoreIcon />}
//       aria-controls="panel1a-content"
//       id="panel1a-header"
//       sx={{
//         '& .css-2aanrh-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded':{minHeight:0, height:0},
//         '& .css-eg79fp-MuiButtonBase-root-MuiAccordionSummary-root':{minHeight:0, height:0}
//       }}
      
//     >
//       {/* <Typography>Accordion 1</Typography> */}
//     </AccordionSummary>
//     <AccordionDetails sx={{
//         '& .css-15v22id-MuiAccordionDetails-root':{padding:'16px 0px', display:'flex',flexDirection:'column', gap:7}
//     }}>
//     {
//             ['unselected', 'close'].map((option, index) => <MConstraintsOption key={index} option={option} employees={constraints[option]} onSelect={onSelect} />)
//         }
//     </AccordionDetails>
//   </Accordion>






      // const { part, data, date, changeOption } = props;
    // const { constraints, schedule, time } = data;
    // const id = schedule.user_id === '' ? 'empty' : schedule.user_id
    // console.log(schedule.user_id==='',id);
        
    // const [start_at, setStart_at] = useState(time.start_at)
    // const [end_at, setEnd_at] = useState(time.end_at)
    // const [fullConstraints, setFullConstraints] = useState(constraints);
    

    


    

    // const { allScheduleData, upsertScheduleData } = useContext(ManagerContext)
    // const activeUsers = users.filter(user => user.active);
    // console.log('usersObj=>',usersObj,'selected=>',selected,'usersObj["empty"].name=>',usersObj['empty'].name,'schedule.user_id=>',schedule.user_id==='');

    // const addNullConstraint = () => {
    //     const exist = [];
    //     for (let option in constraints) {
    //         for (let user of constraints[option]) {
    //             exist.push(user.user_id);
    //         }
    //     }
    //     // console.log('exist=>',exist);
    //     const activeUsersId = activeUsers.map(user => user.id)
    //     const nullUsersId = activeUsersId.filter(user => !exist.includes(user))
    //     // console.log('nullUsersId=>',nullUsersId);
    //     const nullUsers = nullUsersId.map(user => { return { user_id: user, note: null } })
    //     constraints.null.push(...nullUsers)
    //     setFullConstraints(constraints)
    // }

    // const onSelect = (user_id) => {
    //     setSelected(user_id);
    //     handleChange(user_id, start_at, end_at)
    // }

    // const changeStartTime = (e) => {
    //     setStart_at(e.target.value)
    //     handleChange(selected, e.target.value, end_at)
    // }

    // const changeEndTime = (e) => {
    //     setEnd_at(e.target.value)
    //     handleChange(selected, start_at, e.target.value)
    // }


    // const handleChange = (selected, start_at, end_at) => {
    //     console.log('changeOption=>', { part, user_id: selected, start_at, end_at });
    //     changeOption({ part, user_id: selected, start_at, end_at });
    //     upsertShift(selected,start_at,end_at);
    // }

    // const sendWhatsapp = (emp) => {
    //     props.sendWhatsapp(emp, part)
    // }

    // const upsertShift = async (userId,start_at,end_at) => {
    //     const user_id = userId || null
    //     console.log(user_id);
    //     const shift = {
    //         id: shiftId,
    //         user_id,
    //         date: getDateString(date),
    //         day: date.getDay(),
    //         part, start_at, end_at
    //     }
    //     try {
    //         const response = await axios.post('schedule/upsert', [shift], {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         console.log('upsertSchedule=>', response.data);
    //     } catch (e) {
    //         console.log('upsertSchedule error=>', e)
    //     }
    // }

    //     useEffect(addNullConstraint, []);



    //     useEffect(() => {
    //         if (usersObj[selected]) {
    //             setColor(usersObj[selected].color)
    //         } else {
    //             setColor('')
    //         }
    //     }, [selected])

        // MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root

        // MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input

        // .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root