import Note from "./note";

const newNote = new Note("Jo", "das ist ein Text");
console.log(newNote.getDate());
console.log(newNote.getTitle());
console.log(newNote.getDescription());