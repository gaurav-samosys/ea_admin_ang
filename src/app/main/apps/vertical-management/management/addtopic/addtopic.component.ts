import { Component, OnInit,Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagementService }    from '../management.service';
import * as myGlobals from '../../../../../global';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.scss']
})
export class AddtopicComponent implements OnInit {
   @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
	addtopicForm:any;
  check=1;
    value=1;
     addTopics=myGlobals.addTopic;
     common:any;
     addtopic_status:any;
     res_data:any;
       horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<AddtopicComponent>,private rt:Router,public _formBuilder: FormBuilder,private manage_service:ManagementService) { 
       this.res_data = this.data;
       console.log(this.res_data)
   }

  ngOnInit() {
this.addtopicForm=this._formBuilder.group({
  		title:['',Validators.required],
  		description:[''],
  		order:['',Validators.required],
  		image:[''],
  		course:[''],

  	})
  }

    public hasError = (controlName: string, errorName: string) =>{
              return this.addtopicForm.controls[controlName].hasError(errorName);
            }

    addTopic()
    {
    	if(this.addtopicForm.invalid || this.addtopicForm.value.image == null)
    	{
    		this.value=0;
         return false;
    	}
    	console.log(this.addtopicForm.value)
    
        this.manage_service.Post(this.addTopics,{vertical_id:this.res_data,cat_name:this.addtopicForm.value.title,course_type:this.addtopicForm.value.course,description:this.addtopicForm.value.description,order:this.addtopicForm.value.order,token:'LIVESITE',upload_file:this.addtopicForm.value.image}).subscribe(res => {
               this.common=res;
         this.addtopic_status=this.common.status;
        console.log(this.addtopic_status)
             
          
        localStorage.setItem("addtopic_status",this.addtopic_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/management/"+this.res_data]));
        this.dialogRef.close();
          })
    }

 selectFile(event)
    {
     this.value=1;
         
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
        this.addtopicForm.get('image').setValue({
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
    this.addtopicForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onClose()
  {
    this.dialogRef.close();
  }

}
