import axios from 'axios';
import { TextField, Box, Button, Card, CardContent, Avatar, AvatarGroup } from '@mui/material';
import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import './manager.css'


const WhatsApp = (props) => {
    const [msg, setMsg] = useState('');
    const { usersObj } = useContext(AppContext)
    const { updateSendToList, sendToList, isSent } = props


    const send = (msg) => {
        let isApiKey = true;
        const sentTo = []
        const notSentTo = [];
        sendToList.forEach(id => {
            if(!usersObj[id].whatsapp_key){
                alert(`${usersObj[id].name} has no whatsapp number in this app`)
                isApiKey = false
                notSentTo.push(usersObj[id].name);
            }else{
                const options = {
                    method: 'POST',
                    url: 'https://whin2.p.rapidapi.com/send',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': `${usersObj[id].whatsapp_key}`,
                        'X-RapidAPI-Host': 'whin2.p.rapidapi.com'
                    },
                    data: `{"text":"${msg}"}`
                };
    
                axios.request(options).then(function (response) {
                    console.log(response.data);
                    sentTo.push(usersObj[id].name);
                    if(sentTo.length + notSentTo.length >= sendToList.length){
                        isSent(sentTo, notSentTo);
                        setMsg('');
                    }
                }).catch(function (error) {
                    notSentTo.push(usersObj[id].name);
                    console.error(error);
                });
            }
        })
    }

    const setAvatarStyle = (emp, size, opacity) => {
        return {
            bgcolor: `${usersObj[emp].color}`,
            opacity: opacity,
            width: size,
            height: size,
            fontSize: size / 2,
            transition: 'z-index 0.2s',
            '&:hover': {
                zIndex: 1,
                opacity: 1
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = event.target.message.value;
        console.log('message=>', message);
        send(message);
    }

    const handleInputChange = (event) => {
        setMsg(event.target.value);
    };


    return (
        <Card >

            <div className='whatsapp_sendList'>
                <h4> To:</h4>
                <AvatarGroup max={8}>
                    {
                        sendToList.map((user, index) => <Avatar key={index} sx={setAvatarStyle(user,25,0.6)} onClick={() => updateSendToList(user)}>{usersObj[user].avatar_name} </Avatar>)
                    }
                </AvatarGroup>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding:'10px 5px 0px 5px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
                    <TextField id="input-with-sx" name='message' label="Message" variant="outlined" value={msg} multiline rows={4} onChange={handleInputChange} required />
                    <Button variant="text" type='submit'>
                        <i className="fa-brands fa-square-whatsapp  fa-2xl" style={{ color: 'greenyellow' }}>
                        </i>
                        <p style={{ fontSize: 10, color: 'black' }}>Send</p>
                    </Button>
                </form>
            </Box>

        </Card>
    )
}

export default WhatsApp



const UserAvatar = (props) => {
    const { emp, size, opacity } = props;
    const { usersObj } = useContext(AppContext);
    const styleObj = {
        bgcolor: `${usersObj[emp.user_id].color}`,
        opacity: opacity,
        width: size,
        height: size,
        fontSize: size / 2,
        transition: 'z-index 0.2s',
        '&:hover': {
            zIndex: 1,
            opacity: 1
        }
    }
    const commentStyle = {
        border: '3px dashed black',
        animation: 'rippleA 1.2s infinite',
        '@keyframes rippleA': {
            '0%': {
                border: '1px dashed black'
            },
            '50%': {
                border: '2px dashed black'
            },
            '100%': {
                border: '1px dashed black'
            }
        }
    }

    return (
            <Avatar
                // key={index}
                onClick={() => props.onSelect(emp.user_id)}
                sx={styleObj}
            >
                {usersObj[emp.user_id].avatar_name}
            </Avatar>
    )
}



