import dateHandler from "./dateHandler"

const dateHandlerInstance = dateHandler(); // Call the function to get the object


export default class Note {
    // Properties
    constructor(title, description, date = undefined) {
        this.title = title;
        this.description = description;
        this.date = date ? date : dateHandlerInstance.getToday();
      }

    // Methods
    get getTitle() {
        return this.title
    }

    get getDescription() {
        return this.description
    }

    get getDate() {
        return this.date
    }

    getDateFormated() {
        return dateHandlerInstance.formatDate(this.date)
    }
}