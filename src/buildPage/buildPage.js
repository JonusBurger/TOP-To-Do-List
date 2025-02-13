export default function buildPage() {
    // buildPage

    // get mainArea
    const mainArea = document.getElementById("contentArea");
    // clear Area
    function clearArea() {
        mainArea.replaceChildren();
    }
    // create MainHeader
    function createMainHeader(title) {
        const mainHeader = document.createElement("div");
        const titleElement = document.createElement("div");
        titleElement.innerText = title;
        titleElement.classList.add("headerText");
        mainHeader.appendChild(titleElement);
        const btnElement = document.createElement("button");
        btnElement.innerText = "Add To-Do";
        mainHeader.appendChild(btnElement);
        mainArea.appendChild(mainHeader);

    }
    // create Header
    function createDateHeader(date) {
        const dateHeader = document.createElement(div);
        dateHeader.classList.add("datumHeader");
        dateHeader.innerText = date;
        mainArea.appendChild(dateHeader);    
    }
    // append ToDo
    function appendToDo(toDo, isOverDue = false) {
        const lineElement = document.createElement("div");
        const toDoTitle = document.createElement("div");

        toDoTitle.innerText = toDo.getTitle;
        toDoTitle.classList.add("toDoTitle");
        const toDoDate = document.createElement("div");
        toDoDate.innerText = toDo.getDate;
        toDoDate.classList.add("toDoDate");
        if (isOverDue) {
            toDoDate.classList.add("overDue");
        }
        const toDoContent = document.createElement("div");
        toDoContent.appendChild(toDoTitle);
        toDoContent.appendChild(toDoDate);

        const btnDone = document.createElement("button");
        btnDone.classList.add("btnDone");
        
        lineElement.appendChild(toDoContent);
        lineElement.appendChild(btnDone);
        lineElement.classList.add("lineElement");
        mainArea.appendChild(lineElement);
    }
    
    return { clearArea, createMainHeader, createDateHeader, appendToDo }
}

