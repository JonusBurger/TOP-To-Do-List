import dateHandler from "./dateHandler"
import {v4 as uuidv4} from 'uuid';

const dateHandlerInstance = dateHandler(); // Call the function to get the object
const PRORITYOPTIONS = ["low", "medium", "high"]; // List of available priority options

export default class ToDo {
    
    // Properties
    constructor(title, description, priority = "medium", date = undefined, done = false, notes = [], id = undefined) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date ? dateHandlerInstance.setDate(date) : date;
        this.done = done;
        this.notes = notes; 
        this.id =  id ? id : uuidv4();
      }

    get getTitle() {
        return this.title
    }  

    set setTitle(newTitle) {
        if (!this.done) {
            this.title = newTitle;
        }
    }

    get getDescription() {
        return this.description
    }

    set setDescription(newDescription) {
        if (!this.done) {
            this.description = newDescription;
        }
    }

    get getPriority() {
        return this.priority
    }

    set setPriority(newPriority) {
        if (newPriority in PRORITYOPTIONS && !this.done) {
            this.priority = newPriority;
        }
    }

    get getDate() {
        return this.date
    }

    getDateFormated() {
        return dateHandlerInstance.formatDate(this.date)
    }

    set setDate(newDate) {
        if (!this.done) {
            this.date = dateHandlerInstance.setDate(newDate);
        }
        
    }

    get getNotes() {
        return this.notes
    }

    addNote(note) {
        if (!this.done) {
            this.notes.push(note);
        }
    }

    changeDoneState() {
        this.done = this.done ? false : true;
    }

}