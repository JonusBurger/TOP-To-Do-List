import buildPage from "./buildPage"
import addFormElements from "../formHandler/addFormElements";

const buildPageInstance = buildPage();

export default function HomePage(userInfo) {


    const addFormElementsInstance = addFormElements(userInfo)
    buildPageInstance.clearArea();

    const overDueToDos = userInfo.getAllOverDueToDos();

    if (overDueToDos.length > 0) {
        buildPageInstance.createMainHeader("Overdue To-Dos");
    } else {
        buildPageInstance.createMainHeader("No Date", true);
    }
    
    initilizeHeader();

    for (let toDo of overDueToDos) {
        buildPageInstance.appendToDo(toDo, true);
    }


    const notOverDueToDos = userInfo.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);

    buildPageInstance.highlightElement("Homepage");

    addFormElementsInstance.attachAddToDoListener();
    addFormElementsInstance.addToDoEditEventLister();

    function initilizeHeader() {
        const headerDiv = document.createElement("div");
        headerDiv.innerText = "Hier steht ein Motivationsspruch"
        buildPageInstance.createHeaderDiv(headerDiv);
    }
}