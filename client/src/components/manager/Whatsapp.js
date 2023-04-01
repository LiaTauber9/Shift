import axios from 'axios';
import { TextField, Box, Button, Card, CardContent, Typography, Avatar } from '@mui/material';
import { useState } from 'react';

const WhatsApp = () => {
    const [msg, setMsg] = useState('');
    const endpoints = [{user_name:'LT'}]
    const whatsappUsers = {
        36:{
            avatar_name:'FF',
            color:"#FF2828",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        37:{
            avatar_name:'EE',
            color:"#E52893",
            api_key:'712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
        },
        25:{
            avatar_name:'AA',
            color:"#992BD6",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        26:{
            avatar_name:'BB',
            color:"#0A4F97",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        27:{
            avatar_name:'CC',
            color:"#03CBC3",
            api_key:'712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
        },
        28:{
            avatar_name:'DD',
            color:"#04E11F",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        }
    }
    const whatsappUsersList = [
        {
            avatar_name:'FF',
            color:"#FF2828",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        {
            avatar_name:'EE',
            color:"#E52893",
            api_key:'712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
        },
        {
            avatar_name:'AA',
            color:"#992BD6",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        {
            avatar_name:'BB',
            color:"#0A4F97",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        },
        {
            avatar_name:'CC',
            color:"#03CBC3",
            api_key:'712db8b162msh59a4b7238f70a73p1bf6e6jsnf0927d5085cc'
        },
        {
            avatar_name:'DD',
            color:"#04E11F",
            api_key:'8e1c700d55msh1fb52a08a8d78b3p1d7958jsnc471df7baa29'
        }
    ];
    const send = (msg, api_key) => {
        const options = {
            method: 'POST',
            url: 'https://whin2.p.rapidapi.com/send',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': `${api_key}`,
                'X-RapidAPI-Host': 'whin2.p.rapidapi.com'
            },
            data: `{"text":"${msg}"}`
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const phone = event.target.phone.value;
        const message = event.target.message.value;
        console.log('message=>', message);
        whatsappUsersList.forEach(user=>send(message, user.api_key));        
        setMsg('')
    }

    const handleInputChange = (event) => {
        setMsg(event.target.value);
    };


    return (
        <Card>
           
           <CardContent sx={{display:'flex', flexDirection:'row',alignItems:'flex-start'}}>
            <Typography gutterBottom variant="h5" component="div">
          To:
        </Typography>
        {
            whatsappUsersList.map((user,index)=><Avatar sx={{ bgcolor: user.color }}>{user.avatar_name}</Avatar>)
        }
        
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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

            {/* <button onClick={setUrl}>Set url</button>
            <button onClick={showUrl}>Show url</button> */}
        </Card>
    )
}

export default WhatsApp




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



