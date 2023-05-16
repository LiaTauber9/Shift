import {useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { getUsersObj } from '../../utils/users';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');


  const {token,setToken,user,setUser,users,setUsers,setUsersObj} = useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(email,password);
      try {
        const response = await axios.post('/login',{
          email, password
        },{
          headers:{
            'Content-Type':'application/json'
          }
        })
        setToken(response.data.token);
        setUser(response.data.user);
        // if(response.data.user.role==='manager'){
        //   getUsers();
        // }
        getUsers();
        navigate('/');
      } catch (e) {
        // console.log(e.response.data);
        console.log('my error=>',e);
      }
  }

  const getUsers = async()=>{
    try{
        const users = await axios.get('/m/getusers',{
          headers:{
            'Content-Type':'application/json',
            'active':'true'
          }
        });
        // console.log('getUsers=>',users.data);
        setUsers(users.data);
        setUsersObj(getUsersObj(users.data))
      } catch(e){console.log(e)}    
}   

  return(
    <div>
      <div>
        <h3>Login Form</h3>
      </div>
      <Box component={'form'} sx={{m:1}} noValidate autoComplete={'off'}>
        <TextField
          sx={{m:1}}
          id='email'
          label='Enter Email'
          variant='outlined'
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          sx={{m:1}}
          id='password'
          label='Enter Password'
          variant='outlined'
          onChange={(e)=>setPassword(e.target.value)}
        />
      </Box>
      <Button variant='contained' onClick={handleClick}>Login</Button>
      <div>
        {msg}
      </div>
    </div>
  )
}

export default LoginForm;
