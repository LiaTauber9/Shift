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

const getTimes = (date,start_at,end_at)=>{
    console.log('getTimes = (date,start_at,end_at)=>' ,date,start_at,end_at);
    const startTime = new Date(date + "T" + start_at).getTime();

    let endTime = new Date(date + "T" + end_at).getTime();
    if(startTime > endTime){
        const curDate = new Date(date);
        endTime = new Date(date + "T" + end_at).setDate(curDate.getDate()+1);
       }
    return {startTime,endTime}
}

const eightHours = 28800000;

const getRatedHours = (date,start_at,end_at,restDay)=>{
    const {startTime,endTime} = getTimes(date,start_at,end_at)
    const shiftTime = endTime - startTime;
    const regular = shiftTime<eightHours ? toHours(shiftTime) : 8;
    const extra = shiftTime > eightHours ? toHours(shiftTime) - 8 : 0;
    const baseHours = {regular, extra, restRegular:0, restExtra:0};
    let changedRate;
    // console.log('getRatedHours=>',date,start_at,end_at,restDay);
    switch(restDay.type){
        case 'start': changedRate = start(startTime,endTime,restDay.restTime);break;
        case 'end': changedRate = end(startTime,endTime,restDay.restTime);break;
        case 'allDay': changedRate = allDay(startTime,endTime);break;
        default: changedRate = {}; 
    }
    return {...baseHours, ...changedRate}
}

const allDay = (startTime,endTime)=>{
    const shiftTime = endTime - startTime;
    const restExtra = shiftTime > eightHours ? toHours(shiftTime)-8 : 0;
    const restRegular = shiftTime > eightHours ? 8 : toHours(shiftTime);
    console.log('allDay=> restRegular, restExtra',restRegular, restExtra);
        return {regular:0, extra:0, restRegular, restExtra}
}

const start = (startTime,endTime,restStart)=>{
    // console.log('start=>',new Date(startTime), new Date(endTime), new Date(restStart))
    const extraTime = endTime - startTime > eightHours ? startTime + eightHours : null;
    console.log('extraTime=>', new Date(extraTime));
    if(endTime > restStart){
        console.log('startTime  <  restStart  <  endTime');
             // startTime  <  restStart  <  endTime
        if(extraTime){      
            if(extraTime < restStart){          // startTime  < extraTime  <  restStart  <  endTime 
                const restExtra = toHours(endTime - restStart);
                const extra = toHours(restStart - extraTime);
                console.log('start=> extra, restExtra=>',extra, restExtra);
                return {extra, restExtra}
            }else if(restStart < startTime){  //  restStart  < startTime  <  extraTime  <  endTime
                const restExtra = toHours(endTime - extraTime);
                console.log('start=> regular:0, extra:0, restRegular:8, restExtra=>', restExtra);
                return {regular:0, extra:0, restRegular:8, restExtra}
                }else{         //startTime  <  restStart  < extraTime  <  endTime
                    console.log('startTime  <  restStart  < extraTime  <  endTime');
                    const regular = toHours(restStart - startTime);
                    const restRegular = toHours(extraTime - restStart);
                    const restExtra = toHours(endTime - extraTime);
                    console.log('start=> regular, extra:0, restRegular, restExtra=>',regular, restRegular, restExtra);
                    return {regular, extra:0, restRegular, restExtra}
                }
        }else{ 
            if(restStart > startTime){   // startTime  <  restStart  <  endTime
                console.log('startTime  <  restStart  <  endTime');
                const regular = toHours(restStart - startTime);
                const restRegular = toHours(endTime - restStart)
                console.log('start=> regular,restRegular=>', regular,restRegular);
                return {regular,restRegular}
            }else{    //  restStart  < startTime  <  endTime
                console.log('restStart  < startTime  <  endTime');
                const restRegular = toHours(endTime - startTime);
                console.log('start=> regular:0,restRegular=>', restRegular);
                return {regular:0,restRegular}
            }
        }
    }else{console.log('no rest time')}
    return {}
}

