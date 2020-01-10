import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  htmlContent = '';
  htmlContentWithoutStyles='';
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  AddPostForm:FormGroup
  constructor(private fb:FormBuilder) { 
    this.AddPostForm=this.fb.group({
      title: new FormControl('', [Validators.required]),
      categary:new FormControl('', [Validators.required]),
      author:new FormControl('', [Validators.required]),
      vedio_id:'',
      image_upload:'',
      htmlContent:''
    })
  }

  ngOnInit() {
    
  }
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  submit(){
    let item = {
      title: this.AddPostForm.controls['title'].value,
      categary: this.AddPostForm.controls['categary'].value,
      author: this.AddPostForm.controls['author'].value,
      vedio_id: this.AddPostForm.controls['vedio_id'].value,
      htmlContent:this.AddPostForm.controls['htmlContent'].value,
    }
    if (this.AddPostForm.invalid == true) {
      return false;
    }
    console.log(this.AddPostForm.value);
  }
    //image upload
    image_upload(event) {
      let reader = new FileReader();
      let file = event.target.files[0];
      console.log(file);
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.AddPostForm.get('image_upload').setValue({
          filename: file.name,
          filetype: file.type,
          filesize: file.size,
          value: (reader.result).toString().split(',')[1],
        })
      };
    }
    config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    }
    
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};

showHTML(){
  this.htmlContentWithoutStyles=document.getElementById("htmlDiv").innerHTML;

}
}
