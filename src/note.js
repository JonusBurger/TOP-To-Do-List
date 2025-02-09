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
    getTitle() {
        return this.title
    }

    getDescription() {
        return this.description
    }

    getDate() {
        return this.date
    }
}