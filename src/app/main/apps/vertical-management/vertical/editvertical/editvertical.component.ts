import { Component, OnInit,Inject, ElementRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VerticalService }    from '../vertical.service';
import * as myGlobals from '../../../../../global';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-editvertical',
  templateUrl: './editvertical.component.html',
  styleUrls: ['./editvertical.component.scss']
})
export class EditverticalComponent implements OnInit {
   @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
 editVertical=myGlobals.editVertical;
editverticalForm:any;
value=1;
res_data:any;
common:any;
editvertical_status:any;
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
   constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditverticalComponent>,private rt:Router,public _formBuilder: FormBuilder,private vertical_service:VerticalService) { }

  ngOnInit() {
 this.res_data = this.data;
       console.log(this.res_data)
  	this.editverticalForm=this._formBuilder.group({
  		name:[''],
  		description:[''],
      upload_file:['']
  	})

    this.editverticalForm.patchValue({
      name:this.res_data.name,
      description:this.res_data.description,
      //image:this.res_data.img,

    })
  }

    public hasError = (controlName: string, errorName: string) =>{
              return this.editverticalForm.controls[controlName].hasError(errorName);
            }

    updateVertical()
    {
    	if(this.editverticalForm.invalid)
    	{
        return false;
    	}

      this.editverticalForm.value.company_id=0;
      this.editverticalForm.value.id=this.res_data.id;
      this.editverticalForm.value.token="LIVESITE";
    	console.log(this.editverticalForm.value)
      this.vertical_service.Post(this.editVertical,this.editverticalForm.value).subscribe(res=>{
              this.common=res;
         this.editvertical_status=this.common.status;
        console.log(this.editvertical_status)
             
          
        this.dialogRef.close(true);
        localStorage.setItem("editvertical_status",this.editvertical_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/vertical"]));
      })
    }

    selectFile(event)
    {
       
         
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
        this.editverticalForm.get('upload_file').setValue({
          filename: file.name,
          filetype: file.type,
          filesize:file.size,
          value: (reader.result).toString().split(',')[1]
        })
      };
    }

    }
    }

    onClose()
{
  this.dialogRef.close();
}

   openaddSnackBar() {
    this._snackBar.open('Please select image in png,jpg or gif format !!', 'End now', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

    clearFile() {
    this.editverticalForm.get('upload_file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
