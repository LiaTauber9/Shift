import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDateString } from '../../utils/week_utils';
import { getShiftData } from '../../utils/timeSheet1';
import { AppContext } from '../../App';


const Timesheet = () => {

    const navigate = useNavigate();

    const {user} = useContext(AppContext);
    const [displayed, setDisplayed] = useState(null);
    const [TimesheetData, setTimesheetData] = useState(null)
    const [detailsHeaders] =useState( ['','Date', 'Day', 'Shift']);
    const [percentageHeaders] = useState(['100%', '125%', '150%','175%']);
    const [daysOfWeek] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const [bgList] = useState(["#f8f2f7", "#ead9e7", "#dcc0d7", "#cea7c7","#c5a1cd"]);
    const [bgMonthList] = useState(['#c5a1cd', '#b88cc2', '#ab77b8', '#9f62ad','#8f529d']);
    const styles = {
        monthSumCell:{ color: 'white', '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }
    }

    

    
    const getRestDays = async () => {
        const {year,month} = displayed;
        const date_start = `${year}-${padTo2Digits(month)}-28`;
        const date_end = `${year}-${padTo2Digits(month + 2)}-01`;
        console.log(date_start,date_end);
        try {
            const { data } = await axios.get('/restDays', {
                params: {
                    date_start,
                    date_end,
                }
            })
            console.log('getRestDays=>',data);
            return data
        }catch(e){console.log(e)}
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    const lastDayOfMonth1 = (year,month)=>{
        const date = new Date(year, month, 1);
      date.setDate(date.getDate() - 1);
      return date.getDate();
    }

    const getMonthlyShifts = async () => {
        const {year,month,daysSum} = displayed;
        // console.log(year,month,daysSum);
        const month_2_d = padTo2Digits(month + 1);
        const daysSum_2_d = padTo2Digits(daysSum);   
        const date_start = `${year}-${month_2_d}-01`;
        const date_end = `${year}-${month_2_d}-${daysSum_2_d}`;
        try {
            const { data } = await axios.get('/monthlySechedul', {
                params: {
                    date_start,
                    date_end,
                    user_id:user.id
                }
            })
            console.log(data);
            return data
        } catch (e) { console.log('getMonthlyShifts error=>', e) }
    }

    
    const displayratedHours = ()=>{
        // let shifts;
        let restDays;
        let holidaysTytles;
        getRestDays()
        .then(res=>{
            restDays = {...res.restDays};
            holidaysTytles = {...res.holidaysTytles}
            console.log('restDays,holidaysTytles=>',restDays,holidaysTytles);

            getMonthlyShifts()
            .then(res=>{
                console.log(res);
                const shiftsData = res.map(shift=>getShiftData(shift,restDays,holidaysTytles));
                const hourCell = (num) => {return num > 0 ? num : ''};
                const ratedSum = {regular:[], extra:[], restRegular:[], restExtra:[]};
                const monthSum = {regular:'', extra:'', restRegular:'', restExtra:''}
                const timesheet = shiftsData.map(shift=>{
                    console.log(shift);
                    for(const key in shift.ratedHours){
                        ratedSum[key].push(shift.ratedHours[key])
                    }
                for(const key in ratedSum){
                    const sum = ratedSum[key].length > 0 ? ratedSum[key].reduce((sum, currentValue) => sum + currentValue, 0) : '';
                    monthSum[key] = sum
                }
                    return{
                    dateCell:shift.date.slice(8,10),
                    tytleCell: shift.tytle,
                    dayCell: daysOfWeek[shift.day],
                    shiftCell: shift.start_at&&shift.end_at ? `${shift.start_at.slice(0,5)} - ${shift.end_at.slice(0,5)}` : '',
                    reg: shift.ratedHours ? hourCell(shift.ratedHours.regular) : '',
                    ext: shift.ratedHours ? hourCell(shift.ratedHours.extra) : '',
                    res_reg: shift.ratedHours ? hourCell(shift.ratedHours.restRegular) : '',
                    res_ext: shift.ratedHours ? hourCell(shift.ratedHours.restExtra) : '',
            }})
                setTimesheetData({timesheet,monthSum})
                console.log(timesheet);
            });
        });
    }

    const selectDisplayedMonth = (year, month)=>{
        const daysSum = lastDayOfMonth1(year,month+1)
        setTimesheetData(null)
        setDisplayed({year,month,daysSum})
    }

    useEffect(()=>{
        if(displayed){
            displayratedHours()
        }
    },[displayed])

    useEffect(()=>{
        if(!user.id){
            navigate('/login')
        }
    },[])


    return (
        <div>
           <ChooseMonth onSubmit={selectDisplayedMonth}/>
        {TimesheetData ?
            <Table sx={{ maxWidth: '800px', margin: '0 auto' }}>
                <TableHead>
                    <TableRow>
                        {
                            detailsHeaders.map((detail, index) =>
                                <TableCell key={index} sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                                    {detail}
                                </TableCell>
                            )}
                        {
                            percentageHeaders.map((percentageHeader, index) =>
                                <TableCell key={index} sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    {percentageHeader}
                                </TableCell>
                            )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {TimesheetData.timesheet.map((day,index) => (
                        <TableRow key={index}>
                             <TableCell sx={{ borderRight: '0.5px solid #9f62ad' }}>{day.tytleCell}</TableCell>
                             <TableCell sx={{ borderRight: '0.5px solid #9f62ad' }}>{day.dateCell}</TableCell>
                             <TableCell sx={{ borderRight: '0.5px solid #9f62ad' }}>{day.dayCell}</TableCell>
                             <TableCell sx={{ borderRight: '0.5px solid #9f62ad' }}>{day.shiftCell}</TableCell>

                             <TableCell bgcolor={bgList[0]} >{day.reg}</TableCell>
                             <TableCell bgcolor={bgList[1]} >{day.ext}</TableCell>
                             <TableCell bgcolor={bgList[2]} >{day.res_reg}</TableCell>
                             <TableCell bgcolor={bgList[3]} >{day.res_ext}</TableCell>
                            {/* {
                                detailsHeaders.map((detail, index) => <TableCell key={index} sx={{ borderRight: '0.5px solid #9f62ad' }} />)
                            }  */}
                            
                            {/* {
                                bgList.map((color, index) => <TableCell key={index} bgcolor={color} />)
                            } */}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} colSpan={4}>Total Monthly Hours</TableCell>
                        <TableCell bgcolor={bgMonthList[0]} sx={styles.monthSumCell} >{TimesheetData.monthSum.regular}</TableCell>
                        <TableCell bgcolor={bgMonthList[1]} sx={styles.monthSumCell} >{TimesheetData.monthSum.extra}</TableCell>
                        <TableCell bgcolor={bgMonthList[2]} sx={styles.monthSumCell} >{TimesheetData.monthSum.restRegular}</TableCell>
                        <TableCell bgcolor={bgMonthList[3]} sx={styles.monthSumCell} >{TimesheetData.monthSum.restExtra}</TableCell>
                        {/* {bgMonthList.map((color, index) =>
                            <TableCell key={index} bgcolor={color} sx={{ color: 'white', '&:nth-of-type(4n +1)': { borderRight: '2px solid' } }} />
                        )
                        } */}
                    </TableRow>
                </TableBody>
            </Table>
        : null
        }
        </div>
        
    );
};

export default Timesheet;


const ChooseMonth = (props)=>{
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
    const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, index) => new Date().getFullYear() - index);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        props.onSubmit(selectedYear,selectedMonth);
    }


    return(
        <form onSubmit={submitForm} style={{ display: 'flex', gap: 20, justifyContent: 'center', border: '1px solid', padding: 'px', width: '300px', margin: '20px auto' }}>
        <Select sx={{ '& .MuiSelect-select': { padding: '5.5px' } }} value={selectedMonth || 'Choose Month'} onChange={handleMonthChange}>
            {months.map((monthName, index) => <MenuItem key={index} value={index}>{monthName}</MenuItem>)}
        </Select>
        <Select sx={{ '& .MuiSelect-select': { padding: '5.5px' } }} value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            ))}
        </Select>
        <Button type="submit">Display</Button>
    </form>
    )
}







