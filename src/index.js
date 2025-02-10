import Note from "./note";
import ToDo from "./to-do";
import Project from "./project";

const newNote = new Note("Jo", "das ist ein Text");
console.log(newNote.getDate);
console.log(newNote.getTitle);
console.log(newNote.getDescription);

const newToDo = new ToDo("Platz 1", "HELP", "low");
console.log(newToDo.getDate);
console.log(newToDo.getTitle);
console.log(newToDo.getDescription);

newToDo.addNote(newNote);
console.log(newToDo.getNotes);

const newToDo2 = new ToDo("Platz 3", "HELP", "low", "2004-11-18");
console.log(newToDo2.getDate);

const newToDo3 = new ToDo("Platz 2", "HELP", "low", "2020-11-18");
console.log(newToDo3.getDate);

const newProject = new Project("Testprojekt");
console.log(newProject.countNumberOfToDosDone())

newProject.addToDo(newToDo);
newProject.addToDo(newToDo2);
newProject.addToDo(newToDo3);
console.log(newProject.numberOfToDos);

newProject.sortToDos();


newProject.toDos.forEach(function(toDo) {
    console.log(toDo.title);
})