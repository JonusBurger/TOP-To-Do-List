import Note from "./note";
import ToDo from "./to-do";
import Project from "./project";
import dateHandler from "./dateHandler"

const dateHandlerInstance = dateHandler(); // Call the function to get the object

const newNote = new Note("Jo", "das ist ein Text");

const newToDo = new ToDo("Platz 1", "HELP", "low");
newToDo.addNote(newNote);

const newToDo2 = new ToDo("Platz 3", "HELP", "low", "2020-11-18");

const newToDo3 = new ToDo("Platz 2", "HELP", "low", "2004-11-18");

const newProject = new Project("Testprojekt");

newProject.addToDo(newToDo);
newProject.addToDo(newToDo2);
newProject.addToDo(newToDo3);

