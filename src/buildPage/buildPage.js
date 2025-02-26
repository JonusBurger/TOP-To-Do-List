import dateHandler from "../dateHandler"
import buildFormElement from "../formHandler/buildFormToDo"

const dateHandlerInstance = dateHandler(); // Call the function to get the object


export default function buildPage() {
    // buildPage

    let defaultDisplayed = false;
    // get mainArea
    const mainArea = document.getElementById("mainArea");

    // set Date to header when initilized
    setDate();

    // clear Area
    function clearArea() {
        const contentArea = document.getElementById("contentArea");
        mainArea.removeChild(contentArea);

        const newContentArea = document.createElement("div");
        newContentArea.classList.add("contentArea");
        newContentArea.id = "contentArea";

        mainArea.appendChild(newContentArea);
    }

    // Create headerDiv
    function createHeaderDiv(mainAreaInput) {
        const mainAreaHeader = document.querySelector(".MainAreaHeader");
        mainAreaHeader.replaceChildren();
        mainAreaHeader.appendChild(mainAreaInput);
    }

    // create MainHeader
    function createMainHeader(title, noOverdue = false) {
        // Reset Data
        defaultDisplayed = false;
        const contentArea = document.getElementById("contentArea");

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
        contentArea.appendChild(mainHeader);

        // if no overdues available, set mainHeader to default
        if(noOverdue) {
            defaultDisplayed = true;
        }

    }

    // create Header
    function createDateHeader(date) {
        const contentArea = document.getElementById("contentArea");

        const dateHeader = document.createElement("div");
        dateHeader.classList.add("datumHeader");
        dateHeader.innerText = dateHandlerInstance.formatDate(date);
        contentArea.appendChild(dateHeader);    
    }

    function createDefaultHeader() {
        const contentArea = document.getElementById("contentArea");

        const dateHeader = document.createElement("div");
        dateHeader.classList.add("datumHeader");
        dateHeader.innerText = "No date";
        contentArea.appendChild(dateHeader);            
    }

    // append ToDo
    function appendToDo(toDo, isOverDue = false) {
        const contentArea = document.getElementById("contentArea");

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
        contentArea.appendChild(lineElement);
    }

    function createDateSortedToDos(toDos) {
        let date;
        for (let toDo of toDos) {
            if (dateHandlerInstance.compareDates(date, toDo.getDate) != 0 && toDo.getDate) {
                createDateHeader(toDo.getDate);
                date = toDo.getDate;
            } if (!date && !toDo.getDate && !defaultDisplayed) {
                createDefaultHeader(); 
                defaultDisplayed = true;
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

    function setDate() {
        const dateHeaderDiv = document.getElementById("date");
        let today = dateHandlerInstance.getToday();
        today = dateHandlerInstance.formatDate(today);

        dateHeaderDiv.innerText = today;
    }

    
    return { clearArea, createHeaderDiv, createMainHeader, createDateHeader, appendToDo, createDateSortedToDos, highlightElement }
}

