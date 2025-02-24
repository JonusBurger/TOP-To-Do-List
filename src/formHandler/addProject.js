import Project from "../project";
import localStorageHandler from "../localStorageHandler";
import buildSidebar from "../buildPage/buildSidebar";

export default function buildFormElementProject(userInfo) {
    const formContainer = document.getElementById("formContainerProject");
    const formElement = document.getElementById("formMainProject");

    const createButton = document.getElementById("createBtnProject");
    const cancelFormButton = document.getElementById("cancelBtnProject");
    const editButton = document.getElementById("editBtnProject");

    // Info Store
    let activeProject;

    // API for storage
    const localStorageHandlerInstance = localStorageHandler();

    // load Sidebar for updating
    const buildSidebarInstance = buildSidebar();

    // Build Form - Decide Blank or in edit state
    function displayForm(project = undefined) {
        changeFormState();
        
        if (project) {
            // if Edit - Fill with To-Do Info
            console.log(project);
            inserProjectInfo(project)
            // function for recreating Note Layout based on List;
            // change to Edit Button
            if (!project.done) {
                activeProject = project;
                editButton.style.display="flex";
                editButton.addEventListener("click", editEventListener);
            } else {
                editButton.style.display="none";
            }

            createButton.style.display="none";

        } else {
               // If new-ToDo, Decide if project was passed
            editButton.style.display="none";
            createButton.style.display="flex";
            createButton.addEventListener("click", saveButton);


        }

        // Fill Projectbar with projects
        // Build Note Layout
        cancelFormButton.addEventListener("click", cancelButton);
    }

    function inserProjectInfo(project) {
        const formTitle = document.getElementById("projectTitle");
        formTitle.value = project.getTitle;

        if (project.getDate) {
            const formDate = document.getElementById("projectDueDate");
            formDate.value = project.getDate;
        }
    }

    function changeFormState() {
        formContainer.style.display === "grid" ? formContainer.style.display = "none" : formContainer.style.display = "grid";
    }

    function editEventListener(e) { 
        e.preventDefault();
        edit(e, activeProject);
    }

    // handle submit for ToDo
    function saveButton(e) {
        e.preventDefault();
        let formMainStatus = formElement.checkValidity();
        formElement.reportValidity();

        // add ToDo to UserInfo
        if(formMainStatus) {
            const projectTitle = document.getElementById("projectTitle");
            const projectDueDate = document.getElementById("projectDueDate");
            const project = new Project(projectTitle.value, projectDueDate.value);

            userInfo.addProject(project);

            // Reset Storage
            activeProject = undefined;

            

            clearMainForm();
            cancelFormButton.removeEventListener("click", cancelButton);
            createButton.removeEventListener("click", saveButton);
            changeFormState();

            localStorageHandlerInstance.storeUserInfo(userInfo);
            buildSidebarInstance.updateSidebar(userInfo);
        }
        
    }

    function edit(e, project) {
        let formMainStatus = formElement.checkValidity();
        formElement.reportValidity();

        

        if (formMainStatus) {
            const projectTitle = document.getElementById("projectTitle");
            const projectDueDate = document.getElementById("projectDueDate");

            project.setTitle = projectTitle.value;
            if (projectDueDate.value) {
                project.setDate = projectDueDate.value;
            }

            clearMainForm();
            changeFormState();
            activeProject = undefined;

            editButton.removeEventListener("click", editEventListener);
            cancelFormButton.removeEventListener("click", cancelButton);

            localStorageHandlerInstance.storeUserInfo(userInfo);
            buildSidebarInstance.updateSidebar(userInfo);
        }
        
    }

    function cancelButton(e) {
        e.preventDefault();
        // clear all Form-Elements
        clearMainForm();
        changeFormState();
        activeProject = undefined;
        e.currentTarget.removeEventListener("click", cancelButton);
    }

    function clearMainForm() {
        const projectTitle = document.getElementById("projectTitle");
        const projectDueDate = document.getElementById("projectDueDate");

        projectTitle.value = "";
        projectDueDate.value = "";
    }

    return { displayForm }
}