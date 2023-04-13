import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../../App';
import { ManagerContext } from '../../../App';
import MConstraintsOption from './MConstraintsOption';
import '../Week.css';
import { Input, TextField, Stack } from '@mui/material';
import getShiftId from '../../../utils/getShiftId';
import getDateString from '../../../utils/getDateString';
import './MConstraints.css';


const MConstraintsShift = (props) => {
    const { part, data, date, changeOption } = props;
    const { constraints, schedule, time } = data;
    const id = schedule.user_id === '' ? 'empty' : schedule.user_id
    // console.log(schedule.user_id==='',id);
    const [selected, setSelected] = useState
        (schedule.user_id);
    const [start_at, setStart_at] = useState(time.start_at)
    const [end_at, setEnd_at] = useState(time.end_at)
    const [fullConstraints, setFullConstraints] = useState(constraints);
    const [color, setColor] = useState('');
    const [shiftId] = useState(getShiftId(date, part));

    const options = ['open', 'favorite', 'null', 'close'];


    const { users, usersObj } = useContext(AppContext);
    const { allScheduleData, upsertScheduleData } = useContext(ManagerContext)
    const activeUsers = users.filter(user => user.active);
    // console.log('usersObj=>',usersObj,'selected=>',selected,'usersObj["empty"].name=>',usersObj['empty'].name,'schedule.user_id=>',schedule.user_id==='');

    const addNullConstraint = () => {
        const exist = [];
        for (let option in constraints) {
            for (let user of constraints[option]) {
                exist.push(user.user_id);
            }
        }
        // console.log('exist=>',exist);
        const activeUsersId = activeUsers.map(user => user.id)
        const nullUsersId = activeUsersId.filter(user => !exist.includes(user))
        // console.log('nullUsersId=>',nullUsersId);
        const nullUsers = nullUsersId.map(user => { return { user_id: user, note: null } })
        constraints.null.push(...nullUsers)
        setFullConstraints(constraints)
    }

    const onSelect = (user_id) => {
        setSelected(user_id);
        handleChange(user_id, start_at, end_at)
    }

    const changeStartTime = (e) => {
        setStart_at(e.target.value)
        handleChange(selected, e.target.value, end_at)
    }

    const changeEndTime = (e) => {
        setEnd_at(e.target.value)
        handleChange(selected, start_at, e.target.value)
    }


    const handleChange = (selected, start_at, end_at) => {
        console.log('changeOption=>', { part, user_id: selected, start_at, end_at });
        changeOption({ part, user_id: selected, start_at, end_at });
        upsertShift(selected,start_at,end_at);
    }

    const sendWhatsapp = (emp) => {
        props.sendWhatsapp(emp, part)
    }

    const upsertShift = async (userId,start_at,end_at) => {
        const user_id = userId || null
        console.log(user_id);
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
        } catch (e) {
            console.log('upsertSchedule error=>', e)
        }
    }

        useEffect(addNullConstraint, []);



        useEffect(() => {
            if (usersObj[selected]) {
                setColor(usersObj[selected].color)
            } else {
                setColor('')
            }
        }, [selected])

        // MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root

        // MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input

        // .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root

        return (
            <div className={`cell part`} style={{ height: 300 }}>
                {/* <TextField className='my-color'
                sx={{
                    '& .MuiInputBase-root': {
                        color: 'red',
                        height:20
                      },
                }}
                type='time' value={start_at} onChange={changeStartTime} inputProps={{ step: 300 }} />
                <TextField style={{ height: 40 }} label='' type='time' value={end_at} onChange={changeEndTime} inputProps={{ step: 300 }} /> */}
                {
                    [start_at,end_at].map((time,index)=>
                    <TextField className='my-color'
                    sx={{
                        '& .MuiInputBase-root': {
                            height:20,
                            margin:1
                          },
                    }}
                    key={index} type='time' value={time} onChange={changeStartTime} inputProps={{ step: 300 }} />
                    )
                }

                <h3 className='m_shift_selected' onClick={() => onSelect(null)} style={{ backgroundColor: color }}>{usersObj[selected] ? usersObj[selected].name : ''}</h3>
                {/* <h3 className='m_shift_selected' onClick={() => onSelect(null)} style={{ backgroundColor: color }}>{selected ? usersObj[selected].name : ''}</h3> */}
                {
                    ['favorite','open'].map((option, index) => <MConstraintsOption key={index} option={option} employees={fullConstraints[option]} onSelect={onSelect} sendWhatsapp={sendWhatsapp} />)
                }
                <Stack direction="row" spacing={2}>

                    {
                        ['null', 'close'].map((option, index) => <MConstraintsOption key={index} option={option} employees={fullConstraints[option]} onSelect={onSelect} sendWhatsapp={sendWhatsapp} />)
                    }

                </Stack>


            </div>
        )

    }

    export default MConstraintsShift;