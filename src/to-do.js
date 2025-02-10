import dateHandler from "./dateHandler"

const dateHandlerInstance = dateHandler(); // Call the function to get the object
const PRORITYOPTIONS = ["low", "medium", "high"]; // List of available priority options

export default class ToDo {
    
    // Properties
    constructor(title, description, priority = "medium", date = undefined, notes = []) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date ? dateHandlerInstance.setDate(date) : date;
        this.done = false;
        this.notes = notes; 
      }

    get getTitle() {
        return this.title
    }  

    set setTitle(newTitle) {
        this.title = newTitle;
    }

    get getDescription() {
        return this.description
    }

    set setDescription(newDescription) {
        this.description = newDescription;
    }

    get getPriority() {
        return this.priority
    }

    set setPriority(newPriority) {
        if (newPriority in PRORITYOPTIONS) {
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
        this.date = dateHandlerInstance.setDate(newDate);
    }

    get getNotes() {
        return this.notes
    }

    addNote(note) {
        this.notes.push(note)
    }

    changeDoneState() {
        this.done = this.done ? false : true;
    }

}