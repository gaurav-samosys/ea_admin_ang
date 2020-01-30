export class Mail {
    /**
     * Constructor
     *
     * @param mail
     */
    constructor(mail) {
        this.id = mail.id;
        this.from = mail.from;
        this.to = mail.to;
        this.subject = mail.subject;
        this.message = mail.message;
        this.time = mail.time;
        this.read = mail.read;
        this.starred = mail.starred;
        this.important = mail.important;
        this.hasAttachments = mail.hasAttachments;
        this.attachments = mail.attachments;
        this.labels = mail.labels;
        this.folder = mail.folder;
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
     * Mark as read
     */
    markRead() {
        this.read = true;
    }
    /**
     * Mark as unread
     */
    markUnread() {
        this.read = false;
    }
}
//# sourceMappingURL=mail.model.js.map