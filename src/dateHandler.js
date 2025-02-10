import { format, isDate, isFuture, isPast, compareAsc } from "date-fns"

const DATEFORMAT = "dd/MM/yyyy";

export default function dateHandler() {
    // getDate

    // setDate
    function setDate(date) {
        let targetDate = new Date(date);
        targetDate = format(targetDate, DATEFORMAT);
        return targetDate
    }

    // getToday
    function getToday() {
        let today = new Date();
        today = format(today, DATEFORMAT);
        return today;
    }

    // compareDates
    function compareDates(date1, date2) {
        return compareAsc(date1, date2)
    }

    // validateDate

    // checkOverdueDate

    return { getToday, setDate, compareDates }
}
