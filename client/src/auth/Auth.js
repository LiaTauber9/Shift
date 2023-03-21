import {useContext,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../App';


export const Auth = (props) => {
    const [redirect, setRedirerct] = useState(false);
    const {token,setToken,user,setUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const verify = async()=>{
            try{
                const respons = await axios.get('./token');
                setToken(respons.data.token);
                setRedirerct(true)
            }catch(e){
                setToken(null);
                navigate('/login');
            }
        }
        verify()
    })

    return (
        redirect ? props.children : null
    )
}