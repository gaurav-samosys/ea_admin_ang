import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vertical',
  templateUrl: './add-vertical.component.html',
  styleUrls: ['./add-vertical.component.scss']
})
export class AddVerticalComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Regular', 'Bonus'];
  // constructor( public dialogRef: MatDialogRef<AddVerticalComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) { }
  AddVerticalForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.AddVerticalForm = this.fb.group({
      title: ['', [Validators.required]],
      order: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image_upload: '',
      course_type:''
    })
  }
  ngOnInit() {
  }
  submit(){
    if(this.AddVerticalForm.invalid){
      return false;
    }
    console.log(this.AddVerticalForm.value)
  }

  image_upload(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.AddVerticalForm.get('image_upload').setValue({
        filename: file.name,
        filetype: file.type,
        filesize: file.size,
        value: (reader.result).toString().split(',')[1],
      })
    };
  }
}
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }