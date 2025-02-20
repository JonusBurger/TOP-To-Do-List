import buildFormElement from "./buildForm";

export default function addFormElements(userInfo, project = undefined) {
    const formContainer = document.getElementById("formContainer");
    const formElement = document.getElementById("formMain");

    const createButton = document.getElementById("createBtn");

    const addNoteFormElement = document.getElementById("noteBox");
    const addNoteBox = document.querySelector(".addNoteBox");
    const addNoteButton = document.getElementById("addNoteBtn");
    const cancelFormButton = document.getElementById("cancelBtn");

    const buildFormElementInstance = buildFormElement(userInfo, project);

    function attachAddToDoListener() {
        const btnElement = document.getElementById("addToDoBtn");
        btnElement.addEventListener("click", () => buildFormElementInstance.displayForm());
    }

    return { attachAddToDoListener }
}