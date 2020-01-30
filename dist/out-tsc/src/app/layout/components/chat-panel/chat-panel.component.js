import * as tslib_1 from "tslib";
import { Component, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ChatPanelService } from 'app/layout/components/chat-panel/chat-panel.service';
let ChatPanelComponent = class ChatPanelComponent {
    /**
     * Constructor
     *
     * @param {ChatPanelService} _chatPanelService
     * @param {HttpClient} _httpClient
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(_chatPanelService, _httpClient, _fuseSidebarService) {
        this._chatPanelService = _chatPanelService;
        this._httpClient = _httpClient;
        this._fuseSidebarService = _fuseSidebarService;
        // Set the defaults
        this.selectedContact = null;
        this.sidebarFolded = true;
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
        // Load the contacts
        this._chatPanelService.loadContacts().then(() => {
            this.contacts = this._chatPanelService.contacts;
            this.user = this._chatPanelService.user;
        });
        // Subscribe to the foldedChanged observable
        this._fuseSidebarService.getSidebar('chatPanel').foldedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folded) => {
            this.sidebarFolded = folded;
        });
    }
    /**
     * After view init
     */
    ngAfterViewInit() {
        this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
            return directive.elementRef.nativeElement.id === 'messages';
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Prepare the chat for the replies
     */
    _prepareChatForReplies() {
        setTimeout(() => {
            // Focus to the reply input
            // this._replyInput.nativeElement.focus();
            // Scroll to the bottom of the messages list
            if (this._chatViewScrollbar) {
                this._chatViewScrollbar.update();
                setTimeout(() => {
                    this._chatViewScrollbar.scrollToBottom(0);
                });
            }
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldSidebarTemporarily() {
        this._fuseSidebarService.getSidebar('chatPanel').foldTemporarily();
    }
    /**
     * Unfold the sidebar temporarily
     */
    unfoldSidebarTemporarily() {
        this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
    }
    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpen() {
        this._fuseSidebarService.getSidebar('chatPanel').toggleOpen();
    }
    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i) {
        return (message.who === this.selectedContact.id &&
            ((this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== this.selectedContact.id) || !this.chat.dialog[i + 1]));
    }
    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i) {
        return (i === 0 || this.chat.dialog[i - 1] && this.chat.dialog[i - 1].who !== message.who);
    }
    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i) {
        return (i === this.chat.dialog.length - 1 || this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== message.who);
    }
    /**
     * Toggle chat with the contact
     *
     * @param contact
     */
    toggleChat(contact) {
        // If the contact equals to the selectedContact,
        // that means we will deselect the contact and
        // unload the chat
        if (this.selectedContact && contact.id === this.selectedContact.id) {
            // Reset
            this.resetChat();
        }
        // Otherwise, we will select the contact, open
        // the sidebar and start the chat
        else {
            // Unfold the sidebar temporarily
            this.unfoldSidebarTemporarily();
            // Set the selected contact
            this.selectedContact = contact;
            // Load the chat
            this._chatPanelService.getChat(contact.id).then((chat) => {
                // Set the chat
                this.chat = chat;
                // Prepare the chat for the replies
                this._prepareChatForReplies();
            });
        }
    }
    /**
     * Remove the selected contact and unload the chat
     */
    resetChat() {
        // Set the selected contact as null
        this.selectedContact = null;
        // Set the chat as null
        this.chat = null;
    }
    /**
     * Reply
     */
    reply(event) {
        event.preventDefault();
        if (!this._replyForm.form.value.message) {
            return;
        }
        // Message
        const message = {
            who: this.user.id,
            message: this._replyForm.form.value.message,
            time: new Date().toISOString()
        };
        // Add the message to the chat
        this.chat.dialog.push(message);
        // Reset the reply form
        this._replyForm.reset();
        // Update the server
        this._chatPanelService.updateChat(this.chat.id, this.chat.dialog).then(response => {
            // Prepare the chat for the replies
            this._prepareChatForReplies();
        });
    }
};
tslib_1.__decorate([
    ViewChild('replyForm', { static: false }),
    tslib_1.__metadata("design:type", NgForm)
], ChatPanelComponent.prototype, "_replyForm", void 0);
tslib_1.__decorate([
    ViewChild('replyInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ChatPanelComponent.prototype, "_replyInput", void 0);
tslib_1.__decorate([
    ViewChildren(FusePerfectScrollbarDirective),
    tslib_1.__metadata("design:type", QueryList)
], ChatPanelComponent.prototype, "_fusePerfectScrollbarDirectives", void 0);
ChatPanelComponent = tslib_1.__decorate([
    Component({
        selector: 'chat-panel',
        templateUrl: './chat-panel.component.html',
        styleUrls: ['./chat-panel.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ChatPanelService,
        HttpClient,
        FuseSidebarService])
], ChatPanelComponent);
export { ChatPanelComponent };
//# sourceMappingURL=chat-panel.component.js.map