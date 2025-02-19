import buildPage from "./buildPage"
import addFormElements from "../formHandler/addFormElements";

const buildPageInstance = buildPage();

export default function ProjectPage(project, userInfo) {
    
    const addFormElementsInstance = addFormElements(userInfo, project)
    buildPageInstance.clearArea();
    buildPageInstance.highlightElement(project.id);

    const overDueToDos = project.getOverDueToDos();

    if (overDueToDos) {
        buildPageInstance.createMainHeader("Overdue To-Dos");
        for (let toDo of overDueToDos) {
            buildPageInstance.appendToDo(toDo, true);
        }
    }

    addFormElementsInstance.attachAddToDoListener();


    const notOverDueToDos = project.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);
}