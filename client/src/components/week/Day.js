import getDateString from "../../utils/getDateString";
import MConstraintsShift from "./mConstraints/MConstraintsShift";
import ScheduleShift from "./schedule/ScheduleShift";
import './Week.css'
import ConstraintsShift from "./constraints/ConstraintShift";

const Day = (props) => {
    const { type, day, dayData, handleShiftClick } = props;
    const data = dayData.data;
    const date = dayData.date
    // console.log('Day component data, date=>',data,date);
    const dayList = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat'];
    const dateString = getDateString(date,false);
    
    const handleClick = (data) => {
        handleShiftClick({ ...data, day })
        console.log('Day handleClick data=>',data);
    }

    return (
        <div className='colunm'>
            <div className='cell header'>
            {dayList[day]} / {dateString}
        </div>
            {type === 'schedule' ?
            data.map((shift, index)=> <ScheduleShift key={index} part={index} shiftData={shift} handleClick={handleClick} />)
            : type === 'constraints' ?
            data.map((shift,index)=><ConstraintsShift key={index} part={index} data={shift} changeOption={handleClick} />)
            : data.map((shift, index)=><MConstraintsShift key={index} part={index} data={shift} changeOption={handleClick}/>)
        }
        </div>
        
    )


    // return (
    //     <div>
    //         {
    //             type === 'employee' ? data.map((shift, index)=>
    //                 <ConstraintsShift />
    //             )
    //             : type === 'manager' ? data.map((shift, index)=>
    //                 <MConstraintsShift />
    //             )
    //             : data.map((shift, index)=>
    //             <ScheduleShift />)
    //         }
    //     </div>
    // )
}
export default Day;