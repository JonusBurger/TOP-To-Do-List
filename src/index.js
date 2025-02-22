import "./style.css";

import Note from "./note";
import ToDo from "./to-do";
import Project from "./project";
import dateHandler from "./dateHandler"
import UserInfo from "./userInfo"
import buildHomePage from "./buildPage/buildHomepage";
import buildSidebar from "./buildPage/buildSidebar";
import addFormElements from "./formHandler/addFormElements";
import localStorageHandler from "./localStorageHandler";

const dateHandlerInstance = dateHandler(); // Call the function to get the object

const buildSidebarInstance = buildSidebar();

const localStorageHandlerInstance = localStorageHandler()

const userData = localStorageHandlerInstance.checkForStorage();

const addFormElementsInstance = addFormElements(userData)
addFormElementsInstance.addToDoEditEventLister();
buildHomePage(userData);
buildSidebarInstance.initializeSidebar(userData);



