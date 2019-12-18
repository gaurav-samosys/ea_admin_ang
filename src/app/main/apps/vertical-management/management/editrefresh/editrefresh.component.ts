import { Component, OnInit,Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagementService }    from '../management.service';
import * as myGlobals from '../../../../../global';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editrefresh',
  templateUrl: './editrefresh.component.html',
  styleUrls: ['./editrefresh.component.scss']
})
export class EditrefreshComponent implements OnInit {
 @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
edittopicForm:any;
editTopic=myGlobals.editTopic;
//value=1;
res_data:any;
check=1;
common:any;
edittopic_status:any;
     horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditrefreshComponent>,private rt:Router,public _formBuilder: FormBuilder,private manage_service:ManagementService) { 
  this.res_data = this.data;
       console.log(this.res_data)
       this.check=this.res_data.course_type;
 }

  ngOnInit() {
 	this.edittopicForm=this._formBuilder.group({
  		title:[''],
  		description:[''],
  		order:[''],
  		image:[''],
  		course:[''],

  	})

  	this.edittopicForm.patchValue({
  		title:this.res_data.cat_name,
      description:this.res_data.description,
      order:this.res_data.order,
      course:this.res_data.course_type
  	})
  }

    public hasError = (controlName: string, errorName: string) =>{
              return this.edittopicForm.controls[controlName].hasError(errorName);
            }

    updaterefresh()
    {
    	if(this.edittopicForm.invalid)
    	{
    		
        return false;
    	}
    	console.log(this.edittopicForm.value)
        this.manage_service.Post(this.editTopic,{id:this.res_data.id,cat_name:this.edittopicForm.value.title,course_type:this.edittopicForm.value.course,description:this.edittopicForm.value.description,order:this.edittopicForm.value.order,token:'LIVESITE',upload_file:this.edittopicForm.value.image}).subscribe(res => {
               this.common=res;
         this.edittopic_status=this.common.status;
        console.log(this.edittopic_status)
             
          
        localStorage.setItem("edittopic_status",this.edittopic_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/management/"+this.res_data.vertical_id]));
        this.dialogRef.close();
          })
    }


 selectFile(event)
    {
     //this.value=1;
         
        /*  this.files = value
          console.log(this.files)*/
      // var array = this.files.name.split('.');
    var pattern = /image-*/;

        if (!event.target.files[0].type.match(pattern)){
    this.openaddSnackBar();
    this.clearFile();
      return false;
    }
    else{
       let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.edittopicForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          filesize:file.size,
          value: (reader.result).toString().split(',')[1]
        })
      };
    }

    }

    }

        openaddSnackBar() {
    this._snackBar.open('Please select image in png,jpg or gif format !!', 'End now', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

    clearFile() {
    this.edittopicForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  onClose()
  {
    this.dialogRef.close()
  }

}
