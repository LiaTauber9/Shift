export const WeekIndex = (date)=>{
    const month = date.getMonth();
    const year = date.getYear();
    const first = new Date(year,month,1);
    const gap = first.getDay() -1;
    const date_with_gap = date.getDate() + gap;

    return date_with_gap / 7;   
}

const toHours = (milisec)=>{
    return Number((milisec / 3600000).toFixed(1))
}

export const ratedHours = (shift)=>{
    const {date, day, start_at, end_at} = shift;
    let startTime = new Date(date + "T" + start_at).getTime();

    let endTime = new Date(date + "T" + end_at).getTime();
    if(startTime > endTime){
        const curDate = new Date(date);
        endTime = new Date(date + "T" + end_at).setDate(curDate.getDate()+1);
       }

    const shiftTime = endTime - startTime;
    const eightHours = 28800000;
    const extraTime = shiftTime > eightHours ? startTime + eightHours : null;
    let regular = shiftTime<eightHours ? toHours(shiftTime) : 8;
    let extra = extraTime ? toHours(shiftTime) - 8 : 0;
    let restRegular = 0;
    let restExtra = 0;


    const rateDay5 = ()=>{
        const restStart = new Date(date + 'T16:00:00').getTime();
        if(endTime > restStart){
            console.log('startTime  <  restStart  <  endTime');
                 // startTime  <  restStart  <  endTime
            if(extraTime){      
                if(extraTime < restStart){          // startTime  < extraTime  <  restStart  <  endTime 
                    restExtra = toHours(endTime - restStart);
                    extra = toHours(restStart - extraTime);
                    regular = 8;
                }else{         //startTime  <  restStart  < extraTime  <  endTime
    
                    regular = toHours(restStart - startTime);
                    restRegular = toHours(extraTime - restStart);
                    restExtra = toHours(endTime - extraTime);
                    extra = 0;
                }
            }else{    // startTime  <  restStart  <  endTime
                regular = toHours(restStart - startTime);
                restRegular = toHours(endTime - restStart)
            }
        }else if(extraTime){
            regular = 8;
            extra = toHours(shiftTime - eightHours);    
        }
    }
    
    const rateDay6 = ()=>{
        const restEnd = new Date(date + 'T22:00:00').getTime();
                if(endTime > restEnd){   // startTime  <  restEnd  <  endTime
                    if(extraTime){
                        if(extraTime > restEnd){   //startTime  <  restEnd  < extraTime  <  endTime
                            extra = toHours(endTime - extraTime);
                            regular = toHours(extraTime-restEnd);
                            restRegular = toHours(restEnd - startTime);
                        }else{      // startTime  < extraTime  <  restEnd  <  endTime
                            extra = toHours(endTime - restEnd);
                            restExtra = toHours(restEnd - extraTime);
                            restRegular = 8;
                            regular = 0;
                        }
                    }else{    // startTime  <  restEnd  <  endTime
                        regular = toHours(endTime - restEnd);
                        restRegular = toHours(restEnd - startTime)
                    }
                }else{     // startTime  <  endTime  < restEnd
                    regular = 0;
                    restRegular = 8;
                }
         
    }


    if(day > 4){
        if(day === 5 ){
            rateDay5();    
        }else{
            rateDay6();
        } 
    }

return {regular,extra,restRegular,restExtra}

}

