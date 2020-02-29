import { Component, OnInit,ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { VerticalService } from './vertical.service';
import { AddverticalComponent } from './addvertical/addvertical.component';
import { EditverticalComponent } from './editvertical/editvertical.component';
import { Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { DeleteverticalComponent, ConfirmDialogModel } from './deletevertical/deletevertical.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {
   getVerticals=myGlobals.getVerticals;
   common:any;
   result:any;
   vertical_data:any;
     getVideoListbyTopic=myGlobals.getVideoListbyTopic;
    statusChangeVideo=myGlobals.statusChangeVideo;
       horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 constructor(
  private toastr: ToastrService,
  private _snackBar: MatSnackBar,private rt:Router,private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService,public vertical_service:VerticalService) {
  //  if( localStorage.getItem('addvertical_status') == 'true'){
  //     this.openaddSnackBar();
  //     localStorage.removeItem('addvertical_status');
  //    }
  //    else if( localStorage.getItem('addvertical_status') == 'false'){
  //     this.openadderrorSnackBar();
  //     localStorage.removeItem('addvertical_status');
  //    }

  //    else if( localStorage.getItem('deletevertical_status') == 'true'){
  //     this.opendeleteSnackBar();
  //     localStorage.removeItem('deletevertical_status');
  //    }
  //    else if( localStorage.getItem('deletevertical_status') == 'false'){
  //     this.openadddeleteerrorSnackBar();
  //     localStorage.removeItem('deletevertical_status');
  //    }

  //    else if( localStorage.getItem('editvertical_status') == 'true'){
  //     this.openeditSnackBar();
  //     localStorage.removeItem('editvertical_status');
  //    }
  //    else if( localStorage.getItem('editvertical_status') == 'false'){
  //     this.openediterrorSnackBar();
  //     localStorage.removeItem('editvertical_status');
  //    }
   }

  ngOnInit() {
  	this.getVertical();
  }

  getVertical()
  {
  	 this.vertical_service.Post(this.getVerticals,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
                console.log(this.common)
                this.vertical_data=this.common.data

            });
  }
addVertical()
{
  const dialogRef= this.dialog.open(AddverticalComponent, {
      width: '500px',height:'550px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result){
      if(this.result == true){
        this.toastr.success("Vertical Added successFully")
        this.getVertical();
      }else{
        this.toastr.warning("There Are Some Issue, Please Try Again")
      }
      }
    });
}

editVertical(value)
{
  const dialogRef= this.dialog.open(EditverticalComponent, {
       data:value,
      width: '600px',height:'500px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if( this.result){
      if(this.result == true){
        this.toastr.success("Vertical Update successFully")

        this.getVertical();
      }else{
        this.toastr.warning("There Are Some Issue, Please Try Again")
      }
      }
    });
}

  show_li(j){
    document.getElementById('show_list'+j).classList.toggle('displayNone')
  }
  hide(value){
    document.getElementById('show_list'+value).classList.add('displayNone')
  }

  name(value,id)
  {
      localStorage.setItem('name',value,)

      this.rt.navigate(['/apps/vertical-management/management',id])
  }

  //     openaddSnackBar() {
  //   this._snackBar.open('Vertical added successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // } 
  //   openadderrorSnackBar() {
  //   this._snackBar.open('Vertical not added successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }

  //    opendeleteSnackBar() {
  //   this._snackBar.open('Vertical deleted successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // } 
  //   openadddeleteerrorSnackBar() {
  //   this._snackBar.open('Vertical not deleted successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // } 

  //     openeditSnackBar() {
  //   this._snackBar.open('Vertical updated successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // } 
  //   openediterrorSnackBar() {
  //   this._snackBar.open('Vertical not updated successfully!!', 'End now', {
  //     duration: 4000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }



    deleteVertical(value): void {
    const message = `Are you sure you want to delete this vertical?`;
    let id =value
    const dialogData = new ConfirmDialogModel("Confirm Action", message,id);
 
    const dialogRef = this.dialog.open(DeleteverticalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
  

}
