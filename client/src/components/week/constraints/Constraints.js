import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../../../App'
import getWeekDates from '../../../utils/getWeekDates';
import getDateString from '../../../utils/getDateString';
import Week from '../Week';
import '../Week.css';

const Constraints = (props) => {
    const navigate = useNavigate();

    const { user } = useContext(AppContext);
    const [weekConst, setWeekConst] = useState([]);
    const [displayedWeek, setDisplayedWeek] = useState(1)


    let weekDates = getWeekDates(displayedWeek); //=>array of Date-Obj of next week
    let fullDateList = weekDates.map(item => getDateString(item));; //=>array of String-format-date:'yyyy-mm-dd'
    const upsertConstraintsData = {};

    //initialize constraints of week:
    const getConstraints = async () => {
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
            setWeek(response.data)
        } catch (e) { console.log(e) }
    }

    const createWeek = () => {
        const week = []
        for (let i = 0; i < 7; i++) {
            const day = {
                date: weekDates[i],
                data: [
                    { option: null, note: null }, { option: null, note: null }, { option: null, note: null }
                ],
            }
            week.push(day)
        }
        console.log(week);
        return week
    }

    const setWeek = (constraintsFromDB) => {
        const week = createWeek(); //array of 7 objects - (for each day of week) {date:Date, constraints:Array schedule:Array} 

        for (const row of constraintsFromDB) {
            const { day, part, option, note } = row;
            week[day].data[part] = { option, note }
        }
        console.log('setConstraintsWeek=>', week);
        setWeekConst(week);
    }


    //update changes in table:
    const handleShiftClick = (data) => {
        console.log('handleShiftClick data=>', data);
        const { day, part } = data;
        // console.log('setDayConstraints=>',dayIndex,constaintsList);

        const constraintId = `${user.id}${getDateString(weekDates[day], true, true)}${part}`;
        const newShiftConstraint = {
            ...data,
            id: constraintId, user_id: user.id, date: fullDateList[day]
        }
        upsertConstraintsData[constraintId] = newShiftConstraint;
    }

    const upsertConstraints = async () => {
        const data = [];
        for (let constraint in upsertConstraintsData) {
            data.push(upsertConstraintsData[constraint])
        }
        console.log('upsertConstraints=>', data);
        try {
            const response = await axios.post('constraints/upsert', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('upsertConstraints=>', response.data);
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

    return (<div>
        <h1>Constreaints Table</h1>
        <div className='table'>
            <Week type='constraints'
                initWeek={weekConst}
                handleShiftClick={handleShiftClick} />
        </div>

        <Button onClick={upsertConstraints}>Save</Button>
    </div>)
}

export default Constraints

