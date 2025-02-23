import Note from "./note";
import ToDo from "./to-do";
import Project from "./project";
import User from "./userInfo";

export default function localStorageHandler() {

    function storageAvailable() {
        let storage;
        try {
          storage = window["localStorage"];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
      }
    
    function checkForStorage() {
        if (storageAvailable()) {
            if (!localStorage.getItem("user")) {
                // Init Userdata
                const user = new User();
                console.log("user not found");
                return user

            } else {
                // Load UserData
                const user = loadUser("user");
                return user
            }
        }
    }
    
    function loadToDos(project) {
            const loadedToDos = [];
            for (let toDo of project.toDos) {
                const Notes = loadNotes(toDo);
                let loadedToDo = new ToDo(toDo.title, toDo.description, toDo.priority, toDo.date, toDo.done, Notes, toDo.id);
                loadedToDos.push(loadedToDo);
            }
            return loadedToDos
    }

    function loadNotes(toDo) {
        const loadedNotes = []
        for (let i = 0; i < toDo.notes.length; i++) {
            const note = new Note(toDo.notes[i].title, toDo.notes[i].description, toDo.notes[i].date, toDo.notes[i].id);
            loadedNotes.push(note);
        }
        return loadedNotes
    }

    function loadProjects(projects) {
        const loadedProjects = []
        for (let project of projects) {
            const toDos = loadToDos(project);
            const loadedProject = new Project(project.title, undefined, toDos, project.done, project.id)
            loadedProjects.push(loadedProject);
        }
        return loadedProjects

    }

    function loadUser(key) {
        let userData = JSON.parse(localStorage.getItem(key));
        const loadedProjects = loadProjects(userData.projects);
        const user = new User(loadedProjects);
        return user
    }

    function storeUserInfo(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    function removeLocalStorage(key) {
        localStorage.removeItem(key)
    }

    return { checkForStorage, storeUserInfo, removeLocalStorage }
}