import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { Todo } from 'app/main/apps/todo/todo.model';
let TodoService = class TodoService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Location} _location
     */
    constructor(_httpClient, _location) {
        this._httpClient = _httpClient;
        this._location = _location;
        // Set the defaults
        this.selectedTodos = [];
        this.searchText = '';
        this.onTodosChanged = new BehaviorSubject([]);
        this.onSelectedTodosChanged = new BehaviorSubject([]);
        this.onCurrentTodoChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onTagsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
        this.onNewTodoClicked = new Subject();
    }
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFilters(),
                this.getTags(),
                this.getTodos()
            ]).then(() => {
                if (this.routeParams.todoId) {
                    this.setCurrentTodo(this.routeParams.todoId);
                }
                else {
                    this.setCurrentTodo(null);
                }
                this.onSearchTextChanged.subscribe(searchText => {
                    if (searchText !== '') {
                        this.searchText = searchText;
                        this.getTodos();
                    }
                    else {
                        this.searchText = searchText;
                        this.getTodos();
                    }
                });
                resolve();
            }, reject);
        });
    }
    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/todo-filters')
                .subscribe((response) => {
                this.filters = response;
                this.onFiltersChanged.next(this.filters);
                resolve(this.filters);
            }, reject);
        });
    }
    /**
     * Get all tags
     *
     * @returns {Promise<any>}
     */
    getTags() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/todo-tags')
                .subscribe((response) => {
                this.tags = response;
                this.onTagsChanged.next(this.tags);
                resolve(this.tags);
            }, reject);
        });
    }
    /**
     * Get todos
     *
     * @returns {Promise<Todo[]>}
     */
    getTodos() {
        if (this.routeParams.tagHandle) {
            return this.getTodosByTag(this.routeParams.tagHandle);
        }
        if (this.routeParams.filterHandle) {
            return this.getTodosByFilter(this.routeParams.filterHandle);
        }
        return this.getTodosByParams(this.routeParams);
    }
    /**
     * Get todos by params
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByParams(handle) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/todo-todos')
                .subscribe((todos) => {
                this.todos = todos.map(todo => {
                    return new Todo(todo);
                });
                this.todos = FuseUtils.filterArrayByString(this.todos, this.searchText);
                this.onTodosChanged.next(this.todos);
                resolve(this.todos);
            });
        });
    }
    /**
     * Get todos by filter
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByFilter(handle) {
        let param = handle + '=true';
        if (handle === 'dueDate') {
            param = handle + '=^$|\\s+';
        }
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/todo-todos?' + param)
                .subscribe((todos) => {
                this.todos = todos.map(todo => {
                    return new Todo(todo);
                });
                this.todos = FuseUtils.filterArrayByString(this.todos, this.searchText);
                this.onTodosChanged.next(this.todos);
                resolve(this.todos);
            }, reject);
        });
    }
    /**
     * Get todos by tag
     *
     * @param handle
     * @returns {Promise<Todo[]>}
     */
    getTodosByTag(handle) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/todo-tags?handle=' + handle)
                .subscribe((tags) => {
                const tagId = tags[0].id;
                this._httpClient.get('api/todo-todos?tags=' + tagId)
                    .subscribe((todos) => {
                    this.todos = todos.map(todo => {
                        return new Todo(todo);
                    });
                    this.todos = FuseUtils.filterArrayByString(this.todos, this.searchText);
                    this.onTodosChanged.next(this.todos);
                    resolve(this.todos);
                }, reject);
            });
        });
    }
    /**
     * Toggle selected todo by id
     *
     * @param id
     */
    toggleSelectedTodo(id) {
        // First, check if we already have that todo as selected...
        if (this.selectedTodos.length > 0) {
            for (const todo of this.selectedTodos) {
                // ...delete the selected todo
                if (todo.id === id) {
                    const index = this.selectedTodos.indexOf(todo);
                    if (index !== -1) {
                        this.selectedTodos.splice(index, 1);
                        // Trigger the next event
                        this.onSelectedTodosChanged.next(this.selectedTodos);
                        // Return
                        return;
                    }
                }
            }
        }
        // If we don't have it, push as selected
        this.selectedTodos.push(this.todos.find(todo => {
            return todo.id === id;
        }));
        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }
    /**
     * Toggle select all
     */
    toggleSelectAll() {
        if (this.selectedTodos.length > 0) {
            this.deselectTodos();
        }
        else {
            this.selectTodos();
        }
    }
    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectTodos(filterParameter, filterValue) {
        this.selectedTodos = [];
        // If there is no filter, select all todos
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedTodos = this.todos;
        }
        else {
            this.selectedTodos.push(...this.todos.filter(todo => {
                return todo[filterParameter] === filterValue;
            }));
        }
        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }
    /**
     * Deselect todos
     */
    deselectTodos() {
        this.selectedTodos = [];
        // Trigger the next event
        this.onSelectedTodosChanged.next(this.selectedTodos);
    }
    /**
     * Set current todo by id
     *
     * @param id
     */
    setCurrentTodo(id) {
        this.currentTodo = this.todos.find(todo => {
            return todo.id === id;
        });
        this.onCurrentTodoChanged.next([this.currentTodo, 'edit']);
        const tagHandle = this.routeParams.tagHandle, filterHandle = this.routeParams.filterHandle;
        if (tagHandle) {
            this._location.go('apps/todo/tag/' + tagHandle + '/' + id);
        }
        else if (filterHandle) {
            this._location.go('apps/todo/filter/' + filterHandle + '/' + id);
        }
        else {
            this._location.go('apps/todo/all/' + id);
        }
    }
    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedTodos(tagId) {
        this.selectedTodos.map(todo => {
            this.toggleTagOnTodo(tagId, todo);
        });
    }
    /**
     * Toggle tag on todo
     *
     * @param tagId
     * @param todo
     */
    toggleTagOnTodo(tagId, todo) {
        const index = todo.tags.indexOf(tagId);
        if (index !== -1) {
            todo.tags.splice(index, 1);
        }
        else {
            todo.tags.push(tagId);
        }
        this.updateTodo(todo);
    }
    /**
     * Has tag?
     *
     * @param tagId
     * @param todo
     * @returns {boolean}
     */
    hasTag(tagId, todo) {
        if (!todo.tags) {
            return false;
        }
        return todo.tags.indexOf(tagId) !== -1;
    }
    /**
     * Update the todo
     *
     * @param todo
     * @returns {Promise<any>}
     */
    updateTodo(todo) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/todo-todos/' + todo.id, Object.assign({}, todo))
                .subscribe(response => {
                this.getTodos().then(todos => {
                    resolve(todos);
                }, reject);
            });
        });
    }
};
TodoService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        Location])
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map