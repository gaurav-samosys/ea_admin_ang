import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let ScrumboardService = class ScrumboardService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onBoardsChanged = new BehaviorSubject([]);
        this.onBoardChanged = new BehaviorSubject([]);
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
                this.getBoards()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get boards
     *
     * @returns {Promise<any>}
     */
    getBoards() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/scrumboard-boards')
                .subscribe((response) => {
                this.boards = response;
                this.onBoardsChanged.next(this.boards);
                resolve(this.boards);
            }, reject);
        });
    }
    /**
     * Get board
     *
     * @param boardId
     * @returns {Promise<any>}
     */
    getBoard(boardId) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/scrumboard-boards/' + boardId)
                .subscribe((response) => {
                this.board = response;
                this.onBoardChanged.next(this.board);
                resolve(this.board);
            }, reject);
        });
    }
    /**
     * Add card
     *
     * @param listId
     * @param newCard
     * @returns {Promise<any>}
     */
    addCard(listId, newCard) {
        this.board.lists.map((list) => {
            if (list.id === listId) {
                return list.idCards.push(newCard.id);
            }
        });
        this.board.cards.push(newCard);
        return this.updateBoard();
    }
    /**
     * Add list
     *
     * @param newList
     * @returns {Promise<any>}
     */
    addList(newList) {
        this.board.lists.push(newList);
        return this.updateBoard();
    }
    /**
     * Remove list
     *
     * @param listId
     * @returns {Promise<any>}
     */
    removeList(listId) {
        const list = this.board.lists.find((_list) => {
            return _list.id === listId;
        });
        for (const cardId of list.idCards) {
            this.removeCard(cardId);
        }
        const index = this.board.lists.indexOf(list);
        this.board.lists.splice(index, 1);
        return this.updateBoard();
    }
    /**
     * Remove card
     *
     * @param cardId
     * @param listId
     */
    removeCard(cardId, listId) {
        const card = this.board.cards.find((_card) => {
            return _card.id === cardId;
        });
        if (listId) {
            const list = this.board.lists.find((_list) => {
                return listId === _list.id;
            });
            list.idCards.splice(list.idCards.indexOf(cardId), 1);
        }
        this.board.cards.splice(this.board.cards.indexOf(card), 1);
        this.updateBoard();
    }
    /**
     * Update board
     *
     * @returns {Promise<any>}
     */
    updateBoard() {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/scrumboard-boards/' + this.board.id, this.board)
                .subscribe(response => {
                this.onBoardChanged.next(this.board);
                resolve(this.board);
            }, reject);
        });
    }
    /**
     * Update card
     *
     * @param newCard
     */
    updateCard(newCard) {
        this.board.cards.map((_card) => {
            if (_card.id === newCard.id) {
                return newCard;
            }
        });
        this.updateBoard();
    }
    /**
     * Create new board
     *
     * @param board
     * @returns {Promise<any>}
     */
    createNewBoard(board) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/scrumboard-boards/' + board.id, board)
                .subscribe(response => {
                resolve(board);
            }, reject);
        });
    }
};
ScrumboardService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ScrumboardService);
export { ScrumboardService };
let BoardResolve = class BoardResolve {
    /**
     * Constructor
     *
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(_scrumboardService) {
        this._scrumboardService = _scrumboardService;
    }
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @returns {Promise<any>}
     */
    resolve(route) {
        return this._scrumboardService.getBoard(route.paramMap.get('boardId'));
    }
};
BoardResolve = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ScrumboardService])
], BoardResolve);
export { BoardResolve };
//# sourceMappingURL=scrumboard.service.js.map