export const GET_MAILS = '[MAILS] GET MAILS';
export const GET_MAILS_SUCCESS = '[MAILS] GET MAILS SUCCESS';
export const GET_MAILS_FAILED = '[MAILS] GET MAILS FAILED';
export const SET_CURRENT_MAIL = '[MAILS] SET CURRENT MAIL';
export const SET_CURRENT_MAIL_SUCCESS = '[MAILS] SET CURRENT MAIL SUCCESS';
export const CHECK_CURRENT_MAIL = '[MAILS] CHECK CURRENT MAIL';
export const UPDATE_MAIL = '[MAILS] UPDATE MAIL';
export const UPDATE_MAIL_SUCCESS = '[MAILS] UPDATE MAIL SUCCESS';
export const UPDATE_MAILS = '[MAILS] UPDATE MAILS';
export const UPDATE_MAILS_SUCCESS = '[MAILS] UPDATE MAILS SUCCESS';
export const SET_SEARCH_TEXT = '[MAILS] SET SEARCH TEXT';
export const SELECT_ALL_MAILS = '[MAILS] SELECT ALL MAILS';
export const DESELECT_ALL_MAILS = '[MAILS] DESELECT ALL MAILS';
export const TOGGLE_IN_SELECTED_MAILS = '[MAILS] TOGGLE IN SELECTED MAILS';
export const SELECT_MAILS_BY_PARAMETER = '[MAILS] SELECT MAILS BY PARAMETER';
export const SET_FOLDER_ON_SELECTED_MAILS = '[MAILS] SET FOLDER ON SELECTED MAILS';
export const ADD_LABEL_ON_SELECTED_MAILS = '[MAILS] ADD LABEL ON SELECTED MAILS';
/**
 * Get Mails
 */
export class GetMails {
    constructor() {
        this.type = GET_MAILS;
    }
}
/**
 * Get Mails Success
 */
export class GetMailsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_MAILS_SUCCESS;
    }
}
/**
 * Get Mails Failed
 */
export class GetMailsFailed {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_MAILS_FAILED;
    }
}
/**
 * Set Current Mail
 */
export class SetCurrentMail {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_CURRENT_MAIL;
    }
}
/**
 * Set Current Mail Success
 */
export class SetCurrentMailSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_CURRENT_MAIL_SUCCESS;
    }
}
/**
 * Check Current Mail
 */
export class CheckCurrentMail {
    constructor() {
        this.type = CHECK_CURRENT_MAIL;
    }
}
/**
 * Update Mail
 */
export class UpdateMail {
    constructor(payload) {
        this.payload = payload;
        this.type = UPDATE_MAIL;
    }
}
/**
 * Update Mail Success
 */
export class UpdateMailSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = UPDATE_MAIL_SUCCESS;
    }
}
/**
 * Update Mails
 */
export class UpdateMails {
    constructor(payload) {
        this.payload = payload;
        this.type = UPDATE_MAILS;
    }
}
/**
 * Update Mails Success
 */
export class UpdateMailsSuccess {
    constructor() {
        this.type = UPDATE_MAILS_SUCCESS;
    }
}
/**
 * Set Search Text
 */
export class SetSearchText {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_SEARCH_TEXT;
    }
}
/**
 * Select All Mails
 */
export class SelectAllMails {
    constructor() {
        this.type = SELECT_ALL_MAILS;
    }
}
/**
 * Deselect All Mails
 */
export class DeselectAllMails {
    constructor() {
        this.type = DESELECT_ALL_MAILS;
    }
}
/**
 * Toggle In Selected Mails
 */
export class ToggleInSelectedMails {
    constructor(payload) {
        this.payload = payload;
        this.type = TOGGLE_IN_SELECTED_MAILS;
    }
}
/**
 * Select Mails by Parameter
 */
export class SelectMailsByParameter {
    constructor(payload) {
        this.payload = payload;
        this.type = SELECT_MAILS_BY_PARAMETER;
    }
}
/**
 * Set Folder on Selected Mails
 */
export class SetFolderOnSelectedMails {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_FOLDER_ON_SELECTED_MAILS;
    }
}
/**
 * Add label on Selected Mails
 */
export class AddLabelOnSelectedMails {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_LABEL_ON_SELECTED_MAILS;
    }
}
//# sourceMappingURL=mails.actions.js.map