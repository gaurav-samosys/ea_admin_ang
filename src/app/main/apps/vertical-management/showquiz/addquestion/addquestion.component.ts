import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators,FormArray } from '@angular/forms';
import { ShowquizService }    from '../showquiz.service';
import * as myGlobals from '../../../../../global';
import { Product, Question } from './data';
import { ConfirmboxComponent, ConfirmDialogModel } from '../../quizzeslist/confirmbox/confirmbox.component';
// import { ConfirmboxComponent, ConfirmDialogModel } from './confirmbox/confirmbox.component';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.scss']
})
export class AddquestionComponent implements OnInit {
addQuestionform:FormGroup;
addQuestionAnswers=myGlobals.addQuestionAnswers;
hide = 0;
formData:any;
ids:any;
common:any;
added_status:any;
  result: any;
 constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,public dialogRef: MatDialogRef<AddquestionComponent>,private rt:Router,public _formBuilder: FormBuilder,private show_service:ShowquizService) 
 {
   this.ids=  this.data;
       console.log(this.ids)
  }

 

  ngOnInit() {
  	this.addQuestionform=this._formBuilder.group({
  		question_type:['',Validators.required],
  		points:['',Validators.required],
  		order:['',Validators.required],
  		question:['',Validators.required],
      solution:['',Validators.required],
      options:['',],
      radio_ans:[''],
       questions: this._formBuilder.array([this._formBuilder.group({option:'',radio_ans1:''})]),
        true1:[''],
        radio_true:[''],
        true2:[''],
        multiple_radio:[''],
       multiple:[''],
      multiples_question:this._formBuilder.array([this._formBuilder.group({multiples:'',multiple_radio1:''})])
     // options: this._formBuilder.array('')

  	})
  }
get Question_ans() {
   if(this.hide == 1)
    {
    return this.addQuestionform.get('questions') as FormArray;
  }
  else if(this.hide == 3)
  {
    return this.addQuestionform.get('multiples_question') as FormArray;
  }
  }

  /////// This is new /////////////////

  addQuestions() {
    //this.Question_ans.push(this.addQuestionform.value.option)
    if(this.hide == 1)
    {

    this.Question_ans.push(this._formBuilder.group({option:'',radio_ans1:''}));
    }
    else if(this.hide == 3)
    {
       this.Question_ans.push(this._formBuilder.group({multiples:'',multiple_radio1:''}));
    }
  }

  remove_fields(index) {
    this.Question_ans.removeAt(index);
  }

      public hasError = (controlName: string, errorName: string) =>{
              return this.addQuestionform.controls[controlName].hasError(errorName);
            }



addQuestion()
{

  console.log(this.addQuestionform.value)




if(this.hide == 1)
{
  let radio_ans:any,answer:any
if(this.addQuestionform.value.radio_ans == '')
{
 for(var i=0;i<this.addQuestionform.value.questions.length;i++)
 {
   if(this.addQuestionform.value.questions[i].radio_ans1 != '')
   {
     let j=i+2
     radio_ans = this.addQuestionform.value.questions[i].radio_ans1;
     answer ='option'+"_"+j
   }
 }
}
else
{
radio_ans=this.addQuestionform.value.radio_ans;
answer = 'option_1'
}


  this.formData=
{
quiz_id:this.ids.quiz_id,
topic_id:this.ids.topic_id,
type:this.addQuestionform.value.question_type,
order:this.addQuestionform.value.order,
points:this.addQuestionform.value.points,
question:this.addQuestionform.value.question,
option_1:this.addQuestionform.value.options,
option_2:this.addQuestionform.value.questions[0].option,
option_3:this.addQuestionform.value.questions[1].option,
option_4:this.addQuestionform.value.questions[2].option,
answer:answer,
redioId:radio_ans,
solution:this.addQuestionform.value.solution,
token:"LIVESITE"
}

}
else if(this.hide == 2)
{
  let answer:any;
  if(this.addQuestionform.value.radio_true ==1 )
  {
   answer='option_1'
  }
  else if(this.addQuestionform.value.radio_true ==2)
  {
    answer='option_2'
  }
  this.formData=
{
quiz_id:this.ids.quiz_id,
topic_id:this.ids.topic_id,
type:this.addQuestionform.value.question_type,
order:this.addQuestionform.value.order,
points:this.addQuestionform.value.points,
question:this.addQuestionform.value.question,
answer:answer,
redioId:this.addQuestionform.value.radio_true,
solution:this.addQuestionform.value.solution,
token:"LIVESITE"
}
}

else if(this.hide == 3)
{
  let radio_ans=[],answer=[]

 for(var i=0;i<this.addQuestionform.value.multiples_question.length;i++)
 {
   if(this.addQuestionform.value.multiples_question[i].multiple_radio1 != '')
   {
     let j=i+2
     radio_ans.push(this.addQuestionform.value.multiples_question[i].multiple_radio1);
    /* radio_ans.join(",");*/
     answer.push('option'+"_"+j)
     console.log(radio_ans)
   }
 }

if( this.addQuestionform.value.multiple_radio != '')
{

radio_ans.push(this.addQuestionform.value.multiple_radio);
answer.push('option_1')
}

  
  this.formData=
{
quiz_id:this.ids.quiz_id,
topic_id:this.ids.topic_id,
type:this.addQuestionform.value.question_type,
order:this.addQuestionform.value.order,
points:this.addQuestionform.value.points,
question:this.addQuestionform.value.question,
option_1:this.addQuestionform.value.multiple,
option_2:this.addQuestionform.value.multiples_question[0].multiples,
option_3:this.addQuestionform.value.multiples_question[1].multiples,
option_4:this.addQuestionform.value.multiples_question[2].multiples,
answer:answer,
redioId:radio_ans.join(),
solution:this.addQuestionform.value.solution,
token:"LIVESITE"
}
}

console.log(this.formData)
this.show_service.Post(this.addQuestionAnswers,this.formData).subscribe(res=>{
  console.log(res)
  this.common=res
     this.added_status=this.common.status;
         localStorage.setItem('questionadded_status',this.added_status);
         this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/showquiz/"+this.ids.quiz_id+"/"+this.ids.topic_id+""]));
         this.dialogRef.close();
})
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
