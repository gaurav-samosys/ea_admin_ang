import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { CalendarComponent } from 'app/main/apps/calendar/calendar.component';
import { CalendarService } from 'app/main/apps/calendar/calendar.service';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
const routes = [
    {
        path: '**',
        component: CalendarComponent,
        children: [],
        resolve: {
            chat: CalendarService
        }
    }
];
let CalendarModule = class CalendarModule {
};
CalendarModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CalendarComponent,
            CalendarEventFormDialogComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatDatepickerModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSlideToggleModule,
            MatToolbarModule,
            MatTooltipModule,
            AngularCalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            }),
            ColorPickerModule,
            FuseSharedModule,
            FuseConfirmDialogModule
        ],
        providers: [
            CalendarService
        ],
        entryComponents: [
            CalendarEventFormDialogComponent
        ]
    })
], CalendarModule);
export { CalendarModule };
//# sourceMappingURL=calendar.module.js.map