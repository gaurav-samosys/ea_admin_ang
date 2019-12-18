import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizzeslistService }    from '../quizzeslist.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.scss']
})
export class AddquizComponent implements OnInit {
	addquizForm:any;
    topic_id:any;
     addQuize=myGlobals.addQuiz;
    common:any;
    addquiz_status:any;
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddquizComponent>,private rt:Router,public _formBuilder: FormBuilder,private quiz_service:QuizzeslistService) { 
   this.topic_id = this.data;
       console.log(this.topic_id)
   }

  ngOnInit() {
this.addquizForm=this._formBuilder.group({
  		category:[''],
  		quiz_description:[''],
  		quiz_name:['',Validators.required],
  		passing_score:['',Validators.required],

  	})
        
       this.addquizForm.patchValue({
       category:localStorage.getItem('names')

       }) 

       this.addquizForm.controls['category'].disable();

}

   public hasError = (controlName: string, errorName: string) =>{
              return this.addquizForm.controls[controlName].hasError(errorName);
            }
  
addQuiz()
{
	if(this.addquizForm.invalid)
	{
		return false;
	}
	this.addquizForm.value.token="LIVESITE";
	this.addquizForm.value.topic_id=this.topic_id;

	console.log(this.addquizForm.value)
    this.quiz_service.Post(this.addQuize,this.addquizForm.value).subscribe(res=>{
    	this.common=res;
    	   this.addquiz_status=this.common.status;
        console.log(this.addquiz_status)
             
          
        localStorage.setItem("addquiz_status",this.addquiz_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/quizzeslist/"+this.topic_id]));
        this.dialogRef.close();
    })

}

onClose()
{
	this.dialogRef.close();
}

}
