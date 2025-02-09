import { format, isDate, isFuture, isPast} from "date-fns"

const DATEFORMAT = "dd/MM/yyyy";

export default function dateHandler() {
    
    // getDate

    // setDate

    // getToday
    function getToday() {
        let today = new Date();
        today = format(today, DATEFORMAT);
        return today;
    }

    // validateDate

    // checkOverdueDate

    return { getToday }
}
