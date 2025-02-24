import buildPage from "./buildPage"
import addFormElements from "../formHandler/addFormElements";

const buildPageInstance = buildPage();

export default function ProjectPage(project, userInfo) {
    
    const addFormElementsInstance = addFormElements(userInfo, project)
    buildPageInstance.clearArea();
    initilizeHeader();
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

    addFormElementsInstance.attachAddToDoListener();
    addFormElementsInstance.attacheditProjectEventListener();

    function initilizeHeader() {
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("projectHeader");

        const formatDiv = document.createElement("div");

        const projectTitle = document.createElement("div");
        projectTitle.innerText = project.getTitle;

        const editButton = document.createElement("button");
        editButton.classList.add("button");
        editButton.id = "btnEditProject";
        editButton.innerText = "Edit";

        headerDiv.appendChild(formatDiv);
        headerDiv.appendChild(projectTitle);
        headerDiv.appendChild(editButton);
        buildPageInstance.createHeaderDiv(headerDiv);
    }
}