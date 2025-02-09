import note from "./note";

const newNote = new note("Jo", "das ist ein Text");
console.log(newNote.getDate());
console.log(newNote.getTitle());
console.log(newNote.getDescription());