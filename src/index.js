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

(function initPage() {
    // setup Instances
    const buildSidebarInstance = buildSidebar(); 
    const localStorageHandlerInstance = localStorageHandler();
    const userData = localStorageHandlerInstance.checkForStorage();
    const addFormElementsInstance = addFormElements(userData);
    
    // LandingPage = HomePage
    buildHomePage(userData);

    // Build Sidebar
    buildSidebarInstance.initializeSidebar(userData);
    addFormElementsInstance.attachaddProjectEventListener()
})();







