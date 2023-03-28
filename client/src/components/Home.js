import MUsers from "./manager/MUsers";
import WhatsAppLink from "../utils/WhatsAppLink";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'


const Home = ()=>{
    return (
       
        <i class="fa-brands fa-square-whatsapp fa-beat fa-2xl" style={{color:'greenyellow'}}></i>
        // <FontAwesomeIcon icon={solid("square-whatsapp")} beat />      
        // <FontAwesomeIcon icon={faEnvelope}  /> 
             
    )
}
export default Home;








// import { FloatingWhatsApp } from 'react-floating-whatsapp'

 // <FloatingWhatsApp phoneNumber="0525525810" accountName="Shift" chatMessage="test" />

   // return(
    //     <div>
    //         <h1>Wellcome to SHIFT</h1>
    //         <MUsers />
    //         <a href="https://wa.me/972525525810?text=hi" target='_blank'>WhatsApp</a>
    //         {/* {WhatsAppLink({phone:'0525525810',message:'Message from React'})} */}
    //     </div>
    // ) 