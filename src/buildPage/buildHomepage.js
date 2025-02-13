export default function buildHomePage(userInfo) {
    const mainArea = document.getElementById("contentArea");
    const overDueToDos = userInfo.getAllOverDueToDos();

    for (let toDo of overDueToDos) {
        const lineElement = document.createElement("div");
        const toDoTitle = document.createElement("div");
        toDoTitle.innerText = toDo.getTitle;
        toDoTitle.classList.add("toDoTitle");
        const toDoDate = document.createElement("div");
        toDoDate.innerText = toDo.getDate;
        toDoDate.classList.add("toDoDate");
        lineElement.classList.add("lineElement");
        lineElement.append(toDoTitle);
        lineElement.append(toDoDate);
        mainArea.append(lineElement)
    }

}