import getDateString from "./getDateString";

const getShiftId = (date,part,user_id='')=>{
    return  `${getDateString(date, true, true)}${part}${user_id}`
}

export default getShiftId

