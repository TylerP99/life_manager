module.exports = class Date_Formatter extends Date
{
    constructor(date) {
        super();
        this.date = this.get_date(date);
        this.time = this.get_time(date);

        console.log("Converting" + date + " to " + this.get_date_and_time());
    }

    get_date(date) {
        const day = date.getDate(); // Returns day of month
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return String(month) + "-" + String(day) + "-" + String(year);
    }

    get_time(date) {
        const hours = add_leading_zeroes(this.convert_twelve_hour_time(date.getHours()), 2);
        const minutes = add_leading_zeroes(date.getMinutes(), 2);
        const ampm = this.get_am_pm(date.getHours());

        return String(hours) + ":" + String(minutes) + " " + String(ampm);
    }

    convert_twelve_hour_time(hours) {
        return (hours > 12) ? hours-12 : hours;
    }

    get_am_pm(hours) {
        return (hours-12 < 0) ? "AM" : "PM"
    }

    get_date_and_time()
    {
        return String(this.date) + " " + String(this.time);
    }
}
// str- string to be editted
// num- target length of string
function add_leading_zeroes(str, num)
{
    str = String(str);

    while(str.length <  num) {
        str = "0" + str;
    }

    return str;
}