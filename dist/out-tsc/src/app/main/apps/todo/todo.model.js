export class Todo {
    /**
     * Constructor
     *
     * @param todo
     */
    constructor(todo) {
        {
            this.id = todo.id;
            this.title = todo.title;
            this.notes = todo.notes;
            this.startDate = todo.startDate;
            this.dueDate = todo.dueDate;
            this.completed = todo.completed;
            this.starred = todo.starred;
            this.important = todo.important;
            this.deleted = todo.deleted;
            this.tags = todo.tags || [];
        }
    }
    /**
     * Toggle star
     */
    toggleStar() {
        this.starred = !this.starred;
    }
    /**
     * Toggle important
     */
    toggleImportant() {
        this.important = !this.important;
    }
    /**
     * Toggle completed
     */
    toggleCompleted() {
        this.completed = !this.completed;
    }
    /**
     * Toggle deleted
     */
    toggleDeleted() {
        this.deleted = !this.deleted;
    }
}
//# sourceMappingURL=todo.model.js.map