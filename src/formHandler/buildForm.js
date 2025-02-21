import Note from "../note"
import ToDo from "../to-do"

export default function buildFormElement(userInfo, project = undefined) {
    const formContainer = document.getElementById("formContainer");
    const formElement = document.getElementById("formMain");
    const noteFormContainer = document.querySelector(".formNotes");

    const createButton = document.getElementById("createBtn");
    const cancelFormButton = document.getElementById("cancelBtn");
    const editButton = document.getElementById("editBtn");

    const addNoteFormElement = document.getElementById("noteBox");
    const addNoteBox = document.querySelector(".addNoteBox");
    const addNoteButton = document.getElementById("addNoteBtn");


    // Info Storage
    let storeNotes = []
    let activeProjectId = undefined;

    // Build Form - Decide Blank or in edit state
    function displayForm(toDo = undefined) {
        changeFormState();
        
        if (toDo) {
            // if Edit - Fill with To-Do Info
            inserToDoInfo(toDo)
            // function for recreating Note Layout based on List;
            displayNotes();
            // change to Edit Button
            if (!toDo.done) {
                editButton.style.display="flex";
                editButton.addEventListener("click", (e) => edit(e, toDo));
            } else {
                editButton.style.display="none";
            }

            createButton.style.display="none";

        } else {
               // If new-ToDo, Decide if project was passed
               if (project) {
                activeProjectId = project.id;
            }
            editButton.style.display="none";
            createButton.style.display="flex";
            createButton.addEventListener("click", saveButton);


        }

        // Fill Projectbar with projects
        setProjectInput(userInfo);
        // Build Note Layout
        cancelFormButton.addEventListener("click", cancelButton);
        handleNoteAddFormElements(1);
        addNoteBox.addEventListener("click", handleAddNoteButton);
    }

    function displayNotes() {
        const displayedDocumentNotes = document.querySelectorAll(".note");
        for (let i = 0; i < storeNotes.length; i++ ) {
            // Logic for checking if Note already displayed
            if (!storeNotes[i][1]){
                let note = storeNotes[i][0]
                const noteContainer = document.createElement("div");
                noteContainer.classList.add("note");
                noteContainer.classList.add("noteBox");
                
                const noteTitle = document.createElement("div");
                noteTitle.innerText = note.getTitle;
    
                const noteDescription = document.createElement("div");
                noteDescription.innerText = note.getDescription;
    
                noteContainer.appendChild(noteTitle);
                noteContainer.appendChild(noteDescription);
    
                noteFormContainer.insertBefore(noteContainer, addNoteFormElement);
                storeNotes[i][1] = true;
            }
        }
    }

    function inserToDoInfo(toDo) {
        const formTitle = document.getElementById("toDoTitle");
        formTitle.value = toDo.getTitle;

        if (toDo.getDate) {
            const formDate = document.getElementById("toDoDueDate");
            formDate.value = toDo.getDate;
        }

        const formDescription = document.getElementById("toDoDescription");
        formDescription.value = toDo.getDescription;

        for (let note of toDo.getNotes) {
            storeNotes.push([note, false]);
        }
    }

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
       storeNotes.push([noteData, false]);
       displayNotes();
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
            cancelFormButton.removeEventListener("click", cancelButton);
            clearNoteForm()
            clearNotes();
            changeFormState();
        }
        e.preventDefault();
    }

    function edit(e, toDo) {
        let formMainStatus = formMain.checkValidity();
        formMain.reportValidity();

        e.preventDefault();

        if (formMainStatus) {
            const toDoTitle = document.getElementById("toDoTitle");
            const toDoDueDate = document.getElementById("toDoDueDate");
            const toDoDescription = document.getElementById("toDoDescription");
            const toDoProject = document.getElementById("toDoProject");
            const toDoPrioritiy = document.getElementById("toDoPriority");

            toDo.setTitle = toDoTitle.value;
            if (toDoDueDate.value) {
                toDo.setDate = toDoDueDate.value;
            }
            
            toDo.setDescription = toDoDescription.value;
            toDo.setPriority = toDoPrioritiy.value;

            // immediatly end if no new notes were added
            if (!storeNotes.length > toDo.getNotes.length) {
                clearMainForm();
                clearProjectInput();
                cancelFormButton.removeEventListener("click", cancelButton);
                clearNoteForm()
                clearNotes();
                changeFormState();

                return console.log("HER!")
            }
            for (let note in storeNotes.slice(toDo.getNotes.length)) {
                console.log(note);
                toDo.addNote(note);
            }

            clearMainForm();
            clearProjectInput();
            cancelFormButton.removeEventListener("click", cancelButton);
            clearNoteForm()
            clearNotes();
            changeFormState();

        }
        
    }

    function cancelButton(e) {
        e.preventDefault();
        // clear all Form-Elements
        clearNoteForm();
        clearProjectInput();
        clearNotes();
        clearMainForm();
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

    function clearNotes() {

        const displayedDocumentNotes = document.querySelectorAll(".note");
        for (let note of displayedDocumentNotes) {
            note.remove();
        }
    }

    return { displayForm }
}