import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpertInterviewComponent } from './expert-interview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { EmbedVideo } from 'ngx-embed-video';
const routes: Routes = [
  {
      path     : '**',
      component: ExpertInterviewComponent,
      // resolve  : {
      //     data: ManagementService
      // }


  }
];
@NgModule({
  declarations: [ExpertInterviewComponent],
  imports: [
    CommonModule,  RouterModule.forChild(routes),
    EmbedVideo.forRoot(),
        MatProgressSpinnerModule,MatCardModule,MatFormFieldModule,ReactiveFormsModule,FormsModule,MatInputModule,
        MatIconModule,MatButtonModule,
        MatTableModule,UiSwitchModule,
        MatPaginatorModule,MatSlideToggleModule,MatMenuModule
  ]
})
export class ExpertInterviewModule { }
