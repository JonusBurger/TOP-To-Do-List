import { format, isDate, isFuture, isPast, compareAsc } from "date-fns"

const DATEFORMAT = "dd/MM/yyyy";

export default function dateHandler() {
    // getDate
    function formatDate(date) {
        if (date) {
            const formatedDate = format(date, DATEFORMAT)
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
        if (!date1) {
            return 1
        }
        if(!date2) {
            return -1
        }
        return compareAsc(new Date(date1), new Date(date2))
    }

    // validateDate

    // checkOverdueDate
    function validateDate(date) {
        return isPast(new Date(date))
    }
    return { getToday, setDate, compareDates, formatDate, validateDate }
}
