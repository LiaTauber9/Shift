import { Select, MenuItem, InputLabel, TextField } from "@mui/material"
import { useState } from 'react';
import { dayParts } from "../../../config/shiftsConfig";
import { constraintsOptions, constraintsColors } from "../../../config/constraintsConfig";

import '../Week.css';


const ConstraintsShift = (props) => {
  const {part, data, changeOption} = props;
  const [selected, setSelected] = useState(data.option)
  const [note, setNote] = useState(data.note)
  
  const timeArr = dayParts;
  // console.log('timeArr=>',timeArr);
  // console.log('timeArr=>[part]',timeArr[part]);
  const timeString = dayParts[part].timeString; 


  return (
    <div className={`cell part`}>
      <InputLabel id="demo-simple-select-label">{timeString}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        name={timeString}
        value={selected || ''}
        label={timeString}
        onChange={(e) => {
          const val = e.target.value === '' ? null : e.target.value;
          setSelected(val);
          changeOption({part,option:val,note});
        }}
        sx={{
          backgroundColor: constraintsColors[selected]
        }}
      >
        {
          constraintsOptions.map((option, index) => <MenuItem key={index} value={option} sx={{ color: constraintsColors[option] }}>{option || 'Cancel'}</MenuItem>)
        }
      </Select>
      <TextField label='Note:' value={note || ''} onChange={(e)=>{
        setNote(e.target.value)
        changeOption({part,option:selected,note:e.target.value||null})
      }} />
    </div>
  )
}
export default ConstraintsShift