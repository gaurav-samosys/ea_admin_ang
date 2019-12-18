import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  displayedColumns: string[] = ['id','IndustryName','company','status', 'univercity','create_by_user'];
  dataSource = new MatTableDataSource<any>();
  userdetailsForm:FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;
  constructor(public fb:FormBuilder,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.userdetailsForm=this.fb.group({
        one:'',
        two:'',
        three:'',
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
