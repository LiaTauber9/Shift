import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext, WeekContext } from '../../../App';
import Week from '../Week';
import {getWeekDates, getDateString} from '../../../utils/week_utils';
// import { shiftsTime } from '../../../config/shiftsConfig.js';

const Schedule = () => {
    const { user } = useContext(AppContext);
    const { scheduleObj } = useContext(WeekContext);
    
    const [displayedWeek, setDisplayedWeek] = useState(0);
    const [isPost, setIsPost] = useState(false);
    const [msg, setMsg] = useState(null);
    const [isAllUsers, setIsAllUsers] = useState(true);

    const navigate = useNavigate();


    const getSchedule = async () => {
        const weekDates = getWeekDates(displayedWeek);
        const date_start = getDateString(weekDates[0])
        const date_end = getDateString(weekDates[6])
        try {
            const { data } = await axios.get('/schedule', {
                params: {
                    date_start,
                    date_end,
                }
            })
            console.log(data);
            if (data.length > 1) {
                data.forEach(shift => scheduleObj[shift.id] = shift);
                setIsPost(true);
            } else {
                setMsg('The Schedule has not yet been posted')
                // setDataFromDB(data);
                // setWeek(data);
            }

        } catch (e) { console.log('getSchedule error=>', e) }
    }

    
    const changeDisplayedWeek = () => {
        setIsPost(false);
        const week = displayedWeek === 0 ? 1 : 0;
        setDisplayedWeek(week)
    }

    useEffect(() => {
        if(!user){
            navigate('/login')
        }else{
            getSchedule();
        }
    }, [displayedWeek])



    return (
        <div>
            <h1>Schedule</h1>
            {
                isPost ?
                    <div>
                        <Week type='schedule' initWeek={getWeekDates(displayedWeek)} handleShiftClick={null} shiftFormat={{isAllUsers}} />
                        <Button onClick={()=>setIsAllUsers(!isAllUsers)}>{
                            isAllUsers ? 'My Schedule' : 'All Schedule'
                        }</Button>
                    </div>
                :  <h1>{msg || ''}</h1>
            }

            <Button onClick={changeDisplayedWeek}>{
                displayedWeek === 0 ? 'Next Week' : 'This Week'
            }</Button>
        </div>
    )
}

export default Schedule;





// const [weekSchedule, setWeekSchedule] = useState([]);
// const [dataFromDB, setDataFromDB] = useState([]);
// const createWeek = () => {
    //     const weekDates = getWeekDates(displayedWeek);
    //     const week = []
    //     for (let i = 0; i < 7; i++) {
    //         const data = shiftsTime.map(shift=>{return {...shift, user_id:null}})
    //         const day = {
    //             date: weekDates[i],
    //             data: data
    //         }
    //         week.push(day)
    //     }
    //     console.log(week);
    //     return week
    // }

    // const setWeek = (data) => {
    //     const week = createWeek();
    //     for (let row of data) {
    //         week[row.day].data[row.part].user_id = row.user_id
    //     }
    //     setWeekSchedule(week);
    // }


    // const changeDisplayedUser = () => {
    //     const data = isAllUsers ? dataFromDB.filter(shift => shift.user_id === user.id) : dataFromDB;
    //     setIsAllUsers(!isAllUsers);
    //     setWeek(data);
    // }
