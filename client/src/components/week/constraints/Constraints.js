import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext, WeekContext } from '../../../App'
import {getWeekDates, getDateString} from '../../../utils/week_utils';
import Week from '../Week';
import '../Week.css';

const Constraints = (props) => {
    const navigate = useNavigate();

    const { user } = useContext(AppContext);
    const { constraintsObj, setConstraintsObj} = useContext(WeekContext);
    // const [weekConst, setWeekConst] = useState([]);
    const [displayedWeek] = useState(1);
    const [weekDates] = useState(getWeekDates(displayedWeek)); //=>array of Date-Obj of next week


    //initialize constraints of week:
    const getConstraints = async () => {
        const fullDateList = weekDates.map(item => getDateString(item));; //=>array of String-format-date:'yyyy-mm-dd'
        try {
            const response = await axios.get(
                '/constraints/get',
                {
                    params: {
                        user_id: user.id,
                        date_start: fullDateList[0], date_end: fullDateList[6]
                    }
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log('getConstraints=>', response.data)
            const constObj = {}
            for(const row of response.data){
                constObj[row.id] = row
            }
            setConstraintsObj(constObj)
                                   
        } catch (e) { 
            console.log(e);
            alert("Error... Cen't get your saved constraints") 
        }
    }

    const upsertConstraints = async () => {
        const data = [];
        for (let constraint in constraintsObj) {
            data.push(constraintsObj[constraint])
        }
        console.log('upsertConstraints=>', data);
        try {
            const response = await axios.post('constraints/upsert', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert('Your constraints were saved successfully')
            console.log('upsertConstraints=>', response.data.msg);
        } catch (e) {
            console.log('upsertConstraints error=>', e)
        }
    }

    useEffect(() => {
        if (!user.id) {
            navigate('/login')
        } else {
            console.log('user_id=>', user.id);
            getConstraints();
        }
    }, []);

    return (
       constraintsObj ?
    <div>
        <h1>Constreaints Table</h1>
        <div className='table'>
        <Week type='constraints'
            initWeek={weekDates}
            handleShiftClick={null}
            shiftFormat={null} />
        </div>

        <Button onClick={upsertConstraints}>Save</Button>
    </div>
    : null)
}

export default Constraints




 // let weekDates = getWeekDates(displayedWeek); //=>array of Date-Obj of next week
    // let fullDateList = weekDates.map(item => getDateString(item));; //=>array of String-format-date:'yyyy-mm-dd'
    // const upsertConstraintsData = {};

// const createWeek = () => {
    //     const week = []
    //     for (let i = 0; i < 7; i++) {
    //         const day = {
    //             date: weekDates[i],
    //             data: [
    //                 { option: null, note: null }, { option: null, note: null }, { option: null, note: null }
    //             ],
    //         }
    //         week.push(day)
    //     }
    //     console.log(week);
    //     return week
    // }

    // const setWeek = (constraintsFromDB) => {
    //     const week = createWeek(); //array of 7 objects - (for each day of week) {date:Date, constraints:Array schedule:Array} 

    //     for (const row of constraintsFromDB) {
    //         const { day, part, option, note } = row;
    //         week[day].data[part] = { option, note }
    //     }
    //     console.log('setConstraintsWeek=>', week);
    //     setWeekConst(week);
    // }


    //update changes in table:
    // const handleShiftClick = (data) => {
    //     console.log('handleShiftClick data=>', data);
    //     const { day, part } = data;
    //     // console.log('setDayConstraints=>',dayIndex,constaintsList);

    //     const constraintId = `${user.id}${getDateString(weekDates[day], true, true)}${part}`;
    //     const newShiftConstraint = {
    //         ...data,
    //         id: constraintId, user_id: user.id, date: fullDateList[day]
    //     }
    //     upsertConstraintsData[constraintId] = newShiftConstraint;
    // }

