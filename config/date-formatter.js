module.exports = class Date_Formatter extends Date
{
    constructor(date) {
        super();
        this.date = this.get_date(date);
        this.time = this.get_time(date);
    }

    get_date(date) {
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        return String(month) + "-" + String(day) + "-" + String(year);
    }

    get_time(date) {
        const hours = add_leading_zeroes(date.getUTCHours() + 1, 2);
        const minutes = add_leading_zeroes(date.getUTCMinutes(), 2);
        const seconds = add_leading_zeroes(date.getUTCSeconds(), 2);
        const ampm = this.get_am_pm(date.getHours()+1);
        return String(hours) + ":" + String(minutes) + ":" + String(seconds) + " " + String(ampm);
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