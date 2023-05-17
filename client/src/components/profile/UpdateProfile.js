import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import { AppContext } from '../../App';

const UpdateProfile = () => {
    const {user,setUser} = useContext(AppContext)
    const [first_name, setFirst_name] = useState(user.first_name);
    const [last_name, setLast_name] = useState(user.last_name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const formElement = useRef();
    
    useEffect(() => {
        ValidatorForm.addValidationRule('isEmailMatch', (value) => {
            if (value !== email) {
                return false;
            }
            return true;
        })
    })

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profile = {
            id:user.id,
            first_name,last_name,phone,email
        }
        try {
            const response = await axios.post('/profile/update',profile, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setUser('');
            alert('Updated successfully')          
            
            
            console.log(response.data);
        } catch (err) {
            setMsg('Could not update')
        }
       
    }

    useEffect(()=>{
        if(!user.id){
            navigate('/login');
        }
    })



    return (
            <div>
                <div>
                    <h3>Update Profile</h3>
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
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        sx={{ m: 1 }}
                        id='lastName'
                        label='Enter Last Name'
                        variant='outlined'
                        onChange={(e) => setLast_name(e.target.value)}
                        value={last_name}
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

                   
                    <Button sx={{ m: 1 }} variant='contained' type="submit">Update</Button>
                </ValidatorForm>
                <div>
                    {msg}
                </div>
            </div>

        // : 
        //     <div>
        //         <h1>Updated successfully</h1>
        //         <h4>Please login again</h4>
        //         <Button sx={{ m: 1 }} variant='contained' onClick={() => navigate('/login')}>LOGIN</Button>
        //     </div>
    )
}

export default UpdateProfile;


























