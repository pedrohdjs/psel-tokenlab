/**
 * @param {number} year A year
 * @param {number} month A month (months indexed from 0 to 11)
 * @returns {number} the number of days in the given month in the given year
 */
const daysInMonth = function (year,month){
    /*Since the day is 0, this date is actually the last day of the month previous to the month
    passed. Javascript uses months indexed from 0 to 11, so this returns the last day of the next
    month of the previous month, which is the given month.*/
    return new Date(year, month+1, 0).getDate();
}

/**
 * @param {number} year A year
 * @param {number} month A month (months indexed from 0 to 11)
 * @returns {number} a number from 0 to 6 representing the first weekday in the month.
 */
const firstWeekdayInMonth = function(year, month){
    return new Date(year,month,1).getDay()
}

/**
 * @param {number} year A year
 * @param {number} month A month (months indexed from 1 to 12)
 * @returns {[number,number]}, the year of the next month and the next month
 */
const nextMonth = function(year, month){
    year = Number(year);
    month = Number(month);
    if (month === 12){
        return [year+1,1];
    }
    else 
        return [year, month+1];
}

/**
 * @param {number} year A year
 * @param {number} month A month (months indexed from 1 to 12)
 * @returns {[number,number]}, the year of the previous month and the previous month
 */
const previousMonth = function(year, month){
    year = Number(year);
    month = Number(month);
    if (month === 1){
        return [year-1,12];
    }
    else 
        return [year, month-1];
}

module.exports =  {
    daysInMonth: daysInMonth,
    firstWeekdayInMonth: firstWeekdayInMonth,
    nextMonth: nextMonth,
    previousMonth: previousMonth
}