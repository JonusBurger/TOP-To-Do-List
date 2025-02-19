import buildPage from "./buildPage"
import addFormElements from "../formHandler/addFormElements";

const buildPageInstance = buildPage();

export default function HomePage(userInfo) {
    const addFormElementsInstance = addFormElements(userInfo)
    buildPageInstance.clearArea();
    buildPageInstance.createMainHeader("Overdue To-Dos", userInfo);

    addFormElementsInstance.attachAddToDoListener();
    const overDueToDos = userInfo.getAllOverDueToDos();

    for (let toDo of overDueToDos) {
        buildPageInstance.appendToDo(toDo, true);
    }

    const notOverDueToDos = userInfo.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);

    buildPageInstance.highlightElement("Homepage");

}