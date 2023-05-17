import { Select, MenuItem, InputLabel, TextField } from "@mui/material"
import { useState, useContext, useEffect } from 'react';
import { AppContext, WeekContext } from '../../../App';
import { dayParts } from "../../../config/shiftsConfig";
import { constraintsOptions, constraintsColors } from "../../../config/constraintsConfig";
import {getShiftId, getDateString} from '../../../utils/week_utils';
import './Constraints.css'
import '../Week.css';


const ConstraintsShift = (props) => {
  const { part, date, handleClick } = props;
  const { user } = useContext(AppContext);
  const { constraintsObj } = useContext(WeekContext);
  const [shiftId] = useState(getShiftId(date,part,user.id));
  const [selected, setSelected] = useState(null);
  // const [note, setNote] = useState(null);
  const [shift, setShift] = useState({
    id:shiftId,
    date,
    day:date.getDay(),
    part,
    user_id:user.id,
    option:null,
    note:null
  })

  const [icons] = useState({
    open:{color:'#80e972',backgroundColor:'#80e97260',class:"fa-sharp fa-solid fa-square-check"},
    close:{color:'#f55c5c',backgroundColor:'#f55c5c60',class:"fa-solid fa-rectangle-xmark"},
    favorite:{color:'#f8fb37',backgroundColor:'#f8fb3760',class:"fa-solid fa-heart"},
    empty:{color:'#979191',backgroundColor:'white',class:"fa-regular fa-square"}
  })

  const setOption = (option)=>{
    constraintsObj[shiftId] = {...shift,option};
    setShift({...shift,option});
  }
  const setNote = (note)=>{
    constraintsObj[shiftId] = {...shift,note};
    setShift({...shift,note});
  }

  useEffect(()=>{
    if(constraintsObj[shiftId]){
      setShift(constraintsObj[shiftId])
      // console.log(constraintsObj[shiftId].option);
    // }else{
    //   console.log(constraintsObj);
    }
  },[])
  
  // console.log('timeArr=>',timeArr);
  // console.log('timeArr=>[part]',timeArr[part]);
  const [timeString] = useState(dayParts[part].timeString); 
console.log(constraintsObj, );

const setButton = (option)=>{
  switch(option){
    case 'open': return <i className={"fa-sharp fa-solid fa-square-check"} style={{color:'#80e972',fontSize:20, border:'1px solid white'}}></i>;
    case 'close': return <i class="fa-solid fa-rectangle-xmark" style={{color:'#f55c5c',fontSize:20, border:'1px solid white'}}></i>;
    case 'favorite': return <i class="fa-solid fa-heart" style={{color:'#f8fb37',fontSize:20, border:'1px solid white'}}></i>;
    default: return <i class="fa-regular fa-square" style={{color:'#979191',fontSize:20, border:'1px solid white'}}></i>; 
  }
}
  return (
    <div className={`cell part`} style={{backgroundColor:icons[shift.option || 'empty'].backgroundColor}}>
      <InputLabel id="demo-simple-select-label">{timeString}</InputLabel>
    <div className="icon-box">
      {
          constraintsOptions.map((option, index) => <span key={index} onClick={()=>setOption(option)} >
            <i className={`${icons[option||'empty'].class} icon-span`} style={{color:icons[option||'empty'].color,fontSize:21}}></i>
            </span>)
      }
    </div>

      {/* <Select
        labelId="demo-simple-select-label"
        name={timeString}
        value={shift.option || ''}
        label={timeString}
        onChange={(e) => {
          const val = e.target.value === '' ? null : e.target.value;
          setOption(val);
          // changeOption({part,option:val,note});
        }}
        sx={{
          backgroundColor: constraintsColors[selected]
        }}
      >
        {
          constraintsOptions.map((option, index) => <MenuItem key={index} value={option} sx={{ color: constraintsColors[option] }}>{option || 'Cancel'}</MenuItem>)
        }
      </Select> */}
      <TextField label='Note:' value={shift.note || ''} sx={{backgroundColor:'white'}} onChange={(e)=>{
        setNote(e.target.value) 
        // changeOption({part,option:selected,note:e.target.value||null})
      }} />
    </div>
  )
}
export default ConstraintsShift