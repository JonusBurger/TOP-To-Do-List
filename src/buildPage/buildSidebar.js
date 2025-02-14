import ProjectPage from "./buildProjectpage";

export default function buildSidebar(userInfo) {
    const sidebar = document.getElementById("projects");

    function createSidebatItem(project) {
        const sideBarItem = document.createElement("div");
        sideBarItem.innerText = project.getTitle;
        sideBarItem.addEventListener("click", () => ProjectPage(project));
        sideBarItem.classList.add("sidebarItem")
        sideBarItem.id = project.id
        
        return sideBarItem
    }

    function initializeSidebar(userInfo) {
        if (userInfo.getProjects) {
            for (let project of userInfo.getProjects) {
                sidebar.appendChild(createSidebatItem(project));
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