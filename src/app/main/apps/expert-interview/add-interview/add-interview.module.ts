import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddInterviewComponent } from './add-interview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatTableModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { AddInterviewService } from './add-interview.service';

const routes: Routes = [
  {
      path     : '**',
      component: AddInterviewComponent,
      resolve  : {
          data: AddInterviewService
      }


  }
];
@NgModule({
  declarations: [AddInterviewComponent],
  imports: [
    CommonModule,  RouterModule.forChild(routes),
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],providers:[AddInterviewService]
})
export class AddInterviewModule { }
