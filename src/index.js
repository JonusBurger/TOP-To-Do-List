import "./style.css";

import Note from "./note";
import ToDo from "./to-do";
import Project from "./project";
import dateHandler from "./dateHandler"
import UserInfo from "./userInfo"
import buildHomePage from "./buildPage/buildHomepage";
import buildSidebar from "./buildPage/buildSidebar";

const dateHandlerInstance = dateHandler(); // Call the function to get the object

const buildSidebarInstance = buildSidebar();

const newNote = new Note("Jo", "das ist ein Text");

// add Default Project
const defaultProject = new Project("default");

const newToDo = new ToDo("Platz 1", "HELP", "low");
newToDo.addNote(newNote);
newToDo.addNote(newNote);
newToDo.addNote(newNote);
const newToDo2 = new ToDo("Platz 4", "HELP", "low", "2020-11-18");
const newToDo3 = new ToDo("Platz 2", "HELP", "low", "2004-11-18");

const newProject = new Project("Testprojekt", "2024-04-11");
newProject.addToDo(newToDo);
newProject.addToDo(newToDo2);
newProject.addToDo(newToDo3);

const newToDo4 = new ToDo("Platz 3", "textCase", "medium", "2019-08-18");
const newToDo5 = new ToDo("Platz 6", "testTcass111", "low", "2025-08-18");
const newToDo6 = new ToDo("Platz 5", "dasistEinTest!", "high", "2021-08-18");

const newProject2 = new Project("Testprojekt Number 2");
newProject2.addToDo(newToDo4);
newProject2.addToDo(newToDo5);
newProject2.addToDo(newToDo6);

const toDoStack = ["das", "ist", "ein", "versuch", "für", "viele", "to-Dos", "wie", "sieht", "das", "aus", "seh", "den", "Nerg"]
for (let toDo of toDoStack) {
    const stackToDo = new ToDo(toDo, "JAU", "low", "2025-04-11")
    newProject2.addToDo(stackToDo);
}

const userData = new UserInfo();
userData.addProject(newProject);
userData.addProject(newProject2);

console.log(userData.getAllOverDueToDos());

buildHomePage(userData);
buildSidebarInstance.initializeSidebar(userData);


