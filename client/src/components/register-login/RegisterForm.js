import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { color } from '@mui/system';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [reEmail, setReEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [msg, setMsg] = useState('');
    const [succeed, setSucceed] = useState(false);

    const navigate = useNavigate();

    const {users, setUsers} = useContext(AppContext);

    const formElement = useRef();

    const colorArray = ['#FF2828','#E52893', '#992BD6', '#0A4F97', '#03CBC3', '#04E11F', '#3D6801','#FDFD00', '#FF840E', '#7E7F7E']

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        })
    })
    useEffect(() => {
        ValidatorForm.addValidationRule('isEmailMatch', (value) => {
            if (value !== email) {
                return false;
            }
            return true;
        })
    })

    // const getUsers = async()=>{
    //     try{
    //         const {data} = await axios.get('/m/getusers');
    //         // console.log('getUsers=>',users.data);
    //       } catch(e){console.log(e)}    
    // }

    // const addColor = (users)=>{
    //     let color;
      
    //         existColors = users.map(user=>user.color);
    //         console.log(existColors);
    //         color = colorArray.find(c=>!(existColors.includes(c)));
    //         console.log(color);
    //     })
    //     .catch(e=>console.log(e))
        
    //     return color;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.get('/m/getusers');
            const existColors = data.map(user=>user.color);
            console.log(existColors);
            const color = colorArray.find(c=>!(existColors.includes(c)));
            console.log(color);
            if(color){
                addUser(color);
            }else{
                setMsg(`Can't add more then ${colorArray.length} employees, pleas contact your manager`)
            }
           
            // console.log('getUsers=>',users.data);
          } catch(e){console.log(e)}    
       
    }

    const addUser = async(color)=>{
        try {
            const response = await axios.post('/register', {
                firstName, lastName, phone, email, password,color
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setSucceed(true)
            console.log(response.data);
        } catch (err) {
            // console.log(e.response.data);
            setMsg(err.response.data.msg)
        }
    }

    return (
        !succeed ?
            <div>
                <div>
                    <h3>Register Form</h3>
                </div>
                <ValidatorForm
                    ref={formElement}
                    onSubmit={handleSubmit}
                    onError={errors =>
                        console.log(errors)
                    }
                >
                    <TextValidator
                        sx={{ m: 1 }}
                        id='firstName'
                        label='Enter First Name'
                        variant='outlined'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        sx={{ m: 1 }}
                        id='lastName'
                        label='Enter Last Name'
                        variant='outlined'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        sx={{ m: 1 }}
                        id='phone'
                        label='Enter Phone Number (numbers only)'
                        variant='outlined'
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        validators={['required', 'matchRegexp:^[0-9]{10}$']}
                        errorMessages={['this field is required', 'phon is not valid']}
                    />
                    <TextValidator
                        label="Email"
                        sx={{ m: 1 }}
                        autoComplete=''
                        variant='outlined'
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextValidator
                        label="Repat Email"
                        sx={{ m: 1 }}
                        autoComplete=''
                        variant='outlined'
                        onChange={(e) => setReEmail(e.target.value)}
                        name="reEmail"
                        value={reEmail}
                        validators={['required', 'isEmailMatch']}
                        errorMessages={['this field is required', 'email dismatch']}
                    />

                    <TextValidator
                        label="Password"
                        sx={{ m: 1 }}
                        autoComplete=''
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        type="password"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        label="Repeat password"
                        sx={{ m: 1 }}
                        autoComplete=''
                        onChange={(e) => setRePassword(e.target.value)}
                        value={rePassword}
                        name="repeatPassword"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['password mismatch', 'this field is required']}
                    />
                    <Button sx={{ m: 1 }} variant='contained' type="submit">Register</Button>
                </ValidatorForm>
                <div>
                    {msg}
                </div>
            </div>

        : 
            <div>
                <h1>Registered successfully</h1>
                <Button sx={{ m: 1 }} variant='contained' onClick={() => navigate('/login')}>LOGIN</Button>
            </div>
    )
}

export default RegisterForm;











