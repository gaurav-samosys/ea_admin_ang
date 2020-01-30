import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsComponent } from 'app/main/ui/forms/forms.component';
const routes = [
    {
        path: 'forms',
        component: FormsComponent
    }
];
let UIFormsModule = class UIFormsModule {
};
UIFormsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            FormsComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSelectModule,
            MatStepperModule,
            FuseSharedModule,
        ]
    })
], UIFormsModule);
export { UIFormsModule };
//# sourceMappingURL=forms.module.js.map