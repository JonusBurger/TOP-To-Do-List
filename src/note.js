import dateHandler from "./dateHandler"

export default class note {
    // Properties
    constructor(title, description, date = undefined) {
        this.title = title;
        this.description = description;
        this.date = date // ? date : dateHandler.getToday();
      }

    // Methods
    getTitle() {
        return this.title
    }

    getDescription() {
        return this.description
    }

    getDate() {
        return this.date
    }
}