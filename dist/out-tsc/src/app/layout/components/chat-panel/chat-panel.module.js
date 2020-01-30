import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { ChatPanelComponent } from 'app/layout/components/chat-panel/chat-panel.component';
import { ChatPanelService } from 'app/layout/components/chat-panel/chat-panel.service';
let ChatPanelModule = class ChatPanelModule {
};
ChatPanelModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ChatPanelComponent
        ],
        providers: [
            ChatPanelService
        ],
        imports: [
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatTabsModule,
            MatTooltipModule,
            MatRippleModule,
            FuseSharedModule
        ],
        exports: [
            ChatPanelComponent
        ]
    })
], ChatPanelModule);
export { ChatPanelModule };
//# sourceMappingURL=chat-panel.module.js.map