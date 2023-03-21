import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useContext} from 'react';
import { AppContext } from '../App';

const Nav = (props) => {
  const navigate = useNavigate();
  const {user} = React.useContext(AppContext);
  console.log('user=>',user);
  const logout = async() => {
    try {
      const response = await axios.delete('/logout');
      if(response.status===200 || response.status===204) {
        navigate('/')
      }
    } catch (e) {
      console.log(e);
      navigate('/')
    }
  }

  return (
    <Stack spacing={2} direction='row'>      
      <Button component={Link} to='/profile' >Profile</Button>
      <Button component={Link} to='/register' >Register</Button>
      <Button component={Link} to='/login' >Login</Button>
      <Button component={Link} to='/' >Home</Button>
      <Button component={Link} to='/constraints' >Constraints</Button>
      <Button component={Link} to='/schedule' >Schedule</Button>
      {
        user.role === 'manager' ? (<ManagerMenu />) : ('')
      }
      <Button onClick={logout} >Logout</Button>
    </Stack>
  )
}
export default Nav

const ManagerMenu = ()=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Manager
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Button component={Link} to='/mconstraints' >Constraints</Button></MenuItem>
        <MenuItem onClick={handleClose}><Button component={Link} to='/mconstraints' >Manage users</Button></MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
