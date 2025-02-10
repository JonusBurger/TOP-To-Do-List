import { format, isDate, isFuture, isPast, compareAsc } from "date-fns"

const DATEFORMAT = "dd/MM/yyyy";

export default function dateHandler() {
    // getDate
    function formatDate(date, DATEFORMAT) {
        if (date) {
            let formatedDate = new Date(`${date}`);
            console.log(date.getYear())
            console.log(Object.getPrototypeOf(date))
            formatedDate = format(date, DATEFORMAT)
            return formatedDate
        }
        return undefined
    }
    // setDate
    function setDate(date) {
        let targetDate = new Date(date);
        return targetDate
    }

    // getToday
    function getToday() {
        let today = new Date();
        return today;
    }

    // compareDates
    function compareDates(date1, date2) {
        return compareAsc(new Date(date1), new Date(date2))
    }

    // validateDate

    // checkOverdueDate

    return { getToday, setDate, compareDates, formatDate }
}
