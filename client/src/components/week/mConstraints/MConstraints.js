import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../../../App'
import getWeekDates from '../../../utils/getWeekDates';
import getDateString from '../../../utils/getDateString';
import Week from '../Week';
import { shiftsTime } from '../../../config/shiftsConfig';
import '../Week.css';

const MConstraints = (props) => {
    const navigate = useNavigate();

    const { user, users } = useContext(AppContext);
    const [weekMConst, setWeekMConst] = useState([]);
    const [initSchedule, setInitSchedule] = useState([]);
    const [displayedWeek, setDisplayedWeek] = useState(1)
    let activeUsers;
    let users_id;

   


    let weekDates = getWeekDates(displayedWeek); //=>array of Date-Obj of next week
    let fullDateStrings = weekDates.map(item => getDateString(item)); //=>array of String-format-date:'yyyy-mm-dd'
    const upsertScheduleData = {};
    const upsertConstraintsData = {};

    useEffect(() => {
        console.log('useEffect of displayWeek');
        weekDates = getWeekDates(displayedWeek);
        fullDateStrings = weekDates.map(item => getDateString(item));
        activeUsers = users.filter(user => user.active);
            users_id = activeUsers.map(user => user.id);
        getConstraintsSchedule();
    }, [displayedWeek])

    //initialize constraints of week:
    const createWeek = () => {
        const week = []
        for (let i = 0; i < 7; i++) {
            const dayData = []
            for (let i = 0; i < 3; i++) {
                dayData.push({
                    constraints: { open: [], close: [], favorite: [], null:[] },
                    schedule: { user_id: '', status: 'save' },
                    time:shiftsTime[i]
                })
            }
            const day = {
                date: weekDates[i],
                data: dayData,
            }
            week.push(day)
        }
        console.log(week);
        return week
    }

    const getConstraintsSchedule = async () => {
        const data = { status: 'all',user_id:users_id, date_start: fullDateStrings[0], date_end: fullDateStrings[6] }
        try {
            const constraints = await axios.post(
                '/constraints/m/get',
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )


            console.log('mGetConstraints=>', constraints.data)

            const schedule = await axios.get(
                '/schedule',
                {params:data},
                { headers: { 'Content-Type': 'application/json' } }
            )

            setInitSchedule(schedule.data);
            console.log('mGetSchedule=>', schedule.data)
            mSetWeek(constraints.data, schedule.data)
        } catch (e) { console.log(e) }
    }


    const mSetWeek = (constrains, schedule) => {

        const week = createWeek();
        console.log('mConstrains=>', constrains);
        for (let r of constrains) {
            // if(r.option!=null){
                const { day, part, option, user_id, note } = r;
            // console.log('day, part, option, user_id', day, part, option, user_id);
            week[day].data[part].constraints[option].push({user_id,note})
            // }
        }
        for (let r of schedule) {
            const { day, part, user_id, status, start_at, end_at } = r;
            // console.log('mSchedule=>day, part, user_id=>', day, part, user_id);
            week[day].data[part].schedule = { user_id, status }
            // if(start_at!=null){}
            const start = start_at || week[day].data[part].time.start_at;
            // console.log('start=>',start);
            const end = end_at || week[day].data[part].time.end_at;
            week[day].data[part].time = { start_at:start, end_at:end }

        }
        console.log('mSetWeek=>', week);
        setWeekMConst(week)
    }





    //update changes in table:
    const handleShiftClick = (data) => {
        console.log('handleShiftClick data =>',data);
        const { day, part, user_id, start_at, end_at } = data;
        // console.log('setDayConstraints=>',dayIndex,constaintsList);
        const scheduleId = `${getDateString(weekDates[day], true, true)}${part}`;
        console.log('scheduleId=>', scheduleId);
        const newShiftSchedule = { id: scheduleId, date: fullDateStrings[day], day, part, user_id, start_at, end_at, status: 'save' }
        console.log('handleShiftClick/manager/newShiftSchedule=>', newShiftSchedule);
        upsertScheduleData[newShiftSchedule.id] = newShiftSchedule;
        console.log('upsertScheduleData after update=>', upsertScheduleData);
    }

    const changeWeek = ()=>{
        const week = displayedWeek === 1 ? 0 : 1
        setDisplayedWeek(week)
    }


    const saveSchedule = async (status = 'save') => {
        const data = [];
        for (let schedule in upsertScheduleData) {
            data.push(upsertScheduleData[schedule])
        }
        if (status === 'post') {
            console.log('initSchedule=>', initSchedule);
            for (let schedule of initSchedule) {
                if (!upsertScheduleData[schedule.id]) {
                    data.push(schedule)
                }
            }
            for (let schedule of data) {
                schedule.status = 'post'
            }
            console.log('saveSchedule post =>', data);
        }
        try {
            const response = await axios.post('schedule/upsert', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('upsertSchedule=>', response.data);
        } catch (e) {
            console.log('upsertSchedule error=>', e)
        }
    }

    useEffect(() => {
        if (!user.id) {
            navigate('/login')
        }
            else{
            activeUsers = users.filter(user => user.active);
            users_id = activeUsers.map(user => user.id);
            console.log('activeUsers=>', activeUsers);
            console.log('user_id=>', users_id);
            getConstraintsSchedule();
            }
    }, []);

    return (<div>
        <h1>Constreaints Table</h1>
        <div className='table'>
            <Week type='mConstraints'
                initWeek={weekMConst}
                handleShiftClick={handleShiftClick} />
        </div>
        <Button onClick={changeWeek}>{displayedWeek===0? 'Next Week' : 'This week'}</Button>
        <div>
            {displayedWeek===1 ? 
             <Button onClick={saveSchedule}>Save</Button>
            : ''}
             <Button onClick={() => saveSchedule('post')}>Save and Post</Button>          
        </div>
        {/* {
            colorArray.map(color=>
            <div>
                <p style={{backgroundColor:color}}>color</p>
                <p style={{backgroundColor:`${color}50`}}>color</p>
                </div>
        )
        } */}
    </div>)
}

export default MConstraints

