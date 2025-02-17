export default function buildFormElement() {
    const formElement = document.getElementById("formContainer");

    const addNoteBox = document.querySelector(".addNoteBox");
    const cancelFormButton = document.getElementById("cancelBtn");

    function changeFormState() {
        formElement.style.display === "grid" ? formElement.style.display = "none" : formElement.style.display = "grid";
    }

    function changeAddNoteState() {
        if (addNoteBox.style.display === "static") {
            addNoteBox.style.display = "none";
        } else {
             addNoteBox.style.display = "static";
        }
    }

    function createToDo(project = "none") {
        console.log("button pressed");
        changeFormState();
        cancelFormButton.addEventListener("click", changeFormState);
        changeAddNoteState();
        addNoteBox.addEventListener("click", changeAddNoteState);

    }

    return { createToDo }
}