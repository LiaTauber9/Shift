import { useContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

const MUsers = () => {
    const [users, setUsers] = useState([])
    const getUsers = async()=>{
        try{
            const users = await axios.get('/m/getusers'
            ,{
                headers: {'active':'true'}
            }
            );
            console.log('getUsers=>',users.data);
            setUsers(users.data)
        }catch(e){console.log(e)}
        
    }
    
    useEffect(()=>{
        getUsers()
    },[])

    return (
        <p>users</p>
    )

}

export default MUsers