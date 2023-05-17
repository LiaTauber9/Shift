import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';
import Day from './Day';
import './Week.css'

const Week = (props) => {
    const { type, initWeek, handleShiftClick, shiftFormat } = props;
    const { user } = useContext(AppContext);
    console.log('week component initWeek=>',initWeek);


    return (
        <div className='table'>
            {
                initWeek.map((date,index)=>
                    <Day 
                    key={index} 
                    type={type} 
                    day={index} 
                    date={date} 
                    handleShiftClick={handleShiftClick}
                    shiftFormat={shiftFormat} 
                    />
                )
            }
        </div>
    )
}

export default Week