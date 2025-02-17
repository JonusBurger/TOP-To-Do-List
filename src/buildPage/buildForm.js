export default function buildFormElement() {
    const formElement = document.getElementById("formContainer");

    const addNoteFormElement = document.getElementById("noteBox");
    const addNoteBox = document.querySelector(".addNoteBox");
    const addNoteButton = document.getElementById("addNoteBtn");
    const cancelFormButton = document.getElementById("cancelBtn");

    function changeFormState() {
        formElement.style.display === "grid" ? formElement.style.display = "none" : formElement.style.display = "grid";
    }

    function changeAddNoteState() {
        addNoteBox.style.display === "block" ? "none" : "block";
    }

    function changeAddNoteFormElement() {
        addNoteFormElement.style.display === "block" ? "none" : "block";
    }

    function changeAddNoteButton() {
        addNoteBox.style.display === "block" ? "none" : "block";
    }

    function handleAddNoteFormElement(e) {
        e.preventDefault()
        // value of Form gets submitted and stored // handle stuff
    }

    // Add Note Form Element
    function showAddNoteFormElement(inputBool) {
        // Eventlistener is added to Note Element
        if (inputBool) {
            // Note Form Element gets contrcuted
            changeAddNoteFormElement();
            addNoteFormElement.addEventListener("click", handleAddNoteFormElement(e));
            // Add Note Form Element gets disabled
        } else {
            changeAddNoteFormElement();
            addNoteFormElement.removeEventListener("click", handleAddNoteFormElement);
        }
    }

    // Add Note
    function showAddNoteButton(inputBool) {
        if (inputBool) {
            showAddNoteFormElement(false);
            // Add NoteButton is displayed
            changeAddNoteButton()
            addNoteBox.addEventListener("click", showAddNoteFormElement(true))
        } else {
            changeAddNoteButton();
            addNoteBox.removeEventListener("click", showAddNoteFormElement);
        }       
         
    }
   

    function createToDo(project = "none") {
        console.log("button pressed");
        changeFormState();
        cancelFormButton.addEventListener("click", changeFormState);
    }

    return { createToDo }
}