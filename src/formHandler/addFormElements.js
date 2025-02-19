import buildFormElement from "./buildForm";

export default function addFormElements(userInfo, project = undefined) {
    const buildFormElementInstance = buildFormElement(userInfo);
    
    function attachAddToDoListener() {
        const btnElement = document.getElementById("addToDoBtn");
        btnElement.addEventListener("click", () => buildFormElementInstance.createToDo(project));
    }

    return { attachAddToDoListener }
}