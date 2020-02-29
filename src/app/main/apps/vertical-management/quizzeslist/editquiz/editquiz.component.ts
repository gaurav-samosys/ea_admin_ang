import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizzeslistService }    from '../quizzeslist.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-editquiz',
  templateUrl: './editquiz.component.html',
  styleUrls: ['./editquiz.component.scss']
})
export class EditquizComponent implements OnInit {
editquizForm:any;
    topic_id:any;
     editQuiz=myGlobals.editQuiz;
    common:any;
    editquiz_status:any;
    res_data:any;
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditquizComponent>,private rt:Router,public _formBuilder: FormBuilder,private quiz_service:QuizzeslistService) { 
   this.res_data=this.data;
   this.topic_id = this.res_data.topic_id;
       console.log(this.res_data)
   }

  ngOnInit() {
this.editquizForm=this._formBuilder.group({
  		category:[''],
  		quiz_description:[''],
  		quiz_name:['',Validators.required],
  		passing_score:['',Validators.required],

  	})
        
       this.editquizForm.patchValue({
       category:localStorage.getItem('names'),
       quiz_description:this.res_data.quiz_description,
		quiz_name:this.res_data.quiz_name,
		passing_score:this.res_data.passing_score

       }) 

       this.editquizForm.controls['category'].disable();

}

   public hasError = (controlName: string, errorName: string) =>{
              return this.editquizForm.controls[controlName].hasError(errorName);
            }
  
UpdateQuiz()
{
	if(this.editquizForm.invalid)
	{
		return false;
	}
	this.editquizForm.value.token="LIVESITE";
	this.editquizForm.value.topic_id=this.topic_id;
	this.editquizForm.value.quiz_id=this.res_data.id;

    this.quiz_service.Post(this.editQuiz,this.editquizForm.value).subscribe(res=>{
    	this.common=res;
      
      if(this.common['status'] == true){
        //  this.editquiz_status=this.common.status;
        // localStorage.setItem("editquiz_status",this.editquiz_status);
        this.dialogRef.close(true);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/quizzeslist/"+this.topic_id]));
          }
                        })

}

onClose()
{
	this.dialogRef.close();
}

}
