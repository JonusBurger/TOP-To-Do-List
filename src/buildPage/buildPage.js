import dateHandler from "../dateHandler"
import buildFormElement from "./buildForm"

const dateHandlerInstance = dateHandler(); // Call the function to get the object
const buildFormElementInstance = buildFormElement();

export default function buildPage() {
    // buildPage

    // get mainArea
    const mainArea = document.getElementById("contentArea");
    // clear Area
    function clearArea() {
        mainArea.replaceChildren();
    }

    // create MainHeader
    function createMainHeader(title, userInfo) {
        const mainHeader = document.createElement("div");
        const titleElement = document.createElement("div");
        titleElement.innerText = title;
        titleElement.classList.add("headerText");
        mainHeader.appendChild(titleElement);
        const btnElement = document.createElement("button");
        btnElement.innerText = "Add To-Do";
        btnElement.classList.add("button");
        btnElement.addEventListener("click", () => buildFormElementInstance.createToDo(userInfo))
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
        lineElement.addEventListener("click", function(e) {expandToDo(e, toDo)});
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

    function expandToDo(e, toDo) {
        removeExpandedToDo();
        const lineElement = document.getElementById(e.currentTarget.id);
        console.log("Event fired");
        lineElement.classList.add("activeFrame");
        const toDoContentDiv = document.createElement("div");
        toDoContentDiv.classList.add("toDoContentFrame");

        const descriptionDiv = document.createElement("div");
        const descriptionTitle = document.createElement("div");
        const descriptionContent = document.createElement("div");
        const descriptionEditButton = document.createElement("button");

        descriptionTitle.innerText = "Description";
        descriptionTitle.classList.add("contentHeader");

        descriptionContent.innerText = toDo.getDescription;

        descriptionEditButton.innerText = "Edit";
        descriptionEditButton.addEventListener("click", () => (console.log("Hello!")));
        descriptionEditButton.classList.add("btn");

        descriptionDiv.appendChild(descriptionTitle);
        descriptionDiv.appendChild(descriptionContent);
        descriptionDiv.appendChild(descriptionEditButton);
        descriptionDiv.classList.add("descriptionDiv");

        toDoContentDiv.appendChild(descriptionDiv);

        const noteDiv = document.createElement("div");
        const noteDivTitle = document.createElement("div");
        const noteDivArea = document.createElement("div");
        const noteEditButton = document.createElement("button"); 

        noteDiv.classList.add("noteContainer");

        noteDivTitle.innerText = "Notes";
        noteDivTitle.classList.add("contentHeader");
        
        noteDiv.appendChild(noteDivTitle);

        
        for (let note of toDo.getNotes) {
            const noteContentDiv = document.createElement("div");
            const noteTitle = document.createElement("div");
            const noteDate = document.createElement("div");
            const noteDescription = document.createElement("div");

            noteTitle.innerText = note.getTitle;
            noteTitle.classList.add("noteTitle");

            noteDate.innerText = note.getDateFormated();
            noteDate.classList.add("noteDate");

            noteDescription.innerText = note.getDescription;
            noteDescription.classList.add("noteDescription");

            noteContentDiv.appendChild(noteTitle);
            noteContentDiv.appendChild(noteDate);
            noteContentDiv.appendChild(noteDescription);

            noteContentDiv.classList.add("nodeContent");

            noteDivArea.appendChild(noteContentDiv);

            noteDivArea.classList.add("noteArea");
        }

        noteDiv.appendChild(noteDivArea);

        noteEditButton.innerText ="Add Note";
        noteEditButton.addEventListener("click", () => (console.log("Hello!")));
        noteEditButton.classList.add("btn");

        noteDiv.appendChild(noteEditButton);

        toDoContentDiv.appendChild(noteDiv);

        lineElement.appendChild(toDoContentDiv);
    }

    function removeExpandedToDo() {
        const activeLineElement = document.querySelector(".activeFrame");
        if (activeLineElement) {
            activeLineElement.classList.remove("activeFrame");
        }
        const expandedToDo = document.querySelector(".toDoContentFrame");
        if (expandedToDo) {
            expandedToDo.remove();
        }
    }
    
    return { clearArea, createMainHeader, createDateHeader, appendToDo, createDateSortedToDos, highlightElement, expandToDo }
}

