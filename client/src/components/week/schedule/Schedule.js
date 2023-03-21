import { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../../../App.js'
import Week from '../Week';
import getWeekDates from '../../../utils/getWeekDates';
import getDateString from '../../../utils/getDateString';
import { shiftsTime } from '../../../config/shiftsConfig.js';

const Schedule = () => {
    const { user } = useContext(AppContext);
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [displayedWeek, setDisplayedWeek] = useState(0);
    const [isPost, setIsPost] = useState(true);
    const [isAllUsers, setIsAllUsers] = useState(true);
    const [dataFromDB, setDataFromDB] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login')
        }else{
            getSchedule();
        }
    }, [displayedWeek])


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
            if (data.length < 1) {
                setIsPost(false);
            } else {
                setIsPost(true);
                setDataFromDB(data);
                setWeek(data);
            }

        } catch (e) { console.log('getSchedule error=>', e) }
    }

    const createWeek = () => {
        const weekDates = getWeekDates(displayedWeek);
        const week = []
        for (let i = 0; i < 7; i++) {
            const data = shiftsTime.map(shift=>{return {...shift, user_id:null}})
            const day = {
                date: weekDates[i],
                data: data
            }
            week.push(day)
        }
        console.log(week);
        return week
    }

    const setWeek = (data) => {
        const week = createWeek();
        for (let row of data) {
            week[row.day].data[row.part].user_id = row.user_id
        }
        setWeekSchedule(week);
    }

    const changeDisplayedWeek = () => {
        setIsPost(true);
        const week = displayedWeek === 0 ? 1 : 0;
        setDisplayedWeek(week)
    }

    const changeDisplayedUser = () => {
        const data = isAllUsers ? dataFromDB.filter(shift => shift.user_id === user.id) : dataFromDB;
        setIsAllUsers(!isAllUsers);
        setWeek(data);
    }

    const handleShiftClick = () => { }

    return (
        <div>
            <h1>Schedule</h1>
            {
                !isPost ? <h1>The Schedule has not yet been posted</h1>
                    : <div>
                        <Week type='schedule' initWeek={weekSchedule} handleShiftClick={handleShiftClick} />
                        <Button onClick={changeDisplayedUser}>{
                            isAllUsers ? 'My Schedule' : 'All Schedule'
                        }</Button>
                    </div>
            }

            <Button onClick={changeDisplayedWeek}>{
                displayedWeek === 0 ? 'Next Week' : 'This Week'
            }</Button>
        </div>
    )
}

export default Schedule;