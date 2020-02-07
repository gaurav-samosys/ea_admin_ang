import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Version3Component } from 'app/main/apps/home-dashboard/version3/version3.component';
import { Version3Service } from 'app/main/apps/home-dashboard/version3/version3.service';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { GraphService } from './graph.service';
import { ClickElsewhereDirective1 } from '../../../../ClickElsewhereDirective1';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CommonModule } from '@angular/common';
// import { HighchartsChartModule } from "highcharts-angular";
const routes = [
    {
        path: '**',
        component: Version3Component,
        resolve: {
            data: Version3Service
        }
    }
];
let Version3Module = class Version3Module {
};
Version3Module = tslib_1.__decorate([
    NgModule({
        declarations: [UserDetailComponent,
            Version3Component,
            ClickElsewhereDirective1
        ],
        imports: [
            CommonModule,
            // HighchartsChartModule,
            // NgMultiSelectDropDownModule,
            NgMultiSelectDropDownModule.forRoot(),
            RouterModule.forChild(routes),
            NgxDaterangepickerMd.forRoot(),
            MatButtonModule,
            MatDividerModule,
            MatFormFieldModule,
            MatIconModule,
            MatMenuModule,
            MatSelectModule,
            MatTableModule,
            MatTabsModule,
            ScrollingModule,
            NgxChartsModule,
            FuseSharedModule,
            FuseSidebarModule,
            FuseWidgetModule,
            MatAutocompleteModule,
            MatBadgeModule,
            MatBottomSheetModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatGridListModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSelectModule,
            MatSidenavModule,
            MatSlideToggleModule,
            MatSliderModule,
            MatSnackBarModule,
            MatSortModule,
            MatStepperModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            MatTreeModule,
        ],
        exports: [
            MatAutocompleteModule,
            MatBadgeModule,
            MatBottomSheetModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatGridListModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSelectModule,
            MatSidenavModule,
            MatSlideToggleModule,
            MatSliderModule,
            MatSnackBarModule,
            MatSortModule,
            MatStepperModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            MatTreeModule,
        ],
        providers: [
            Version3Service, PagerService, GraphService, FuseSidebarService
        ],
        entryComponents: [UserDetailComponent]
        //   exports: [UserDetailComponent],
    })
], Version3Module);
export { Version3Module };
//# sourceMappingURL=version3.module.js.map