import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
let TodoListComponent = class TodoListComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {TodoService} _todoService
     * @param {Location} _location
     */
    constructor(_activatedRoute, _todoService, _location) {
        this._activatedRoute = _activatedRoute;
        this._todoService = _todoService;
        this._location = _location;
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
        // Subscribe to update todos on changes
        this._todoService.onTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(todos => {
            this.todos = todos;
        });
        // Subscribe to update current todo on changes
        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentTodo => {
            if (!currentTodo) {
                // Set the current todo id to null to deselect the current todo
                this.currentTodo = null;
                // Handle the location changes
                const tagHandle = this._activatedRoute.snapshot.params.tagHandle, filterHandle = this._activatedRoute.snapshot.params.filterHandle;
                if (tagHandle) {
                    this._location.go('apps/todo/tag/' + tagHandle);
                }
                else if (filterHandle) {
                    this._location.go('apps/todo/filter/' + filterHandle);
                }
                else {
                    this._location.go('apps/todo/all');
                }
            }
            else {
                this.currentTodo = currentTodo;
            }
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
     * Read todo
     *
     * @param todoId
     */
    readTodo(todoId) {
        // Set current todo
        this._todoService.setCurrentTodo(todoId);
    }
    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev) {
    }
};
TodoListComponent = tslib_1.__decorate([
    Component({
        selector: 'todo-list',
        templateUrl: './todo-list.component.html',
        styleUrls: ['./todo-list.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        TodoService,
        Location])
], TodoListComponent);
export { TodoListComponent };
//# sourceMappingURL=todo-list.component.js.map