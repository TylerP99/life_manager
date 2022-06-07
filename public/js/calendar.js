const SUNDAY = "Sunday";
const MONDAY = "Monday";
const TUESDAY = "Tuesday";
const WEDNESDAY = "Wednesday";
const THURSDAY = "Thursday";
const FRIDAY = "Friday";
const SATURDAY = "Saturday";



class Calendar {
    constructor() {
        this.currMonth = "July";
        this.currYear = "2021";
    }

    calcFirstDayOfCurrMonth() {
        const day = 1; //Always first day
        const month = getNumericMonthAdjusted(this.currMonth);
        const year = this.currYear % 100;
        const century = Math.floor(this.currYear/100);

        //Using formula: Weekday = (day + floor(2.6*month - 0.2) - 2*century + year + floor(y/4) + floor(century/4))mod7
        //Month = March:1 , April:2, ..., December:10, January:11, February:12
        //From: https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html

        let weekday = (day + Math.floor(2.6*month - 0.2) - 2*century + year + Math.floor(year/4) + Math.floor(century/4))%7;


        switch(weekday) {
            case 0:
                weekday = "Sunday";
                break;
            case 1:
                weekday = "Monday";
                break;
            case 2:
                weekday = "Tuesday";
                break;
            case 3:
                weekday = "Wednesday";
                break;
            case 4:
                weekday = "Thursday";
                break;
            case 5:
                weekday = "Friday";
                break;
            case 6:
                weekday = "Saturday";
                break;
            default:
                console.error("AAAA");
                weekday = undefined
                break;
        }

        return weekday;
    }
}

//Helper Functions
function daysInMonth(month, year) {
    month = month.toLowerCase();
    switch(month) {
        case "january": case "march": case "may": case "july": case "august": case "october": case "december":
            return 31;
            break;
        case "april": case "june": case "september": case "november":
            return 30;
            break;
        case "february":
            if(year%100 == 0)
            {
                if(year%400 == 0)
                {
                    return 29; //Leap year
                }
            }
            else if(year%4 == 0)
            {
                return 28;
            }
    }
}

function getNumericMonthAdjusted(month) {
    month = month.toLowerCase();

    switch(month) {
        case "march":
            return 1;
        case "april":
            return 2;
        case "may":
            return 3;
        case "june":
            return 4;
        case "july":
            return 5;
        case "august":
            return 6;
        case "september":
            return 7;
        case "october":
            return 8;
        case "november":
            return 9;
        case "december":
            return 10;
        case "january":
            return 11;
        case "february":
            return 12;
        default:
            console.error("Invalid month passed");
            return 0;
    }
}

//What does a calendar need?
//Title section for month and year
//Row for each day
//5 rows for each possible week
//Will be used with tasks class

let cal = new Calendar;

console.log(cal.calcFirstDayOfCurrMonth())