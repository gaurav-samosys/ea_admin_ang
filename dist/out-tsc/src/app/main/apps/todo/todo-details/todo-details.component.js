import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Todo } from 'app/main/apps/todo/todo.model';
import { TodoService } from 'app/main/apps/todo/todo.service';
let TodoDetailsComponent = class TodoDetailsComponent {
    /**
     * Constructor
     *
     * @param {TodoService} _todoService
     * @param {FormBuilder} _formBuilder
     */
    constructor(_todoService, _formBuilder) {
        this._todoService = _todoService;
        this._formBuilder = _formBuilder;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to update the current todo
        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([todo, formType]) => {
            if (todo && formType === 'edit') {
                this.formType = 'edit';
                this.todo = todo;
                this.todoForm = this.createTodoForm();
                this.todoForm.valueChanges
                    .pipe(takeUntil(this._unsubscribeAll), debounceTime(500), distinctUntilChanged())
                    .subscribe(data => {
                    this._todoService.updateTodo(data);
                });
            }
        });
        // Subscribe to update on tag change
        this._todoService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
            this.tags = labels;
        });
        // Subscribe to update on tag change
        this._todoService.onNewTodoClicked
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            this.todo = new Todo({});
            this.todo.id = FuseUtils.generateGUID();
            this.formType = 'new';
            this.todoForm = this.createTodoForm();
            this.focusTitleField();
            this._todoService.onCurrentTodoChanged.next([this.todo, 'new']);
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Focus title field
     */
    focusTitleField() {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }
    /**
     * Create todo form
     *
     * @returns {FormGroup}
     */
    createTodoForm() {
        return this._formBuilder.group({
            id: [this.todo.id],
            title: [this.todo.title],
            notes: [this.todo.notes],
            startDate: [this.todo.startDate],
            dueDate: [this.todo.dueDate],
            completed: [this.todo.completed],
            starred: [this.todo.starred],
            important: [this.todo.important],
            deleted: [this.todo.deleted],
            tags: [this.todo.tags]
        });
    }
    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event) {
        event.stopPropagation();
        this.todo.toggleStar();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event) {
        event.stopPropagation();
        this.todo.toggleImportant();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle Completed
     *
     * @param event
     */
    toggleCompleted(event) {
        event.stopPropagation();
        this.todo.toggleCompleted();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle Deleted
     *
     * @param event
     */
    toggleDeleted(event) {
        event.stopPropagation();
        this.todo.toggleDeleted();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle tag on todo
     *
     * @param tagId
     */
    toggleTagOnTodo(tagId) {
        this._todoService.toggleTagOnTodo(tagId, this.todo);
    }
    /**
     * Has tag?
     *
     * @param tagId
     * @returns {any}
     */
    hasTag(tagId) {
        return this._todoService.hasTag(tagId, this.todo);
    }
    /**
     * Add todo
     */
    addTodo() {
        this._todoService.updateTodo(this.todoForm.getRawValue());
    }
};
tslib_1.__decorate([
    ViewChild('titleInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], TodoDetailsComponent.prototype, "titleInputField", void 0);
TodoDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'todo-details',
        templateUrl: './todo-details.component.html',
        styleUrls: ['./todo-details.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService,
        FormBuilder])
], TodoDetailsComponent);
export { TodoDetailsComponent };
//# sourceMappingURL=todo-details.component.js.map