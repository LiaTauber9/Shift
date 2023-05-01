import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
import { styled } from '@mui/material/styles'


export const MCAcordion = styled(Accordion)({
    height: 12,
}
);

export const MCAccordionSummary = styled(AccordionSummary)({
    '& .MuiAccordionSummary-content': {
        justifyContent: 'center',
        flexGrow:0,
        margin:0
    },

    '&.Mui-expanded': {
        minHeight: '12px', // set custom minHeight when expanded
    },
    '& .MuiSvgIcon-root':{fontSize:18},
    height: 12,
    minHeight: 12,    
})

export const MCAccordionDetails = styled(AccordionDetails)({
    padding: '16px 7px',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    backgroundColor:'rgb(234 234 234)',
})



