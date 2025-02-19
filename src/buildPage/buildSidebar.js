import ProjectPage from "./buildProjectpage";
import buildHomepage from "./buildHomepage";

export default function buildSidebar() {
    const sidebar = document.getElementById("projects");

    function createSidebatItem(project, userInfo) {
        const sideBarItem = document.createElement("div");
        sideBarItem.innerText = project.getTitle;
        sideBarItem.addEventListener("click", () => ProjectPage(project, userInfo));
        sideBarItem.classList.add("sidebarItem")
        sideBarItem.id = project.id
        
        return sideBarItem
    }

    function addEventListeners(userInfo) {
        const staticSidebarElements = document.querySelectorAll(".sidebarItem");

        for (let sidebarItem of staticSidebarElements) {
            if (sidebarItem.id === "Homepage") {
                sidebarItem.addEventListener("click", () => buildHomepage(userInfo));
            } else if (sidebarItem.id === "Archiv") {
                console.log("Archiv OpenToDo");
            }
        }
    }

    function initializeSidebar(userInfo) {
        addEventListeners(userInfo);
        if (userInfo.getProjects) {
            for (let project of userInfo.getProjects) {
                sidebar.appendChild(createSidebatItem(project, userInfo));
            }
        }
    }

    function clearSidebar() {
        sidebar.replaceChildren();
    }

    function updateSidebar(userInfo) {
        clearSidebar();
        initializeSidebar(userInfo);
    }

    return{ initializeSidebar, updateSidebar }
}