import { useState, createContext } from 'react';
// import Profile from './components/profile/Profile';
import Timesheet from './components/profile/Timesheet';
import UpdateProfile from './components/profile/UpdateProfile';
import LoginForm from './components/register-login/LoginForm';
import RegisterForm from './components/register-login/RegisterForm';
import Home from './components/Home';
import Nav from './components/Nav';
import Constraints from './components/week/constraints/Constraints';
import Schedule from './components/week/schedule/Schedule';
import MConstraints from './components/week/mConstraints/MConstraints';
import MUsers from './components/manager/MUsers';
import { Auth } from './auth/Auth';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';

export const AppContext = createContext(null);
export const WeekContext = createContext(null);
export const ManagerContext = createContext(null);

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [usersObj, setUsersObj] = useState({});
  const [constraintsObj, setConstraintsObj] = useState(null);
  const [mConstraintsObj, setMConstraintsObj] = useState({});
  const [scheduleObj, setScheduleObj] = useState({});
  const [allScheduleData, setAllScheduleData] = useState({});
  const [upsertScheduleData, setUpsertScheduleData] = useState({});


  return (
    <BrowserRouter>
      <AppContext.Provider value={{ token, setToken, user, setUser, users, setUsers, usersObj, setUsersObj, }}>
        <WeekContext.Provider value={{ constraintsObj, setConstraintsObj, mConstraintsObj, setMConstraintsObj, scheduleObj, setScheduleObj }}>
          <ManagerContext.Provider value={{ allScheduleData, setAllScheduleData, upsertScheduleData, setUpsertScheduleData }}>
            <div className="App">
              <Nav />
              <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/profile' element={<Profile />} /> */}
                <Route path='/timesheet' element={<Timesheet />} />
                <Route path='/update' element={<UpdateProfile />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/mconstraints' element={<MConstraints type='manager' />} />
                <Route path='/constraints' element={<Auth> <Constraints type='employee' /> </Auth>} />
                <Route path='/schedule' element={<Schedule />} />
              </Routes>
            </div>
          </ManagerContext.Provider>
        </WeekContext.Provider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
