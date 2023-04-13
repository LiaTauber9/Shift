import { shiftsTime } from "../config/shiftsConfig"

export const getWeekTemplate = (weekDates,shiftDataTemplate='')=>{
    const week = []
        for (let i = 0; i < 7; i++) {
            const dayData = []
            for (let i = 0; i < 3; i++) {
                dayData.push(shiftDataTemplate)
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

export const getWeekDates = (weekIndex)=>{
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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  export const getDateString = (date,addYear=true,id=false) => {
    const joinSimbol = id ? '' : '-'
    if(!addYear){
        return [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-');
    }
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join(joinSimbol);
  }

export const getShiftId = (date,part,user_id='')=>{
    return  `${getDateString(date, true, true)}${part}${user_id}`
}

export const getScheduleRow = (date,part,status,user_id=null,start=null,end=null) => {
    const start_at = start || shiftsTime[part].start_at;
    const end_at = end || shiftsTime[part].end_at
    return {
        id: getShiftId(date,part),
        user_id,
        date: getDateString(date),
        day: date.getDay(),
        part, start_at, end_at,status
    } 
}

