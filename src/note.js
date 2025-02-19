import dateHandler from "./dateHandler"
import {v4 as uuidv4} from 'uuid';

const dateHandlerInstance = dateHandler(); // Call the function to get the object


export default class Note {
    // Properties
    constructor(title, description, date = undefined, id = undefined) {
        this.title = title;
        this.description = description;
        this.date = date ? date : dateHandlerInstance.getToday();
        this.id =  id ? id : uuidv4();
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