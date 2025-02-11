import dateHandler from "./dateHandler"

const dateHandlerInstance = dateHandler(); // Call the function to get the object

export default class UserInfo {
    constructor(projects = []) {
        this.projects = projects;
    }

    get getProjects() {
        return this.projects
    }

    addProject(project) {
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

    removeProject(projectId) {
        this.projects = this.projects.filter(project => !(project.id == projectId));
    }
}