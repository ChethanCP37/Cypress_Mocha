import moment from 'moment'; // to work on time and dates

class Helper {

    getTodaysDate() {
        //get todays date in DD-MM-YYYY format
        var today = new Date();
        return moment(today).format("DD/MM/YYYY");;
    }

    getTomorrowsDate() {
        //get tomorrows date in DD-MM-YYYY format
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return moment(date).format("DD/MM/YYYY");
    }

    getDayAfterTomorrowsDate() {
        //get day after tomorrows date in DD-MM-YYYY format
        var date = new Date();
        date.setDate(date.getDate() + 2);
        return moment(date).format("DD/MM/YYYY");
    }

    getYesterdaysDate() {
        //get day after tomorrows date in DD-MM-YYYY format
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return moment(date).format("DD/MM/YYYY");
    }

    getCurrentDateAndTimeInMiliseconds() {
        //Return the current date and time in miliseconds
        return Date.now();
    }

    getRandowmNumber(){
        return Math.floor((Math.random() * 99999) + 1)
    }
}
export default Helper
