import * as React from 'react';
import { styled, withTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

// const StyledBadge = styled(Stack)(({ theme }) => ({
//         backgroundColor: '#44b700',
//         color: '#44b700',
//         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//         '&::after': {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             borderRadius: '0%',
//             animation: 'ripple 1.2s infinite ease-in-out',
//             border: '1px solid currentColor',
//             content: '""',
//     },
//     '@keyframes rippleA': {
//         '0%': {
//             border :'0px dashed green'
//         },
//         '100%': {
//             border :'4px dashed green'
//         },
//     },
// }));

const SmallAvatar = styled(MessageRoundedIcon)(({ theme }) => ({
    width: 18,
    height: 18,
    // background:'white',
    color: 'black',
}));

const BadgeAvatars = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={
                    // <StyledBadge >
                    <SmallAvatar />
                    // </StyledBadge>
                }
            >
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </Badge>
        </Stack>
    );
}

const CommentedAvatar = ()=>{
    const isCom = true;
    return(
        <Avatar 
        sx={isCom?{
            border:'3px dashed black',
            animation: 'rippleA 1.2s infinite',
            '@keyframes rippleA': {
                '0%': {
                    border :'1px dashed black'
                },
                '50%': {
                    border :'2px dashed black'
                },
                '100%': {
                    border :'1px dashed black'
                }
            },        
        }:{}}>LT</Avatar>
    )
}


const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <BadgeAvatars />
            <p></p>
            <CommentedAvatar/>
        </div>
    )


}
export default Profile