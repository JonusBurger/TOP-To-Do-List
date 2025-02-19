import Note from "../note"
import ToDo from "../to-do"

export default function buildFormElement(userInfo) {
    const formContainer = document.getElementById("formContainer");
    const formElement = document.getElementById("formMain");

    const createButton = document.getElementById("createBtn");

    const addNoteFormElement = document.getElementById("noteBox");
    const addNoteBox = document.querySelector(".addNoteBox");
    const addNoteButton = document.getElementById("addNoteBtn");
    const cancelFormButton = document.getElementById("cancelBtn");

    // Info Storage
    let storeNotes = []
    let activeProjectId = undefined;

    function changeFormState() {
        formContainer.style.display === "grid" ? formContainer.style.display = "none" : formContainer.style.display = "grid";
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

    function setProjectInput(userInfo) {
        const projectTab = document.getElementById("toDoProject");
        const projects = userInfo.getProjects;

        for (let project of projects) {
            const projectOption = document.createElement("option");
            projectOption.value = project.id;
            projectOption.innerText = project.getTitle;
            if (project.id === activeProjectId) {
                projectOption.selected = true;
            }
            projectTab.appendChild(projectOption);
        }
    }

    function clearProjectInput() {
        const projectTab = document.getElementById("toDoProject");
        const defaultProject = document.createElement("option");
        defaultProject.value = "default";
        defaultProject.innerText = "none";
        projectTab.replaceChildren(defaultProject);
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
        let formStatus = addNoteFormElement.checkValidity();
        addNoteFormElement.reportValidity()
        if (formStatus) {
            handleNoteAddFormElements(1);
            handleNoteFormInput();
            addNoteButton.removeEventListener("click", handleAddNoteFormButton);
            addNoteBox.addEventListener("click", handleAddNoteButton);
        }
        e.preventDefault();
    }

    function handleNoteFormInput() {
       // Function for validating input of fields!
       const noteTitle =  document.getElementById("titleNote");
       const noteDescription = document.getElementById("descriptionNote");
       const noteData = new Note(noteTitle.value, noteDescription.value);
       storeNotes.push(noteData);
       clearNoteForm();
    }

    // Add NoteButton
    function handleAddNoteButton() {
        handleNoteAddFormElements(0); 
        addNoteBox.removeEventListener("click", handleAddNoteButton);
        addNoteButton.addEventListener("click", handleAddNoteFormButton);
    }

    // handle submit for ToDo
    function saveButton(e) {
        let formMainStatus = formMain.checkValidity();
        formMain.reportValidity();

        // add ToDo to UserInfo
        if(formMainStatus) {
            const toDoTitle = document.getElementById("toDoTitle");
            const toDoDueDate = document.getElementById("toDoDueDate");
            const toDoDescription = document.getElementById("toDoDescription");
            const toDoProject = document.getElementById("toDoProject");
            const toDoPrioritiy = document.getElementById("toDoPriority");

            const toDo = new ToDo(toDoTitle.value, toDoDescription.value, toDoPrioritiy.value, toDoDueDate.value);
            for (let note of storeNotes) {
                toDo.addNote(note);
            }
            // Reset notes
            storeNotes = []
            userInfo.addToDoToProject(toDo, toDoProject.options[toDoProject.selectedIndex].value);

            clearMainForm();
            clearProjectInput();
            changeFormState();
        }
        e.preventDefault();
    }

    function cancelButton(e) {
        e.preventDefault();
        // clear all Form-Elements
        clearNoteForm();
        clearProjectInput();
        changeFormState();
        e.currentTarget.removeEventListener("click", cancelButton);
    }

    function clearMainForm() {
        const toDoTitle = document.getElementById("toDoTitle");
        const toDoDueDate = document.getElementById("toDoDueDate");
        const toDoDescription = document.getElementById("toDoDescription");
        const toDoProject = document.getElementById("toDoProject");
        const toDoPrioritiy = document.getElementById("toDoPriority");

        toDoTitle.value = "";
        toDoDueDate.value = "";
        toDoDescription.value = "";
        toDoProject.value = "none";
        toDoPrioritiy.value = "low";
    }

    function clearNoteForm() {
        const noteTitle =  document.getElementById("titleNote");
        const noteDescription = document.getElementById("descriptionNote");
        noteTitle.value = "";
        noteDescription.value = "";
    }
  

    function createToDo(project = undefined) {
        // sets project to input project
        if (project) {
            activeProjectId = project.id;
        }
        console.log("button pressed");
        changeFormState();
        setProjectInput(userInfo);
        createButton.addEventListener("click", saveButton);
        cancelFormButton.addEventListener("click", cancelButton);
        handleNoteAddFormElements(1);
        addNoteBox.addEventListener("click", handleAddNoteButton);
    }

    return { createToDo }
}