import axios from 'axios';
import { TextField, Box, Button, Card, CardContent, Avatar, AvatarGroup } from '@mui/material';
import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import './manager.css'


const WhatsApp = (props) => {
    const [msg, setMsg] = useState('');
    const { usersObj } = useContext(AppContext)
    const { updateSendToList, sendToList, isSent } = props


    const whatsappApiKeys = {
        36: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29',
        37: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc',
        25: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29',
        26: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29',
        27: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc',
        28: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    }

    const send = (msg) => {
        sendToList.forEach(id => {
            const options = {
                method: 'POST',
                url: 'https://whin2.p.rapidapi.com/send',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': `${whatsappApiKeys[id]}`,
                    'X-RapidAPI-Host': 'whin2.p.rapidapi.com'
                },
                data: `{"text":"${msg}"}`
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                isSent();
                setMsg('');
            }).catch(function (error) {
                console.error(error);
            });
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




// show url


//   set url


//   show url - 2


// const sendCallMeBot = async()=>{
//    const msg = await axios.get('https://api.callmebot.com/whatsapp.php?phone=972524324451&text=This+is+a+test+3&apikey=7947620');
//    console.log('Whatsapp status=>',msg.status);

// } 


//     try {
//       await twilioClient.messages.create({
//         from: `whatsapp:${twilioNumber}`,
//         to: `whatsapp:${phone}`,
//         body: message
//       });

//       // Message sent successfully
//     } catch (err) {
//       console.error(err);
//     }


{/* <form onSubmit={handleSubmit}>
    <label htmlFor="phone">Phone number:</label>
    <input type="text" id="phone" name="phone" required />

    <label htmlFor="message">Message:</label>
    <textarea id="message" name="message" required />

    <TextField
          id="message"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          value={message}
          onChange={handleInputChange}
          required
        />

    <button type="submit">Send Message</button>
  </form> */}


const whatsappUsers = {
    36: {
        avatar_name: 'FF',
        color: "#FF2828",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    37: {
        avatar_name: 'EE',
        color: "#E52893",
        api_key: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
    },
    25: {
        avatar_name: 'AA',
        color: "#992BD6",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    26: {
        avatar_name: 'BB',
        color: "#0A4F97",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    27: {
        avatar_name: 'CC',
        color: "#03CBC3",
        api_key: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
    },
    28: {
        avatar_name: 'DD',
        color: "#04E11F",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    }
}
const whatsappUsersList = [
    {
        avatar_name: 'FF',
        color: "#FF2828",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    {
        avatar_name: 'EE',
        color: "#E52893",
        api_key: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
    },
    {
        avatar_name: 'AA',
        color: "#992BD6",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    {
        avatar_name: 'BB',
        color: "#0A4F97",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    },
    {
        avatar_name: 'CC',
        color: "#03CBC3",
        api_key: '712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
    },
    {
        avatar_name: 'DD',
        color: "#04E11F",
        api_key: '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
    }
];


const setUrl = () => {
    const options = {
        method: 'POST',
        url: 'https://whin2.p.rapidapi.com/seturl',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29',
            'X-RapidAPI-Host': 'whin2.p.rapidapi.com'
        },
        data: '{"url":"https://webhook.site/b7ac1f8a-8346-4e5d-8e91-9bc18d5bf5f8"}'
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

const showUrl = () => {
    const options = {
        method: 'GET',
        url: 'https://whin2.p.rapidapi.com/showurl',
        headers: {
            'X-RapidAPI-Key': '8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29',
            'X-RapidAPI-Host': 'whin2.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}




