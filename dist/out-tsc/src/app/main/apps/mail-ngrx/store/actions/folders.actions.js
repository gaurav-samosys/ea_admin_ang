export const GET_FOLDERS = '[FOLDERS] GET FOLDERS';
export const GET_FOLDERS_SUCCESS = '[FOLDERS] GET FOLDERS SUCCESS';
export const GET_FOLDERS_FAILED = '[FOLDERS] GET FOLDERS FAILED';
/**
 * Get Folders
 */
export class GetFolders {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FOLDERS;
    }
}
/**
 * Get Folders Success
 */
export class GetFoldersSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FOLDERS_SUCCESS;
    }
}
/**
 * Get Folders Failed
 */
export class GetFoldersFailed {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FOLDERS_FAILED;
    }
}
//# sourceMappingURL=folders.actions.js.map