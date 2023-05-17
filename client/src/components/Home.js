






import React from 'react';
import styled from '@mui/material/styles/styled';
import { Typography, Button } from '@mui/material';
import { padding } from '@mui/system';
const styles = {
    container:{

    }
}
const IntroductionText = styled(Typography)(({ theme }) => ({
  margin:'32px auto',
  textAlign: 'center',
  maxWidth: '600px',
  fontSize: '1.2rem',
  '& ul': {
    listStyle: 'none',
    padding: 0,
    '& li': {
      marginBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
  '& h6': {
    marginTop: theme.spacing(4),
    fontWeight:900
  },
  '& .screen_name':{
    backgroundColor:'rgb(126, 129, 134)',
    color:'white',
    padding:'3px'
  }
}));



function Home() {

  return (
  
      
      <IntroductionText component="div">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Shift App
      </Typography>
  <p>In this shifts-planning app, managers and employees will be able to schedule weekly work shifts in an easy and efficient way.</p>
  <Typography variant="h6">Employees:</Typography>
  <p>After register and login you can enter the <span className='screen_name'>constraints</span> table to fill in your preferred status for each shift (for the next week):
</p>
  <p>You can add a comment to the shift manager alongside your selection.</p>
 
  <ul>
  <p>On the  <span className='screen_name'>Schedule</span> screen you can select the relevant week to see all the shifts scheduled for this week, you can click <Button>MY SCHEDULE</Button> to see only your shifts.</p>
    <li><span  className='screen_name'>Update Profile</span> Update your account information as needed</li>
    <li><span  className='screen_name'>Timesheet:</span> Your total number of monthly work hours and hourly rates.</li>
  </ul>
  <Typography variant="h6">Shifts-manager:</Typography>
  <p>After login you can access the screen: <span className='screen_name'>Plan Schedule</span> to plan the schedule for next week.</p>
  <p>For every shift there is a list of available employees and those who prefer to work this shift.</p>
  <p>When you click on the expansion icon you can also see the employees who aren't available and those didn't respond.</p>
  <p>If an employee added a note related to this shift his name will be displayed with an animation and when you hover his name the note will be displayed.</p>
  <p>From the app screen the manager will be able to send messages related to the schedule planning. There is a bot that will send the messages to the employees via WhatsApp.</p>
  <p>after clicking the <Button>SAVE AND POST</Button> the schedule for this week will be available for the employees to see.</p>
</IntroductionText>

  )
}

export default Home

              






















// import MUsers from "./manager/MUsers";
// import WhatsApp from "./manager/Whatsapp";
// import WhatsAppLink from "../utils/WhatsAppLink";
// // import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
// // import { faEnvelope} from '@fortawesome/free-solid-svg-icons'


// import Typography from '@mui/material/Typography';

// import { Accordion, AccordionDetails, AccordionSummary, Button,  } from '@mui/material';
// import { styled } from '@mui/material/styles'
// import { ExpandMore } from '@mui/icons-material';
// import { height } from "@mui/system";

// import * as React from 'react';
// import { useNavigate } from "react-router-dom";






// const Home = ()=>{
//     const navigate = useNavigate()
//     return ( 
//         <>          
//         <h1>Home</h1> 
//         <p>
//         In this shifts-planing app, managers and employees will be able to schedule weekly work shifts in an easy and efficient way.
// , 
// Employees:
// After register and login you can enter the constraints table to fill in your preferred status for each shift (for the next week):
// Not selected
// Not optional
// Optional
// Prefered shift
// You can add a comment to the shifts manager alongside your selection.

// On the Schedule screen you can select the relevant week to see all the shifts scheduled for this week, you can click 'my schedule ' to see only your shifts.

// On the profile:
// Update Profile: 
// you can update your account information as needed
// Timesheet:
// You can choose a month to display the total number of monthly work hours and hourly rates.

// Shifts-manager:
//  after login you can access the screen: plan schedule to plan the schedule for next week.
//  For every shift there is a list of available employees and those who prefer to work this shift.
//  When you click on the expansion icon you can also see the employees who aren't available and those didn't respond.
// If an employee added a note related to this shift his avatar will be displayed with an animation and when you hover his name the note will be displayed.
// On the left side of the screen the manager will be able to send messages related to the schedule planning. There is a bot that will send the messages to the employees via WhatsApp.
// after clicking the ‘save and post’ button - the schedule for this week will be available for the employees to see.


//         </p>
//         <Button onClick={()=>navigate('/login')}>LOGIN</Button>
//         <Button onClick={()=>navigate('/register')}>REGISTER</Button>
//         </>      
//     )
// }
//     // return (
//     //     <div>
//     //       <Accordion>
//     //         <AccordionSummary
//     //           expandIcon={<ExpandMoreIcon />}
//     //           aria-controls="panel1a-content"
//     //           id="panel1a-header"
//     //         >
//     //           <Typography>Accordion 1</Typography>
//     //         </AccordionSummary>
//     //         <AccordionDetails>
//     //           <Typography>
//     //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//     //             malesuada lacus ex, sit amet blandit leo lobortis eget.
//     //           </Typography>
//     //         </AccordionDetails>
//     //       </Accordion>
//     //     </div>
//     //   );


//     // const MyAcordion = styled(Accordion)({
//     //       '&::before': {
//     //         height: 30,
//     //     },
//     // .css-htpsh5-MuiPaper-root-MuiAccordion-root
//         // '& .MuiAccordion-root':{
//         //     // '& .MuiPaper-root':{
//         //         display:'flex',
//         //     justifyContent:'center'
//         //     // }
//         // },
        
//     //     height:15,
//     //     display:'flex',
//     //     justifyContent:'center'
//     // }
//     // );


//     // const StyledAccordion = styled(Accordion)(({ theme }) => ({
//     //     '& .MuiAccordionSummary-root': {
//     //       marginBottom: theme.spacing(1),
//     //     },
//     //     '& .MuiAccordionDetails-root': {
//     //       flexDirection: 'column-reverse',
//     //     },
//     //   }));





//     // const MyAAccordionSummary = styled(AccordionSummary)({

//     //     '& .MuiAccordionSummary-content': {
//     //         justifyContent: 'center',
//     //       },
//     //       '& .MuiIconButton-root': {
//     //         position: 'absolute',
//     //         right: 16,
//     //       },

//     //       '&.Mui-expanded': {
//     //         minHeight: '15px', // set custom minHeight when expanded
//     //       },


//     //     height:15,
//     //    minHeight:15,
//     //    alignItems:'center',
//     //    justifyContent:'center',
//     //    width:'30px',
     
//     //   '&.MuiAccordionSummary-root': {
//     //     '& .MuiButtonBase-root': {
//     //       width: '30px',
//     //     },
//     //     '& .MuiPaper-root':{
//     //         display:'flex',
//     //         justifyContent:'center',
//     //         alignItems:'center'
//     //     },
//     //     '& .MuiAccordionSummary-content': {
//     //         width: '30px',
//     //       fontSize: '16px', // set the font size to 16px
//     //     },
//     //   },
//     // })

//     //   const MyAccordionDetails = styled(AccordionDetails)({
//     //     padding: '16px 0px',
//     //       display: 'flex',
//     //       flexDirection: 'column',
//     //       gap: 7,
//     //       color:'red'
//     //   })
      

//     // const classes = useStyles();

//     // return (
//     //     <div>
           
//     //   <StyledAccordion direction="up">
//     //     <MyAAccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" >
//     //     </MyAAccordionSummary>
//     //     <MyAccordionDetails >
//     //       <p style={{border:'2px solid'}}>hgjhfhjfvhjf</p>
//     //       <p>hgjhfhjfvhjf</p>
          
//     //     </MyAccordionDetails>
//     //   </StyledAccordion>
//     //   </div>
//     // );


// export default Home;












// // import { FloatingWhatsApp } from 'react-floating-whatsapp'

//  // <FloatingWhatsApp phoneNumber="0525525810" accountName="Shift" chatMessage="test" />

//    // return(
//     //     <div>
//     //         <h1>Wellcome to SHIFT</h1>
//     //         <MUsers />
//     //         <a href="https://wa.me/972525525810?text=hi" target='_blank'>WhatsApp</a>
//             // {/* {WhatsAppLink({phone:'0525525810',message:'Message from React'})} */}
//     //     </div>
//     // ) 

//         {/* //         <a href="https://api.callmebot.com/whatsapp.php?phone=972524324451&text=This+is+another+test&apikey=7947620" target='_blank'>Send WhatsApp</a> */}

//          // <FontAwesomeIcon icon={solid("square-whatsapp")} beat />      
//         // <FontAwesomeIcon icon={faEnvelope}  /> 
             






        





