import buildPage from "./buildPage"

const buildPageInstance = buildPage();

export default function ProjectPage(project) {
    
    buildPageInstance.clearArea();
    buildPageInstance.highlightElement(project.id);

    const overDueToDos = project.getOverDueToDos();

    if (overDueToDos) {
        buildPageInstance.createMainHeader("Overdue To-Dos");
        for (let toDo of overDueToDos) {
            buildPageInstance.appendToDo(toDo, true);
        }
    }


    const notOverDueToDos = project.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);
}