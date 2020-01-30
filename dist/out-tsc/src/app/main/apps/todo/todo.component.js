import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TodoService } from 'app/main/apps/todo/todo.service';
let TodoComponent = class TodoComponent {
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TodoService} _todoService
     */
    constructor(_fuseSidebarService, _todoService) {
        this._fuseSidebarService = _fuseSidebarService;
        this._todoService = _todoService;
        // Set the defaults
        this.searchInput = new FormControl('');
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
        this._todoService.onSelectedTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedTodos => {
            setTimeout(() => {
                this.hasSelectedTodos = selectedTodos.length > 0;
                this.isIndeterminate = (selectedTodos.length !== this._todoService.todos.length && selectedTodos.length > 0);
            }, 0);
        });
        this._todoService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
            this.filters = this._todoService.filters;
        });
        this._todoService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
            this.tags = this._todoService.tags;
        });
        this.searchInput.valueChanges
            .pipe(takeUntil(this._unsubscribeAll), debounceTime(300), distinctUntilChanged())
            .subscribe(searchText => {
            this._todoService.onSearchTextChanged.next(searchText);
        });
        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([currentTodo, formType]) => {
            if (!currentTodo) {
                this.currentTodo = null;
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
     * Deselect current todo
     */
    deselectCurrentTodo() {
        this._todoService.onCurrentTodoChanged.next([null, null]);
    }
    /**
     * Toggle select all
     */
    toggleSelectAll() {
        this._todoService.toggleSelectAll();
    }
    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectTodos(filterParameter, filterValue) {
        this._todoService.selectTodos(filterParameter, filterValue);
    }
    /**
     * Deselect todos
     */
    deselectTodos() {
        this._todoService.deselectTodos();
    }
    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedTodos(tagId) {
        this._todoService.toggleTagOnSelectedTodos(tagId);
    }
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
};
TodoComponent = tslib_1.__decorate([
    Component({
        selector: 'todo',
        templateUrl: './todo.component.html',
        styleUrls: ['./todo.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService,
        TodoService])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map