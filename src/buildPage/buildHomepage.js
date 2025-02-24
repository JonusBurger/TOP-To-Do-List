import buildPage from "./buildPage"
import addFormElements from "../formHandler/addFormElements";

const buildPageInstance = buildPage();

export default function HomePage(userInfo) {


    const addFormElementsInstance = addFormElements(userInfo)
    buildPageInstance.clearArea();
    buildPageInstance.createMainHeader("Overdue To-Dos", userInfo);
    initilizeHeader();

    
   

    const overDueToDos = userInfo.getAllOverDueToDos();

    for (let toDo of overDueToDos) {
        buildPageInstance.appendToDo(toDo, true);
    }

    const notOverDueToDos = userInfo.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);

    buildPageInstance.highlightElement("Homepage");

    addFormElementsInstance.attachAddToDoListener();

    function initilizeHeader() {
        const headerDiv = document.createElement("div");
        headerDiv.innerText = "Hier steht ein Motivationsspruch"
        buildPageInstance.createHeaderDiv(headerDiv);
    }
}