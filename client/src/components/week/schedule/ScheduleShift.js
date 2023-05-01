import '../Week.css';
import { useContext, useEffect, useState} from 'react';
import { AppContext, WeekContext } from '../../../App';
import {getShiftId, getDateString} from '../../../utils/week_utils';
import { shiftsTime } from '../../../config/shiftsConfig';


const ScheduleShift = (props)=>{
    const { part, date, shiftFormat } = props;
    const {user, usersObj} = useContext(AppContext);
    const {scheduleObj} = useContext(WeekContext);
    const [shiftId] = useState(getShiftId(date,part));
    const [shift, setShift] = useState({
        id: shiftId,
        user_id:null,
        date: getDateString(date),
        day: date.getDay(),
        part,
        start_at:shiftsTime[part].start_at,
        end_at:shiftsTime[part].end_at,
        name:null,
        color:null   
    });

    const setTimeStyle = (start,end,color)=>{
        const defaultStart = shiftsTime[part].start_at;
        const defaultEnd = shiftsTime[part].end_at;            
        return  start == defaultStart && end == defaultEnd ? null : {border: `2px solid ${color}`};
        
    }

    const setTimeSpan = (timeKey,timeVal,user_id)=>{
        const defaultTime = shiftsTime[part][timeKey];
        const timeStr = timeVal.slice(0,5);
        const color = timeVal == defaultTime ? usersObj[user_id || 'empty'].color : user_id ? 'white' : 'red'
        return <span style={{color}}>{timeStr}</span>
    }

    useEffect(()=>{
        if(scheduleObj[shiftId]){
            const shiftFromDB = scheduleObj[shiftId]
            const {user_id} = shiftFromDB;
            const {name, color} = usersObj[user_id || 'empty'];
            setShift({...scheduleObj[shiftId],name,color})
        }
    },[])  
    
    const {user_id,name,color,start_at,end_at} = shift;
    const isDisplay = shiftFormat.isAllUsers || user_id == user.id;
    return(
        <div className={`cell part schedule_part`}  style={isDisplay ?{backgroundColor: `${color}90`}:null}  >
        {/* <div className={`cell part`}  style={isDisplay ?{backgroundColor: `${color}90`}:null} > */}
            {/* <div style={setTimeStyle(start_at,end_at,color)}>{start_at.slice(0,5)}-{end_at.slice(0,5)}</div> */}
            <div style={{color}}>
            {setTimeSpan('start_at',start_at,user_id)} - {setTimeSpan('end_at',end_at,user_id)}
            </div>
            <div>
                {
                    isDisplay ?
                    <h3 className='shift_selected' style={{ backgroundColor: color, border:0 }}>{name}</h3>   
                    : null 
                }               
            </div>            
        </div>
    )
}

export default ScheduleShift;





// const id = props.shiftData.user_id || 'empty';
    // console.log('id=>',id);
    
    // console.log('usersObj[id]=>',usersObj[id]);
    // const color = usersObj[id] ? usersObj[id].color : '#ffffff';
    
    


    // console.log("usersObj['empty']=>",usersObj[id]);
    // console.log("u.name=>",user);
    // const color = user ? user.color+'60' : ''     
    // console.log('usersObj=>',usersObj);
    // console.log('name=>',name);
    // console.log('users=>',users);
    // console.log('props=>',props);    
    // useEffect(()=>{
    // })