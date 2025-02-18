export default function buildFormElement() {
    const formElement = document.getElementById("formContainer");

    const addNoteFormElement = document.getElementById("noteBox");
    const addNoteBox = document.querySelector(".addNoteBox");
    const addNoteButton = document.getElementById("addNoteBtn");
    const cancelFormButton = document.getElementById("cancelBtn");

    function changeFormState() {
        formElement.style.display === "grid" ? formElement.style.display = "none" : formElement.style.display = "grid";
    }

    function changeAddNoteFormElement(on) {
        if (on) {
            addNoteFormElement.style.display = "flex";
        } else {
            addNoteFormElement.style.display = "none"
        }   
    }

    function changeAddNoteButton(on) {
        if (on) {
            addNoteBox.style.display = "flex";
        } else {
            addNoteBox.style.display = "none"
        }       
    }

    function handleNoteAddFormElements(on) {
        if (on) {
            changeAddNoteButton(1);
            changeAddNoteFormElement(0);
        } else {
            changeAddNoteButton(0);
            changeAddNoteFormElement(1);
        }
    }

    // add NoteForm
    function handleAddNoteFormButton(e) {
        e.preventDefault();
        handleNoteAddFormElements(1);
        addNoteButton.removeEventListener("click", handleAddNoteFormButton);
        addNoteBox.addEventListener("click", handleAddNoteButton);
    }

    // Add NoteButton
    function handleAddNoteButton() {
        handleNoteAddFormElements(0); 
        addNoteBox.removeEventListener("click", handleAddNoteButton);
        addNoteButton.addEventListener("click", handleAddNoteFormButton);
    }

    function cancelButton(e) {
        e.preventDefault();
        changeFormState()
    }

    function handleNoteFormInput() {
       // Function for validating input of fields! 
    }
   

    function createToDo(project = "none") {
        console.log("button pressed");
        changeFormState();
        cancelFormButton.addEventListener("click", cancelButton);
        handleNoteAddFormElements(1);
        addNoteBox.addEventListener("click", handleAddNoteButton);
        const storeNotes = []
    }

    return { createToDo }
}