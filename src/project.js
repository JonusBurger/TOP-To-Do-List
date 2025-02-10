import dateHandler from "./dateHandler"

const dateHandlerInstance = dateHandler(); // Call the function to get the object

export default class Project {

    constructor(title, date = undefined, toDos = [], done = false) {
        this.title = title;
        this.date = date;
        this.toDos = toDos;
        this.color = undefined;
        this.numberOfToDos = this.toDos.length;
        this.done = done;
    }

    get getTitle() {
        return this.title
    }  

    set setTitle(newTitle) {
        this.title = newTitle;
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

    updateNumberOfToDos() {
        this.numberOfToDos = this.toDos.length;
    }

    countNumberOfToDosDone() {
        let numberOfToDosDone = 0;
        this.toDos.forEach(function(toDo) {
            if (toDo.done) {
                numberOfToDosDone++;
            }
        })
        return numberOfToDosDone
    }

    get getToDos() {
        return this.toDos
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
        this.updateNumberOfToDos();
    }

    sortToDos() {
        this.toDos.sort(function(a,b) {
            if (!a.date) {
                return -1
            }
            if (!b.date) {
                return 1
            }
            return dateHandlerInstance.compareDates(a.date, b.date);
        })
    }

    finishProject() {
        if ((this.countNumberOfToDosDone() == this.numberOfToDos) && !this.done) {
            console.log("Project finished!");
            this.done = true;
        } else {
            this.done = false;
            console.log("Project open!");
        }
    }
}