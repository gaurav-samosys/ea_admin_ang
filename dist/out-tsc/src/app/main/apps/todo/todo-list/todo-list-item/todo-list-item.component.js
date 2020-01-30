import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Todo } from 'app/main/apps/todo/todo.model';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
let TodoListItemComponent = class TodoListItemComponent {
    /**
     * Constructor
     *
     * @param {TodoService} _todoService
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(_todoService, _activatedRoute) {
        this._todoService = _todoService;
        this._activatedRoute = _activatedRoute;
        // Disable move if path is not /all
        if (_activatedRoute.snapshot.url[0].path !== 'all') {
            this.moveDisabled = true;
        }
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
        // Set the initial values
        this.todo = new Todo(this.todo);
        this.completed = this.todo.completed;
        // Subscribe to update on selected todo change
        this._todoService.onSelectedTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedTodos => {
            this.selected = false;
            if (selectedTodos.length > 0) {
                for (const todo of selectedTodos) {
                    if (todo.id === this.todo.id) {
                        this.selected = true;
                        break;
                    }
                }
            }
        });
        // Subscribe to update on tag change
        this._todoService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
            this.tags = tags;
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
     * On selected change
     */
    onSelectedChange() {
        this._todoService.toggleSelectedTodo(this.todo.id);
    }
    /**
     * Toggle star
     */
    toggleStar(event) {
        event.stopPropagation();
        this.todo.toggleStar();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle Important
     */
    toggleImportant(event) {
        event.stopPropagation();
        this.todo.toggleImportant();
        this._todoService.updateTodo(this.todo);
    }
    /**
     * Toggle Completed
     */
    toggleCompleted(event) {
        event.stopPropagation();
        this.todo.toggleCompleted();
        this._todoService.updateTodo(this.todo);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Todo)
], TodoListItemComponent.prototype, "todo", void 0);
tslib_1.__decorate([
    HostBinding('class.selected'),
    tslib_1.__metadata("design:type", Boolean)
], TodoListItemComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    HostBinding('class.completed'),
    tslib_1.__metadata("design:type", Boolean)
], TodoListItemComponent.prototype, "completed", void 0);
tslib_1.__decorate([
    HostBinding('class.move-disabled'),
    tslib_1.__metadata("design:type", Boolean)
], TodoListItemComponent.prototype, "moveDisabled", void 0);
TodoListItemComponent = tslib_1.__decorate([
    Component({
        selector: 'todo-list-item',
        templateUrl: './todo-list-item.component.html',
        styleUrls: ['./todo-list-item.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService,
        ActivatedRoute])
], TodoListItemComponent);
export { TodoListItemComponent };
//# sourceMappingURL=todo-list-item.component.js.map