export default function HomePage(userInfo) {
    const mainArea = document.getElementById("contentArea");
    const overDueToDos = userInfo.getAllOverDueToDos();

    function buildPage() {
        for (let toDo of overDueToDos) {
            const lineElement = document.createElement("div");
            const toDoTitle = document.createElement("div");
            toDoTitle.innerText = toDo.getTitle;
            toDoTitle.classList.add("toDoTitle");
            const toDoDate = document.createElement("div");
            toDoDate.innerText = toDo.getDate;
            toDoDate.classList.add("toDoDate");
            lineElement.classList.add("lineElement");
            lineElement.appendChild(toDoTitle);
            lineElement.appendChild(toDoDate);
            mainArea.appendChild(lineElement);
        }
    
        const allToDos = userInfo.getAllToDos();
        let currentDate;
    
        for (let toDo of allToDos) {
            if (toDo in overDueToDos) {
                continue;
            }
            if !(toDo.getDate === currentDate) {
    
            }
        }
    }

    return { buildPage }
}