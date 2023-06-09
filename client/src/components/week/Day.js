import {getDateString} from "../../utils/week_utils";
import MConstraintsShift from "./mConstraints/MConstraintsShift";
import ScheduleShift from "./schedule/ScheduleShift";
import './Week.css'
import ConstraintsShift from "./constraints/ConstraintShift";

const Day = (props) => {
    const { type, day, date, handleShiftClick, shiftFormat } = props;
    
    // const data = dayData.data;
    // const date = dayData.date
    // console.log('Day component data, date=>',data,date);
    const dayList = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat'];
    const dateString = getDateString(date,false);
    const month = date.getMonth();
    const datenum = date.getDate();
    console.log('month=>',month,'datenum=>',datenum);
    
    const handleClick = () => {
        handleShiftClick()
    }

    return (
        <div className='colunm'>
            <div className='cell header'>
                <p>
                    <span style={{fontWeight:'bold'}}>{dayList[day]}</span>
                    <span> / {month}-</span>
                    <span style={{fontWeight:'bold'}}>{datenum}</span>
                </p>
        </div>
            {type === 'schedule' ?
            [0,1,2].map(part=> <ScheduleShift key={part} date={date} part={part} handleClick={handleClick} shiftFormat={shiftFormat} />)
            : type === 'constraints' ?
            [0,1,2].map(part=><ConstraintsShift key={part} date={date} part={part} handleClick={handleClick} shiftFormat={shiftFormat} />)
            : [0,1,2].map(part=><MConstraintsShift key={part} date={date} part={part} handleClick={handleClick} shiftFormat={shiftFormat} />)
        }
        </div>
        
    )
}
export default Day;