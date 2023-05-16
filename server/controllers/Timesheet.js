import axios from 'axios';

export const getRestDays = async(req,res)=>{
    const {date_start,date_end}=req.query;
    try {
        const response = await axios.get(`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&start=${date_start}&end=${date_end}&ss=off&mf=off&c=on&geo=city&city=IL-Jerusalem&M=on&s=off`);
        const restDays = {};
        const holidaysTytles ={};
        const fullDayList = [];  //List of String 'yyy-mm-dd' for update monthObj['yyy-mm-dd'].type = 'allDay'
        response.data.items.forEach(item => {
            if(item.category === "holiday"){
              holidaysTytles[item.date] = item.title;                  ;
            }else{
                const dateKey = item.date.slice(0,10);
                const dateObj = new Date(dateKey);
                restDays[dateKey] = {
                    type: item.category == 'candles' ? 'start' : 'end',
                    date: item.date,
                    restTime: new Date(item.date).getTime()
                }
                if(dateObj.getDay()===4 && item.category === 'candles'){
                    const nextDay = new Date(dateObj).setDate(dateObj.getDate()+1);
                    fullDayList.push(getDateString(new Date(nextDay)))
                }else if(dateObj.getDay()===0 && item.category === 
                'havdalah'){
                    const lastDay = new Date(dateObj).setDate(dateObj.getDate()-1);
                    fullDayList.push(getDateString(new Date(lastDay)))
                }
            }
            
    })
    fullDayList.forEach(date=>{
        restDays[date].type = 'allDay'
    })
    res.json({restDays, holidaysTytles})
    // getRatedShiftsList(monthObj)
 } catch (e) {
        console.log(e);
    }
}