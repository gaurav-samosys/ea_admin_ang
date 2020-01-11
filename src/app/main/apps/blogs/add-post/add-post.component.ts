import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from './add-post.service';
import * as myGlobals from '../../../../global';

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
  add_button: number = 0

  htmlContentWithoutStyles = '';
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  AddPostForm: FormGroup
  getBlogWithDataApi = myGlobals.getBlogWithDataApi
  response: Object;

  constructor(private fb: FormBuilder, public rout: ActivatedRoute, private addpost_service: AddPostService) {
    this.AddPostForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      categary: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      vedio_id: '',
      image_upload: '',
      htmlContent: ''
    })
  }
  prodId
  ngOnInit() {

    this.prodId = this.rout.snapshot.paramMap.get('id');
    console.log(this.prodId)

    this.addpost_service.Post(this.getBlogWithDataApi, { token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      console.log(this.response['data'])
      var data = this.response['data']
      console.log("data=============Array", data)
      for (let index = 0; index < data.length; index++) {
        const id = data[index]['id'];
        console.log(id)
        if (id == this.prodId) {
          //  this.AddPostForm.controls['title'].setValue(id.)
        }
      }
    });
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
  submit() {
    let item = {
      title: this.AddPostForm.controls['title'].value,
      categary: this.AddPostForm.controls['categary'].value,
      author: this.AddPostForm.controls['author'].value,
      vedio_id: this.AddPostForm.controls['vedio_id'].value,
      htmlContent: this.AddPostForm.controls['htmlContent'].value,
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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

  showHTML() {
    this.htmlContentWithoutStyles = document.getElementById("htmlDiv").innerHTML;

  }
  getId
  edit_user(data, id) {
    console.log(data)
    // this.image_path = data.image_url
    this.getId = data.Id
    console.log("id", this.getId)
    this.add_button = 1
    // if (this.open_add_industry == 1 || this.add_ind == 0 ) {
    //   this.animationState = 'in';
    //   this.bannerForm.controls['banner_start_date'].setValue(data.banner_start_date)
    //   this.bannerForm.controls['banner_end_date'].setValue(data.banner_end_date)
    //   this.bannerForm.controls['description'].setValue(data.description)
    //   this.bannerForm.controls['title'].setValue(data.title)
    //   this.bannerForm.controls['status'].setValue(data.status.toString())

    // } else {
    //   this.animationState = 'out';
    // }
  }
  // update() {
  //   console.log(this.bannerForm.value.Id)
  //   console.log(this.bannerForm.value.createdDate)
  //   console.log(this.getId);


  //   let item = {
  //     Id:this.getId,
  //     title: this.bannerForm.controls['title'].value,
  //     description: this.bannerForm.controls['description'].value,
  //     banner_end_date: this.bannerForm.controls['banner_end_date'].value,
  //     banner_start_date: this.bannerForm.controls['banner_start_date'].value,
  //     status: this.bannerForm.controls['status'].value,
  //     createdDate:this.bannerForm.value.createdDate = this.myDate,
  //     updatedDate:this.bannerForm.value.updatedDate = this.myDate,
  //   }
  //   if (this.bannerForm.invalid == true) {
  //     return true;
  //   }
  //   if (item == undefined && item == null) {
  //     this.toastr.error('there are some field required')
  //   } else {
  //     this.As.POST('updatebanners' + '/' + this.getId, item).subscribe(res => {
  //       console.log("update ------------------------", res)
  //       console.log(res['data']['Id'])

  //       this.upload_Image(res['data']['Id'])
  //       // res['data']
  //       if (res != null || res != undefined) {
  //         this.toastr.success('Banner Form updated successFully')
  //       } else {
  //         this.toastr.error('there are some issue')
  //       }
  //       this.getBannerList()
  //       this.animationState = 'out';
  //     })
  //   }
  //   this.bannerForm.reset();
  // }
}
