import { Component, OnInit,Inject, ElementRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VerticalService }    from '../vertical.service';
import * as myGlobals from '../../../../../global';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addvertical',
  templateUrl: './addvertical.component.html',
  styleUrls: ['./addvertical.component.scss']
})
export class AddverticalComponent implements OnInit {

 @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

addverticalForm:FormGroup;
value=1;
files:any;
 addVerticals=myGlobals.addVertical;
image:any;
common:any;
addvertical_status:any;
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

   constructor(private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<AddverticalComponent>,private rt:Router,public _formBuilder: FormBuilder,private vertical_service:VerticalService) { }

  ngOnInit() {

  	this.addverticalForm=this._formBuilder.group({
  		title:[''],
  		description:[''],
  		upload_file:[''],

  	})
  }

    public hasError = (controlName: string, errorName: string) =>{
              return this.addverticalForm.controls[controlName].hasError(errorName);
            }

    addVertical()
    {
    	if(this.addverticalForm.invalid || this.addverticalForm.value.upload_file == null)
    	{
    		this.value=0;
        return false;
    	}
  
         this.vertical_service.Post(this.addVerticals,{name:this.addverticalForm.value.title,description:this.addverticalForm.value.description,company_id:0,token:'LIVESITE',upload_file:this.addverticalForm.value.upload_file}).subscribe(res => {
               this.common=res;
         this.addvertical_status=this.common.status;
        console.log(this.addvertical_status)
             
          
        localStorage.setItem("addvertical_status",this.addvertical_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/vertical"]));
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
        this.addverticalForm.get('upload_file').setValue({
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
    this.addverticalForm.get('upload_file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onClose()
  {
    this.dialogRef.close();
  }
}
