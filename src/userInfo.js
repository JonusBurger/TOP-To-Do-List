import dateHandler from "./dateHandler"
import Project from "./project";

const dateHandlerInstance = dateHandler(); // Call the function to get the object

export default class UserInfo {
    constructor(projects = []) {
        this.projects = projects;
        // ensure that there is at least one project to store ToDos in
        if (this.projects.length === 0) {
            const defaultProject = new Project("default");
            this.defaultId = defaultProject.id;
            this.projects = [defaultProject];
        }
    }

    get getProjects() {
        return this.projects.filter((project) => project.id != this.defaultId);
    }
    
    getProjectById(projectId) {
        for (let project of this.projects) {
            if (project.id === projectId) {
                return project
            }
        }
        return undefined
    }


    addProject(project) {
        this.projects;
        this.projects.push(project);
        this.sortBasedOnDate(this.projects);
    }

    sortBasedOnDate(listToSort) {
        listToSort.sort(function(a,b) {
            if (!a.getDate) {
                return -1
            }
            if (!b.getDate) {
                return 1
            }
            return dateHandlerInstance.compareDates(a.getDate, b.getDate);
        })
    }

    getAllToDos() {
        const toDos = [];
        const projects = this.projects;
        for (let project of projects) {
            toDos.push.apply(toDos, project.getToDos);
        }
        this.sortBasedOnDate(toDos);
        return toDos
    }

    getAllOverDueToDos() {
        const overDueToDos = []
        const projects = this.projects;
        for (let project of projects) {
            overDueToDos.push.apply(overDueToDos, project.getOverDueToDos())
        }
        this.sortBasedOnDate(overDueToDos)
        return overDueToDos
    }

    getAllToDosNotOverdue() {
        const allToDos = this.getAllToDos();
        const overDueToDos = this.getAllOverDueToDos();
        return allToDos.filter(toDo => !overDueToDos.includes(toDo))
    }

    findToDo(toDoId) {
        let toDos = this.getAllToDos()
        toDos = toDos.filter(toDo => (toDo.id == toDoId));
        return toDos[0]
    }

    addToDoToProject(toDo, projectId) {
        let project = this.getProjectById(projectId);
        if (project) {
            project.addToDo(toDo);
        } else {
            const defaultProject = this.getProjectById(this.defaultId);
            defaultProject.addToDo(toDo);
        }
    }


    removeProject(projectId) {
        this.projects = this.projects.filter(project => !(project.id == projectId));
    }


}