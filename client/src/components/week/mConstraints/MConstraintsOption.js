import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../App";
import { getUsersObj } from "../../../utils/users";

const MConstraintsOption = (props)=>{
    const {users} = useContext(AppContext);
    const usersObj = getUsersObj(users);
    // console.log('usersObj MConstraintsOption',usersObj);
    // const optionColor = {open:'blue',close:'red',favorite:'green'}
    return(
        <div className="m_const_option">
            <p className={props.option} style={{margin:0}}>{props.option}: 
            {props.employees.map((emp,index)=>
            <span>
            <span key={index} onClick={()=>props.onSelect(emp.user_id)} style={{backgroundColor:`${usersObj[emp.user_id].color}80`}}>| {usersObj[emp.user_id].name} |</span> 
            {
                emp.note ? <span onClick={()=>{alert(emp.note)}}>*</span> : ''
            }
            </span>
            )}
            </p>
        </div>
    )
}

export default MConstraintsOption