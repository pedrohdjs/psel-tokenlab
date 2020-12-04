const nextDay = function (year,month,day){
    const today = new Date(year,month-1,day,0,0,0,0);
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 2);
    return [tomorrow.getFullYear(),tomorrow.getMonth()+1,tomorrow.getDate()];

}


module.exports = nextDay;
