export const getUsersObj = (usersArr)=>{
    const usersObj = {};
    for(let user of usersArr){
        usersObj[user.id]=user;
        usersObj[user.id].name = `${user.first_name[0].toUpperCase()}${user.first_name.slice(1)} ${user.last_name[0].toUpperCase()}`;
        usersObj[user.id].avatat_name = `${user.first_name[0]}${user.first_name[0]}`.toUpperCase();
    }
    usersObj.empty = {
        id: null,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        role: "1",
        color: "",
        active: true,
        name: "1",
        avatat_name:""
    }
    return usersObj
}

export const getName = (usersObj, user_id)=>{
   
   
}

export const getCololr = (usersObj, user_id, opacity='')=>{
    return user_id ? `${usersObj[user_id].color}${opacity}` : ''
}