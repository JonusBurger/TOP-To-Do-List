import { format, isDate, isFuture, isPast} from "date-fns"

export default function dateHandler() {
    const dateFormat = "dd/MM/yyyy";
// getDate

// setDate

// getToday
function getToday() {
    let today = new Date();
    today = format(today, dateFormat);
    return today;
}

// validateDate

// checkOverdueDate

return { getToday }
}
