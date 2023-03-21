import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';
import Day from './Day';
import './Week.css'

const Week = (props) => {
    const { type, initWeek, handleShiftClick } = props;
    const { user } = useContext(AppContext);
    console.log('week component initWeek=>',initWeek);


    return (
        <div className='table'>
            {
                initWeek.map((day,index)=>
                    <Day 
                    key={index} 
                    type={type} 
                    day={index} 
                    dayData={day} 
                    handleShiftClick={handleShiftClick} 
                    />
                )
            }
        </div>
    )
}

export default Week