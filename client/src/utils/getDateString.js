function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function getDateString(date,addYear=true,id=false) {
    const joinSimbol = id ? '' : '-'
    if(!addYear){
        return [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-');
    }
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join(joinSimbol);
  }

export default getDateString