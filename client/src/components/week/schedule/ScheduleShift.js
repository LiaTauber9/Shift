import '../Week.css';
import { useContext, useEffect, useState} from 'react';
import { AppContext } from '../../../App';
import { getUsersObj, getName } from '../../../utils/users';


const ScheduleShift = (props)=>{
    const {start_at,end_at} = props.shiftData;
    const {users} = useContext(AppContext);
    const id = props.shiftData.user_id
    // const id = props.shiftData.user_id || 'empty';
    // console.log('id=>',id);
    
    const usersObj = getUsersObj(users);
    // console.log('usersObj[id]=>',usersObj[id]);
    const color = usersObj[id] ? usersObj[id].color : '#ffffff';
    
    


    // console.log("usersObj['empty']=>",usersObj[id]);
    // console.log("u.name=>",user);
    // const color = user ? user.color+'60' : ''     
    // console.log('usersObj=>',usersObj);
    // console.log('name=>',name);
    // console.log('users=>',users);
    // console.log('props=>',props);    
    // useEffect(()=>{
    // })

    return(
        <div className={`cell part`}  style={{backgroundColor:`${color}90`}} >
            <div>{start_at}-{end_at}</div>
            <div>
             {usersObj[props.shiftData.user_id] ? usersObj[props.shiftData.user_id].name : ''}
             </div>
        </div>
    )
}

export default ScheduleShift;