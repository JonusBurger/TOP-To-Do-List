import buildPage from "./buildPage"

const buildPageInstance = buildPage();

export default function HomePage(userInfo) {
    
    buildPageInstance.clearArea();
    buildPageInstance.createMainHeader("Overdue To-Dos");

    const overDueToDos = userInfo.getAllOverDueToDos();

    for (let toDo of overDueToDos) {
        buildPageInstance.appendToDo(toDo, true);
    }

    const notOverDueToDos = userInfo.getAllToDosNotOverdue();

    buildPageInstance.createDateSortedToDos(notOverDueToDos);

}