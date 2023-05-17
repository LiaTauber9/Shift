import { useContext, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext, WeekContext, ManagerContext } from '../../../App';
import {getWeekDates, getDateString, getWeekTemplate, getShiftId, getScheduleRow } from '../../../utils/week_utils';
import Week from '../Week';
import { shiftsTime } from '../../../config/shiftsConfig';
import '../Week.css';
import SideBar from './SideBar';

const MConstraints = (props) => {
    
    const navigate = useNavigate();

    const { user, users } = useContext(AppContext);
    const {mConstraintsObj, scheduleObj} = useContext(WeekContext);
    // const { allScheduleData, upsertScheduleData } = useContext(ManagerContext)

    // const [weekMConst, setWeekMConst] = useState(null);
    const [weekDates, setWeekDates] = useState(null)
    const [displayedWeek, setDisplayedWeek] = useState(1);
    const [shiftCounterObj, setShiftCounterObj] = useState(null);

    
    const getConstraintsSchedule = async () => {
        const dates = getWeekDates(displayedWeek);
        const fullDateStrings = dates.map(item => getDateString(item));
        const users_id = users.map(user=>user.id);
        const params = { status: 'all', user_id: users_id, date_start: fullDateStrings[0], date_end: fullDateStrings[6] }
        let constraints = null;
        let schedule = null;
        try {
            const data = await axios.post(
                '/constraints/m/get',
                params,
                { headers: { 'Content-Type': 'application/json' } }
            )


            console.log('mGetConstraints=>', data.status, data.data)
            constraints = data.data;
            console.log(constraints);
            data.data.forEach(constraint => {
                mConstraintsObj[constraint.id] = constraint
            });
            console.log('constraintsObj=>',mConstraintsObj);
        } catch (e) { console.log(e) }

        try {
            const data = await axios.get(
                '/schedule',
                { params: params },
                { headers: { 'Content-Type': 'application/json' } }
            )

            console.log('mGetSchedule=>', data.data);
            data.data.forEach(shift => {
                scheduleObj[shift.id] = shift
            });
            console.log('scheduleObj=>', scheduleObj);
            schedule = data.data;
            countShifts();
        } catch (e) { console.log(e) }
        if(constraints && schedule){
            setWeekDates(dates)
        }
        
    }

    const countShifts = () => {
        if (users && users.length > 0) {
            const counter = {}
            users.forEach(user => counter[user.id] = []);

            for (const shift in scheduleObj) {
                const shiftObj = scheduleObj[shift]
                if (shiftObj.user_id != null && counter[shiftObj.user_id]) {
                    counter[shiftObj.user_id].push(shiftObj.id)

                }
            }
            console.log('scheduleObj,counter=>', scheduleObj, counter);
            setShiftCounterObj({ ...counter })
        }
    }

    const changeWeek = () => {
        const week = displayedWeek === 1 ? 0 : 1;
        setWeekDates(null);
        setDisplayedWeek(week)
    }

    const handleScheduleChange = ()=>{
        countShifts();
    }

    const postSchedule = async (status = 'save') => {
        const data = [];
        const scheduleToPost = {...scheduleObj};
        addNullSchedules(scheduleToPost);
        for (let schedule in scheduleToPost) {
            scheduleToPost[schedule].status = 'post';
            data.push(scheduleToPost[schedule])
        }
        try {
            const response = await axios.post('schedule/upsert', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('postSchedule=>', response.data);
             alert('Schedule posted successfully')
        } catch (e) {
            console.log('postSchedule error=>', e)
              alert("Some Error.... Couldn't post schedule")
        }
    }

    const addNullSchedules = (schedule)=>{
        for(const date of weekDates){
            for(let part = 0; part<3; part++){
                const shiftId = getShiftId(date,part);
                if(!schedule[shiftId]){
                    const row = getScheduleRow(date,part,'post');
                    schedule[shiftId] = row;
                }
            }
        }
    }



   
    

    useEffect(() => {
        if (!user.id) {
            navigate('/login')
        }
        else {
            getConstraintsSchedule();
        }
    }, [displayedWeek])

    return (        
            weekDates ?
            
            <div style={{ display: 'flex' }}>
        {/* <h1>Constreaints Table</h1> */}
        <SideBar shiftCounterObj={shiftCounterObj} style={{ width: '18vw' }} />
        <div className='m_table'>
            <div className='table'>
                <Week type='mConstraints'
                    initWeek={weekDates}
                    handleShiftClick={handleScheduleChange}
                    shiftFormat={null} />
            </div>
            {/* <Button onClick={changeWeek}>{displayedWeek === 0 ? 'Next Week' : 'This week'}</Button> */}
            <div>
                <Button onClick={() => postSchedule()}>Save and Post</Button>
            </div>
        </div>
    </div>

    : '' 
    
    )
}

export default MConstraints





 // let weekDates = getWeekDates(displayedWeek); //=>array of Date-Obj of next week
    // let fullDateStrings = weekDates.map(item => getDateString(item)); //=>array of String-format-date:'yyyy-mm-dd'
    // const allScheduleData = {};
    // const upsertScheduleData = {};
    

   

    //initialize constraints of week:
    // const createWeek = () => {
    //     const week = []
    //     for (let i = 0; i < 7; i++) {
    //         const dayData = []
    //         for (let i = 0; i < 3; i++) {
    //             dayData.push({
    //                 constraints: { open: [], close: [], favorite: [], null: [] },
    //                 schedule: { user_id: '', status: 'save' },
    //                 time: shiftsTime[i]
    //             })
    //         }
    //         const day = {
    //             date: weekDates[i],
    //             data: dayData,
    //         }
    //         week.push(day)
    //     }
    //     console.log(week);
    //     return week
    // }

    


    // const mSetWeek = (constrains, schedule) => {

    //     const week = createWeek();
    //     console.log('mConstrains=>', constrains);
    //     for (let r of constrains) {
    //         // if(r.option!=null){
    //         const { day, part, option, user_id, note } = r;
    //         // console.log('day, part, option, user_id', day, part, option, user_id);
    //         week[day].data[part].constraints[option].push({ user_id, note })
    //         // }
    //     }
    //     for (let r of schedule) {
    //         const { day, part, user_id, status, start_at, end_at } = r;
    //         // console.log('mSchedule=>day, part, user_id=>', day, part, user_id);
    //         week[day].data[part].schedule = { user_id, status }
    //         // if(start_at!=null){}
    //         const start = start_at || week[day].data[part].time.start_at;
    //         // console.log('start=>',start);
    //         const end = end_at || week[day].data[part].time.end_at;
    //         week[day].data[part].time = { start_at: start, end_at: end }

<<<<<<< HEAD
            setInitSchedule(schedule.data);
            console.log('mGetSchedule=>', schedule.data);
            schedule.data.forEach(shift => {
                allScheduleData[shift.id]=shift
            });
            console.log('allScheduleData=>',allScheduleData);
            countShifts();
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

    const countShifts = ()=>{
        counter = {}
        users.forEach(user=>counter[user.id]=[]);
       
        for(const shift in allScheduleData){
            const shiftObj = allScheduleData[shift]
            if(counter[shiftObj.user_id]){
                counter[shiftObj.user_id].push(shiftObj.id)
                
            }
        }
        console.log('allScheduleData,counter=>',allScheduleData,counter);
        setShiftCounterObj(counter)
    }
=======
    //     }
    //     console.log('mSetWeek=>', week);
    //     setWeekMConst(week)
    // }
>>>>>>> context2

    





    //update changes in table:
    // const handleShiftClick = (data) => {
    //     console.log('handleShiftClick data =>', data);
    //     const { day, part, user_id, start_at, end_at } = data;
    //     // console.log('setDayConstraints=>',dayIndex,constaintsList);
    //     const scheduleId = `${getDateString(weekDates[day], true, true)}${part}`;
    //     console.log('scheduleId=>', scheduleId);
    //     const newShiftSchedule = { id: scheduleId, date: fullDateStrings[day], day, part, user_id, start_at, end_at, status: 'save' }
    //     console.log('handleShiftClick/manager/newShiftSchedule=>', newShiftSchedule);
    //     upsertScheduleData[newShiftSchedule.id] = newShiftSchedule;
    //     allScheduleData[newShiftSchedule.id] = newShiftSchedule;
    //     console.log(allScheduleData);
    //     countShifts();
    //     console.log('upsertScheduleData after update=>', upsertScheduleData);
    // }

    


    


        // if (status === 'post') {
        //     data.forEach(shift => shift.status = 'post')
            // for (let schedule of initSchedule) {
            //     if (!upsertScheduleData[schedule.id]) {
            //         data.push(schedule)
            //     }
            // }
            // for (let schedule of data) {
            //     schedule.status = 'post'
            // }
            // console.log('saveSchedule post =>', data);
        //     msg = 'The shift schedule has been saved and posted successfully'
        // }
        // console.log('data=>', data);
        // try {
        //     const response = await axios.post('schedule/upsert', data, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     alert(msg)
        //     console.log('upsertSchedule=>', response.data);
        // } catch (e) {
        //     console.log('upsertSchedule error=>', e)
        // }
    




