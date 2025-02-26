import buildFormElementToDo from "./buildFormToDo";
import buildFormElementProject from "./addProject";

export default function addFormElements(userInfo, project = undefined) {
    
    // Handle ToDo
    const createButton = document.getElementById("createBtn");

    const buildFormElementInstance = buildFormElementToDo(userInfo, project);

    function attachAddToDoListener() {
        const btnElement = document.getElementById("addToDoBtn");
        btnElement.addEventListener("click", () => buildFormElementInstance.displayForm());
    }

    function addToDoEditEventLister() {
        const mainArea = document.getElementById("contentArea");

        mainArea.addEventListener("click", (e) => {
            if (e.target.classList.contains("toDoContent")) {
                const parentElement = e.target.parentNode;
                const toDo = userInfo.findToDo(parentElement.id);
                buildFormElementInstance.displayForm(toDo);
            }            
        });
    }

    // Handle Project
    const buildFormElementProjectInstance = buildFormElementProject(userInfo);
    function attachaddProjectEventListener() {
        const btnElement = document.getElementById("btnAddProject");
        btnElement.addEventListener("click", () => buildFormElementProjectInstance.displayForm());
    }

    function attacheditProjectEventListener() {
        const btnElement = document.getElementById("btnEditProject");
        btnElement.addEventListener("click", () => buildFormElementProjectInstance.displayForm(project));
    }

    return { attachAddToDoListener, addToDoEditEventLister, attachaddProjectEventListener, attacheditProjectEventListener }
}