const end = (startTime,endTime,restEnd) => {
    console.log('end=>',startTime,endTime,restEnd);
    const extraTime = endTime - startTime > eightHours ? startTime + eightHours : null;
    if(restEnd > startTime){   // startTime  <  restEnd  <  endTime
        if(extraTime){
            if(endTime > restEnd){
                if(extraTime > restEnd){   //startTime  <  restEnd  < extraTime  <  endTime
                    console.log('startTime  <  restEnd  < extraTime  <  endTime');
                    const extra = toHours(endTime - extraTime);
                    const regular = toHours(extraTime-restEnd);
                    const restRegular = toHours(restEnd - startTime);
                    console.log('regular, extra, restRegular=>',regular, extra, restRegular);
                    return {regular, extra, restRegular}
                }else{      // startTime  < extraTime  <  restEnd  <  endTime
                    console.log('startTime  < extraTime  <  restEnd  <  endTime');
                    const extra = toHours(endTime - restEnd);
                    const restExtra = toHours(restEnd - extraTime);
                    console.log('regular:0, restRegular:8, extra, restExtra=>', extra, restExtra);
                    return {regular:0, restRegular:8, extra, restExtra}
                }
            }else{  // startTime < extra < endTime < restEnd
                console.log('startTime < extra < endTime < restEnd');
                const restExtra = toHours(endTime - extraTime);
                console.log('regular:0, extra:0, restRegular:8, restExtra',restExtra);
                return {regular:0, extra:0, restRegular:8, restExtra}
            }
        }else if(restEnd < endTime){    // startTime  <  restEnd  <  endTime
            console.log('startTime  <  restEnd  <  endTime');
            const regular = toHours(endTime - restEnd);
            const restRegular = toHours(restEnd - startTime)
            console.log('regular, restRegular=>',regular, restRegular);
            return {regular, restRegular}
        }else{     // startTime  <  endTime  < restEnd
            console.log('startTime  <  endTime  < restEnd');
            const restRegular = toHours(endTime - startTime);
            console.log('regular:0, restRegular=>',restRegular);
            return {regular:0, restRegular}
        }
    }else{
        console.log('not restTime')
        return {}   //  restEnd  < startTime  < extraTime  <  endTime  //  restEnd  < startTime  <  endTime
    }

}

export const getShiftData =(shift,restDays,holidaysTytles)=>{
    const {date,day,start_at,end_at} = shift;
    const restDay = restDays[date] ? restDays[date] : {type:null};
    const tytle = `${day===5 ? 'Shabat eve ' : ''}${day===6 ? 'Shabat ' : ''} ${holidaysTytles[date] ? holidaysTytles[date]+' ' : ''}`
    const ratedHours = start_at && end_at ? getRatedHours(date,start_at,end_at,restDay) : null      //ratedHours => {regular:<Nunber>,extra:<Number>,restRegular:<Number>,restExtra:<Number>} <Number>=> sum of hours
    // console.log(date,start_at,end_at,restDay);
    return {date,day,start_at,end_at,tytle,ratedHours}
}





















// export const ratedHours = (shift)=>{
//     const {date, day, start_at, end_at} = shift;
//     let startTime = new Date(date + "T" + start_at).getTime();

//     let endTime = new Date(date + "T" + end_at).getTime();
//     if(startTime > endTime){
//         const curDate = new Date(date);
//         endTime = new Date(date + "T" + end_at).setDate(curDate.getDate()+1);
//        }

//     const shiftTime = endTime - startTime;
//     const eightHours = 28800000;
//     const extraTime = shiftTime > eightHours ? startTime + eightHours : null;
//     let regular = shiftTime<eightHours ? toHours(shiftTime) : 8;
//     let extra = extraTime ? toHours(shiftTime) - 8 : 0;
//     let restRegular = 0;
//     let restExtra = 0;


//     const rateDay5 = ()=>{
//         const restStart = new Date(date + 'T16:00:00').getTime();
//         if(endTime > restStart){
//             console.log('startTime  <  restStart  <  endTime');
//                  // startTime  <  restStart  <  endTime
//             if(extraTime){      
//                 if(extraTime < restStart){          // startTime  < extraTime  <  restStart  <  endTime 
//                     restExtra = toHours(endTime - restStart);
//                     extra = toHours(restStart - extraTime);
//                     regular = 8;
//                 }else{         //startTime  <  restStart  < extraTime  <  endTime
    
//                     regular = toHours(restStart - startTime);
//                     restRegular = toHours(extraTime - restStart);
//                     restExtra = toHours(endTime - extraTime);
//                     extra = 0;
//                 }
//             }else{    // startTime  <  restStart  <  endTime
//                 regular = toHours(restStart - startTime);
//                 restRegular = toHours(endTime - restStart)
//             }
//         }else if(extraTime){
//             regular = 8;
//             extra = toHours(shiftTime - eightHours);    
//         }
//     }
    
//     const rateDay6 = ()=>{
        // const restEnd = new Date(date + 'T22:00:00').getTime();
        //         if(endTime > restEnd){   // startTime  <  restEnd  <  endTime
        //             if(extraTime){
        //                 if(extraTime > restEnd){   //startTime  <  restEnd  < extraTime  <  endTime
        //                     extra = toHours(endTime - extraTime);
        //                     regular = toHours(extraTime-restEnd);
        //                     restRegular = toHours(restEnd - startTime);
        //                 }else{      // startTime  < extraTime  <  restEnd  <  endTime
        //                     extra = toHours(endTime - restEnd);
        //                     restExtra = toHours(restEnd - extraTime);
        //                     restRegular = 8;
        //                     regular = 0;
        //                 }
        //             }else{    // startTime  <  restEnd  <  endTime
        //                 regular = toHours(endTime - restEnd);
        //                 restRegular = toHours(restEnd - startTime)
        //             }
        //         }else{     // startTime  <  endTime  < restEnd
        //             regular = 0;
        //             restRegular = 8;
        //         }
         
//     }


//     if(day > 4){
//         if(day === 5 ){
//             rateDay5();    
//         }else{
//             rateDay6();
//         } 
//     }

// return {regular,extra,restRegular,restExtra}

// }

