import dateHandler from "../dateHandler"
import buildFormElement from "../formHandler/buildFormToDo"

const dateHandlerInstance = dateHandler(); // Call the function to get the object


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
        btnElement.classList.add("button");
        btnElement.id = "addToDoBtn";
        mainHeader.appendChild(btnElement);
        mainHeader.classList.add("mainHeader")
        mainArea.appendChild(mainHeader);

    }

    // create Header
    function createDateHeader(date) {
        const dateHeader = document.createElement("div");
        dateHeader.classList.add("datumHeader");
        dateHeader.innerText = dateHandlerInstance.formatDate(date);
        mainArea.appendChild(dateHeader);    
    }

    // append ToDo
    function appendToDo(toDo, isOverDue = false) {
        const lineElement = document.createElement("div");
        const toDoTitle = document.createElement("div");
        const toDoContent = document.createElement("div");

        toDoTitle.innerText = toDo.getTitle;
        toDoTitle.classList.add("toDoTitle");
        toDoContent.appendChild(toDoTitle);
        toDoContent.classList.add("toDoContent")

        if (isOverDue) {
            const toDoDate = document.createElement("div");
            toDoDate.innerText = dateHandlerInstance.formatDate(toDo.getDate);
            toDoDate.classList.add("toDoDate");
            toDoDate.classList.add("overDue");
            toDoContent.appendChild(toDoDate);
        }

        const btnDone = document.createElement("button");
        btnDone.classList.add("btnDone");
        
        lineElement.appendChild(toDoContent);
        lineElement.appendChild(btnDone);
        lineElement.classList.add("lineElement");
        lineElement.id = toDo.id;
        mainArea.appendChild(lineElement);
    }

    function createDateSortedToDos(toDos) {
        let date;
        for (let toDo of toDos) {
            if (dateHandlerInstance.compareDates(date, toDo.getDate) != 0) {
                createDateHeader(toDo.getDate);
                date = toDo.getDate;
            }
            appendToDo(toDo);
        }
    }

    function highlightElement(elementId) {
        const allSidebarItems = document.querySelectorAll(".sidebarItem");
        Array.from(allSidebarItems).forEach((element) => element.classList.remove("active"));

        const elementToHighlight = document.getElementById(elementId);
        elementToHighlight.classList.add("active");
    }

    
    return { clearArea, createMainHeader, createDateHeader, appendToDo, createDateSortedToDos, highlightElement }
}

