const getWeekDates = (weekIndex)=>{
    const index = weekIndex * 7;
    const week = [];
    
    for(let i=0; i<7; i++){
        const current = new Date();
        const currDay = current.getDay();
        current.setDate((current.getDate() - currDay + index + i))
        week.push(current);
    }
    return week
}

export default getWeekDates;

