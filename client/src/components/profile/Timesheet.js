import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Timesheet = () => {
    const weekHeaders = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const percentageHeaders = ['100%', '125%', '150%', '200%'];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const bgList = ["#f8f2f7", "#ead9e7", "#dcc0d7", "#cea7c7"];
    const bgMonthList = ['#c5a1cd', '#b88cc2', '#ab77b8', '#9f62ad']

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);

    // Generate an array of years from 2020 to current year
    const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, index) => new Date().getFullYear() - index);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const displayTimesheet = ()=>{}
    const getData =  async()=>{
        try{
            const apiRes = await axios.get('https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=5&ss=off&mf=off&c=on&geo=city&city=IL-Jerusalem&M=on&s=off');
            console.log(apiRes);
        }catch(e){
            console.log(e);
        }
    }    

    useEffect(()=>{
        getData();
    },[])


    return (
        <div>
            <form onSubmit={displayTimesheet}>
                <Select sx={{ '& .MuiSelect-select': { padding: '5.5px' } }} value={selectedMonth || 'Choose Month'} onChange={handleMonthChange}>
                    {months.map((monthName, index) => <MenuItem value={index}>{monthName}</MenuItem>)}
                </Select>
                <Select sx={{ '& .MuiSelect-select': { padding: '5.5px' } }} value={selectedYear} onChange={handleYearChange}>
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </form>
            <Table sx={{ maxWidth: '800px', margin: '0 auto' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', padding: 0 }}>
                            {selectedYear}
                        </TableCell>
                        {weekHeaders.map((weekHeader) => (
                            <TableCell key={weekHeader} colSpan={4} sx={{ fontWeight: 'bold', borderRight: '2px solid', textAlign: 'center' }}>
                                {weekHeader}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', padding: 0 }}>
                            {selectedMonth}
                        </TableCell>
                        {weekHeaders.map((weekHeader) =>
                            percentageHeaders.map((percentageHeader) => (
                                <TableCell key={`${weekHeader}-${percentageHeader}`} sx={{ fontWeight: 'bold', fontSize: '15px', '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }}>
                                    {percentageHeader}
                                </TableCell>
                            ))
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {daysOfWeek.map((day) => (
                        <TableRow key={day}>
                            <TableCell>{day}</TableCell>
                            {Array.from({ length: weekHeaders.length }).map(() => (bgList.map(color =>
                                <TableCell key={`${day}-${Math.random()}`} bgcolor={color} sx={{ '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }} />)
                            ))}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Weekly Hours</TableCell>

                        {Array.from({ length: weekHeaders.length }).map(() => (bgList.map(color =>
                            <TableCell key={`total-weekly-hours-${Math.random()}`} bgcolor={color} sx={{ '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }} />
                        )

                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Month Hours</TableCell>

                        {bgMonthList.map((color, index) =>
                            <TableCell key={index} bgcolor={color} sx={{ color: 'white', '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }} />
                        )
                        }
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Timesheet;







