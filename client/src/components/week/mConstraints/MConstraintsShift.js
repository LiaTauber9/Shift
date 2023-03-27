import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../App';
import MConstraintsOption from './MConstraintsOption';
import { getUsersObj } from '../../../utils/users';
import '../Week.css';
import { Input, TextField } from '@mui/material';

const MConstraintsShift = (props)=>{
    const {part, data, changeOption} = props;
    const {constraints, schedule, time} = data;
    const [selected, setSelected] = useState
(schedule.user_id);
const [start_at, setStart_at] = useState(time.start_at)
const [end_at, setEnd_at] = useState(time.end_at)
    const [fullConstraints, setFullConstraints] = useState(constraints);
    const [color, setColor] = useState('');
    
    const options = ['open', 'favorite'];
    const acordions = ['null', 'close']

    const {users} = useContext(AppContext);
    const usersObj = getUsersObj(users);
    const activeUsers = users.filter(user=>user.active);

    const addNullConstraint = ()=>{
        const exist = [];
        for( let option in constraints){
                    for(let user of constraints[option]){
                        exist.push(user.user_id); 
                    }
        }
        // console.log('exist=>',exist);
        const activeUsersId = activeUsers.map(user=>user.id)
        const nullUsersId = activeUsersId.filter(user=>!exist.includes(user))
        // console.log('nullUsersId=>',nullUsersId);
        const nullUsers = nullUsersId.map(user=>{return {user_id:user, note:null}})
        constraints.null.push(...nullUsers)
        setFullConstraints(constraints)
    }

    const onSelect = (user_id)=>{
        setSelected(user_id);
        handleChange(user_id,start_at,end_at)
    }

    const changeStartTime = (e)=>{
        setStart_at(e.target.value)
        handleChange(selected,e.target.value,end_at)
    }

    const changeEndTime = (e)=>{
        setEnd_at(e.target.value)
        handleChange(selected,start_at,e.target.value)
    } 
    
    const handleChange = (selected,start_at,end_at) => {
        console.log('changeOption=>',{part,user_id:selected, start_at, end_at});
        changeOption({part,user_id:selected, start_at, end_at});
    } 

    const sendWhatsapp = (emp)=>{
        props.sendWhatsapp(emp,part)
    }

   useEffect(addNullConstraint,[]);

    useEffect(()=>{
        if(selected){
            setColor(usersObj[selected].color)
        }
    },[selected])

    return(
        <div className={`cell part`}style={{height:300}}>
            <TextField style={{height:40}} label='Start' type='time' value={start_at} onChange={changeStartTime} inputProps={{step:300}}/>
            <TextField style={{height:40}} label='End' type='time' value={end_at} onChange={changeEndTime} inputProps={{step:300}}/>
            <h3 className='m_shift_selected' onClick={()=>onSelect(null)} style={{backgroundColor:color}}>{selected ? usersObj[selected].name : ''}</h3>
            {
            options.map((option,index)=><MConstraintsOption option={options[index]} employees={fullConstraints[option]} onSelect={onSelect} sendWhatsapp={sendWhatsapp}/>)
            }
      </div>
    )
   
}

export default MConstraintsShift;