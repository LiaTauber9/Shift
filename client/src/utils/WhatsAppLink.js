import React from "react";
import { Link } from "react-router-dom";

const WhatsAppLink = ({phone,message})=>{
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    return(
        <Link to={url}>
            Send message via WhatsApp
        </Link>
    )
}

export default WhatsAppLink