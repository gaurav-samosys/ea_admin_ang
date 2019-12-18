import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
import { ShowquizService }    from '../showquiz.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.scss']
})
export class QuestioneditComponent implements OnInit {
addQuestionform:FormGroup;
addQuestionAnswers=myGlobals.addQuestionAnswers;
hide = 0;
formData:any;
value:any;
 constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<QuestioneditComponent>,private rt:Router,public _formBuilder: FormBuilder,private show_service:ShowquizService) 
 {
   this.value=  this.data;
       console.log(this.value)
  }

 

  ngOnInit() {
  	this.addQuestionform=this._formBuilder.group({
  		question_type:[''],
  		points:[''],
  		order:[''],
  		question:[''],
      option:[''],
       selling_points: this._formBuilder.array([this._formBuilder.group({point:''})])
     // options: this._formBuilder.array('')

  	})
  }
get sellingPoints() {
    return this.addQuestionform.get('selling_points') as FormArray;
  }

  /////// This is new /////////////////

  addSellingPoint() {
    this.sellingPoints.push(this._formBuilder.group({point:''}));
  }

  deleteSellingPoint(index) {
    this.sellingPoints.removeAt(index);
  }

      public hasError = (controlName: string, errorName: string) =>{
              return this.addQuestionform.controls[controlName].hasError(errorName);
            }



addQuestion()
{
this.formData=
{
quiz_id:'',
topic_id:'',
question_type:'',
question:'',
order:'',
points:'',
created:'',
solution:'',
}
}


Type(value)
{
    if(value == "")
  {
    this.hide =0;
  }
 else if(value == 0)
  {
    this.hide =1;
  }
  else if(value == 1)
  {
    this.hide =2;
  }
  else if(value == 2)
  {
    this.hide =3;
  }
}

onClose()
{
	this.dialogRef.close();
}

}