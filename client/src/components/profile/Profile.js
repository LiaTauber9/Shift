// import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { ratedHours } from '../../utils/timeSheet';

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const month = "January";
// const columns = [month,'Week 1','Over-Time', 'Week 2', 'Over-Time', 'Week 3', 'Over-Time', 'Week 4','Over-Time', 'Week 5','Over-Time', 'Week 6','Over-Time'];
// const rows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Total Weekly Hours'];

// const styles = {
//   table: {
//     minWidth: 650,
//     borderCollapse: 'collapse',
//   },
//   tableHeadCell: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     border: '1px solid black',
//     padding: '10px',
//   },
//   tableCell: {
//     border: '1px solid black',
//     padding: '10px',
//     textAlign: 'center',
//   },
// };

// // function EmployeeTimesheetTable() {
// function Profile() {
//   return (
//     <>
//     <Table style={styles.table}>
//       <TableHead>
//         <TableRow>
//           {columns.map((column, index) => (
//             <TableCell key={index} style={styles.tableHeadCell}>
//               {column}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {
//         rows.map((day, dayIndex) => (
//           <TableRow key={dayIndex}>
//             <TableCell style={styles.tableCell}>{day}</TableCell>
//             {Array.from({ length: 12 }).map((_, dayOfWeekIndex) => (
//               <TableCell key={dayOfWeekIndex} style={styles.tableCell}>
//                 {}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))
//         }
//         <TableRow>
//           <TableCell colSpan={2} style={styles.tableCell}>
//             Total Regular Hours
//           </TableCell>
//           <TableCell colSpan={1} style={styles.tableCell}>
//             {}
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell colSpan={2} style={styles.tableCell}>
//             Total Over-Time Hours
//           </TableCell>
//           <TableCell colSpan={1} style={styles.tableCell}>
//             {}
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>

//     <EmployeeTimesheetTable />
//     </>
//   );
// }




// const EmployeeTimesheetTable = () => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const totalHours = [160, 160, 160, 160, 160, 160, 160];
//   const overtimeHours = [0, 0, 0, 0, 0, 0, 0];

//   const createTableRows = () => {
//     let tableRows = [];

//     for (let i = 0; i < 7; i++) {
//       let row = [];
//       row.push(<TableCell>{days[i]}</TableCell>);

//       for (let j = 0; j < 12; j++) {
//         if (j === 8) {
//           row.push(<TableCell>Total Weekly Hours</TableCell>);
//         } else if (j > 8) {
//           let weekIndex = j - 9;
//           row.push(<TableCell>{totalHours[weekIndex]}</TableCell>);
//           row.push(<TableCell>{overtimeHours[weekIndex]}</TableCell>);
//         } else {
//           row.push(<TableCell>{i + 1}</TableCell>);
//         }
//       }

//       tableRows.push(<TableRow>{row}</TableRow>);
//     }

//     return tableRows;
//   };

//   const createTableHeader = () => {
//     let tableHeader = [];
//     tableHeader.push(<TableCell></TableCell>);

//     for (let i = 0; i < 12; i++) {
//       if (i === 8) {
//         tableHeader.push(<TableCell></TableCell>);
//       } else if (i > 8) {
//         let weekIndex = i - 9;
//         tableHeader.push(<TableCell>{weeks[weekIndex]}</TableCell>);
//         tableHeader.push(<TableCell>Over-Time</TableCell>);
//       } else {
//         tableHeader.push(<TableCell>{months[i]}</TableCell>);
//       }
//     }

//     return tableHeader;
//   };

//   useEffect(()=>{
//     const shift = {date:'2023-05-05', day:5, start_at:'15:00:00', end_at:'03:00:00'}
//     console.log(ratedHours(shift));
//   },[])

//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {createTableHeader()}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {createTableRows()}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // export default EmployeeTimesheetTable;


// export default Profile;









import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const Profile = () => {
    const weekHeaders = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const percentageHeaders = ['100%', '125%', '150%', '200%'];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const bgList = ["#f8f2f7", "#ead9e7", "#dcc0d7", "#cea7c7"];
    const bgMonthList = ['#c5a1cd', '#b88cc2', '#ab77b8', '#9f62ad']

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()-1);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

    // Generate an array of years from 2020 to current year
    const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, index) => new Date().getFullYear() - index);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };






    return (
        <Table sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold',padding:0 }}>
                        <Select sx={{'& .MuiSelect-select':{padding:'5.5px'}}} value={selectedYear} onChange={handleYearChange}>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </TableCell>
                    {weekHeaders.map((weekHeader) => (
                        <TableCell key={weekHeader} colSpan={4} sx={{ fontWeight: 'bold', borderRight: '2px solid', textAlign: 'center' }}>
                            {weekHeader}
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold',padding:0 }}>
                        <Select sx={{'& .MuiSelect-select':{padding:'5.5px'}}} value={month||'Choose Month'} onChange={handleMonthChange}>
                            {months.map((monthName,index)=> <MenuItem value={index}>{monthName}</MenuItem> )}
                        </Select>
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
    );
};

export default Profile;







