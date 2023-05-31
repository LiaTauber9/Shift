import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/elephantsql.js';
import users_router from './routes/Users.js';
import week_router from './routes/Week.js';
import timesheet_router from './routes/Timesheet.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();
const app = express();
const buildPath = path.join(__dirname,'..','client','build');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(buildPath));
app.use(users_router);
app.use(week_router);
app.use(timesheet_router)

app.get('*',(req,res)=>{
  res.sendFile(path.join(buildPath,'index.html'))
})

app.listen(process.env.PORT||8080, ()=>{
  console.log(`run on ${process.env.PORT||8080}`);
})

try {
  await db.authenticate();
  console.log('Database conneted... ');
}
catch(e){
  console.log(e);
}

