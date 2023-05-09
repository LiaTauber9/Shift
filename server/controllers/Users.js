import Users from '../model/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'


export const register = async(req,res) => {
  const {firstName,lastName,phone,email,password,color} = req.body;

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password,salt);

  try {
    const newUser = await Users.create({
      first_name:firstName.toLowerCase(),
      last_name:lastName.toLowerCase(),
      phone,
      email:email.toLowerCase(),
      password:hash,
      color
    })
    res.json({msg:'Register Succesfull'})

  } catch (e) {
    console.log(e);
    res.status(404).json({msg:'Email already exists'})
  }

}

export const updateProfile = async(req, res)=>{
  const newDetails = req.body;

  try {
    const [update] = await Users.bulkCreate([newDetails],{updateOnDuplicate:['first_name','last_name','phone','email']})
    res.json({msg:'Updated Succesfully'})
    console.log('newDetails=>',newDetails, 'update=>',update)

  } catch (e) {
    console.log(e);
    res.status(404).json({msg:'Error in update profile'})
  }
}


export const login = async (req,res) => {
  try {
    const user = await Users.findAll({
      where:{
        email:req.body.email.toLowerCase()
      }
    });
    const {id,first_name, last_name, email, phone, role, active,color} = user[0]

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if(!match) return res.status(400).json({msg:'Wrong password'});

    const token = jwt.sign({id,email}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 5 * 60
    });

    res.cookie('accessToken',token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000
    });

    res.json({token:token, user:{id ,first_name, last_name, email, phone, role, active, color}})

  } catch (e) {
    console.log(e);
    res.status(404).json({msg:'Email not found'})
  }
}

export const logout = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if(!accessToken) return res.status(204).json({msg:'cleared'})
  res.clearCookie('accessToken');
  res.status(200).json({msg:'cleared'});
}

export const token = (req,res) => {
  const accessToken = req.cookies.accessToken || req.headers['x-access-token'];

  const decode = jwt_decode(accessToken);

  console.log(decode.userId,decode.email);

  const token = jwt.sign({userId:decode.userId,email:decode.email}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 5 * 60 * 1000
  });

  res.cookie('accessToken',token, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000
  });

  res.status(200).json({token:accessToken})
}

export const getUsers = async(req,res)=>{
  const isActive= req.header('active')
  try{
      let response;
      if(isActive){
          response =  await Users.findAll({where:{active:isActive}});
      }else{
          response =  await Users.findAll();
      }
      // console.log(response);
      res.json(response)
  }catch(e){console.log(e)}
 
}





