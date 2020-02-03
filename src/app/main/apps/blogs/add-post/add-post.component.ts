import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostService } from './add-post.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface AddPost {
  value: string;
  id: number;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  public Editor = ClassicEditor;
  htmlContent = '';
  add_button: number = 0
  name: number = 0
  message: number = 1
  message1 = "This field is required"
  htmlContentWithoutStyles = '';
  // editBlogAPi addBlogApi
  addEditBlogApi = myGlobals.addEditBlogApi

  // addBlogApi = myGlobals.addBlogApi
  updateBlogApi = myGlobals.updateBlogApi
  CategoryArray: AddPost[] = [
    { value: 'Financial Updates', id: 1 },
    { value: 'Live Events', id: 2 },
    { value: 'Webinar Events', id: 3 }
  ];
  authorArray = [
    { value: 'Admin', id: 1 }
  ]
  AddPostForm: FormGroup
  response: Object;
  authorValue: any;
  categoryValue: any;
  post_title = ''
  category = ''
  author = ''
  video_id = ''
  description = ''
  cover_img = ''
  filesToUpload: Array<File> = [];
  constructor(public router: Router, private fb: FormBuilder, public rout: ActivatedRoute, private addpost_service: AddPostService, public toastr: ToastrService) {
    this.AddPostForm = this.fb.group({
      post_title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      video_id: '',
      cover_img: '',
      description: ''
    })
  }
  prodId
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor", { static: true }) ckeditor: any;

  // constructor() {
  //   this.mycontent = `<p>My html content</p>`;
  // }
  onChange($event: any): void {
    console.log("onChange", $event);
  }
  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
    // this.prodId = this.rout.snapshot.paramMap.get('id');
    // console.log(this.prodId)

    this.prodId = window.location.href.split('blog-post/')[1]
    // alert(id)
    console.log(this.prodId)
    if (this.prodId) {
      this.editPost()
      // this.name = 1
    } else {
      // this.name = 0
    }
  }

  editPost() {
    console.log(this.prodId)

    this.addpost_service.Post(this.addEditBlogApi, { id: this.prodId, token: 'LIVESITE' }).subscribe(res => {
      console.log(res)
      this.response = res
      console.log(this.response)
      this.name = 1
      this.add_button = 1
      if (this.response['success'] == true && this.response['status_code'] == 200) {
        this.response = this.response['data']
        console.log(this.response)
        this.AddPostForm.controls['post_title'].setValue(this.response['post_title']),
          this.AddPostForm.controls['category'].setValue(this.response['category'])
        this.AddPostForm.controls['author'].setValue(this.response['author'])
        this.AddPostForm.controls['video_id'].setValue(this.response['video_id'])
        this.AddPostForm.controls['cover_img'].setValue(this.response['cover_img'])
        this.AddPostForm.controls['description'].setValue(this.response['description'])
      } else {
        this.name = 0
        this.add_button = 0

      }
    });
  }
  update(prodId) {
    console.log(prodId, this.response)
    let item = {
      post_title: this.AddPostForm.controls['post_title'].value,
      category: this.AddPostForm.controls['category'].value,
      author: this.AddPostForm.controls['author'].value,
      video_id: this.AddPostForm.controls['video_id'].value,
      description: this.AddPostForm.controls['description'].value,
      cover_img: this.AddPostForm.controls['cover_img'].value
      // cover_img:this.AddPostForm.value.cover_img = this.filesToUpload
    }
    this.addpost_service.Post(this.updateBlogApi, {id:this.prodId,
      post_title: item.post_title,
       category: item.category, 
       author: item.author, 
       video_id: item.video_id, 
       description: item.description, 
       cover_img: item.cover_img,
      token: 'LIVESITE'
    })
    // this.addpost_service.Post(this.updateBlogApi, {
    //   id: this.prodId,
    //   post_title: this.response['post_title'],
    //   category: this.response['category'],
    //   author: this.response['author'],
    //   video_id: this.response['video_id'],
    //   description: this.response['description'],
    //   cover_img: this.response['cover_img'],
    //   token: 'LIVESITE'
    // })


      .subscribe(res => {
        console.log(res)
        // if (res['success'] == true && res['status_code'] == 200) {
          this.toastr.success('Blog Update Successfully')
          this.router.navigate(['/apps/blogs'])
        // } else {
          // this.toastr.warning('There Are some Issue')
        // }
      });
  }

  authorChange(value) {
    this.authorValue = value
  }
  categoryChange(value) {
    this.categoryValue = value
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
    this.message = 0

    this.name = 0
    this.add_button = 0
    let item = {
      post_title: this.AddPostForm.controls['post_title'].value,
      category: this.AddPostForm.controls['category'].value,
      author: this.AddPostForm.controls['author'].value,
      video_id: this.AddPostForm.controls['video_id'].value,
      description: this.AddPostForm.controls['description'].value,
      cover_img: this.AddPostForm.controls['cover_img'].value
      // cover_img:this.AddPostForm.value.cover_img = this.filesToUpload
    }

    if (this.AddPostForm.invalid == true) {
      return false;
    }

    // console.log(this.AddPostForm.value);
    this.addpost_service.Post(this.addEditBlogApi, {
      post_title: item.post_title,
      category: item.category,
      author: item.author,
      video_id: item.video_id,
      description: item.description,
      cover_img: item.cover_img,
      token: 'LIVESITE'
    }).subscribe(res => {
      console.log(res)
      // this.toastr.success('Blog Add Successfully')
      // this.router.navigate(['/apps/blogs'])
      // this.ngOnInit()
      this.AddSubmitForm(res)
    });
  }

  AddSubmitForm(res) {
    console.log(res)

    if (res['success'] == true && res['status_code'] == 200) {
      this.toastr.success('Blog Add Successfully')
      this.router.navigate(['/apps/blogs'])
    } else {
      this.toastr.warning('There Are some Issue')
    }
  }
  //image upload
  image_upload(event) {
    this.message = 1
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.AddPostForm.get('cover_img').setValue({
        filename: file.name,
        filetype: file.type,
        filesize: file.size,
        value: (reader.result).toString().split(',')[1],
      })
    };
  }
  

  /**
   * File Select 
   */
  url = '';
  onSelectFile(event) {
    // this.hide = 1
    this.message = 1
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        this.url = event.target.result;
        console.log( this.url)
      }
    }
  }
  clipBoard() {

    var str = "/apps/blog-post/";
    var res = str.split(" ");
    console.log(res);
    var canvas = document.getElementById("mycanvas");
    console.log(canvas)
  }
  showHTML() {
    this.htmlContentWithoutStyles = document.getElementById("htmlDiv").innerHTML;
  }
}

  // https://gist.github.com/sandcastle/00aaa8a820061c899edf76c3ed3c8bac


  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: 'auto',
  //   minHeight: '300px',
  //   width: 'auto',
  //   minWidth: '0',
  //   translate: 'yes',
  //   enableToolbar: true,
  //   showToolbar: true,
  //   placeholder: 'Enter text here...',
  //   defaultFontName: 'Arial',
  //   defaultFontSize: '2',



  //   // editable: true,
  //   // spellcheck: true,
  //   // height: '15rem',
  //   // minHeight: '5rem',
  //   // maxHeight: 'auto',
  //   // width: 'auto',
  //   // minWidth: '0',
  //   // translate: 'yes',
  //   // enableToolbar: true,
  //   // showToolbar: true,
  //   // placeholder: 'Enter text here...',
  //   // defaultParagraphSeparator: '',
  //   // defaultFontName: '',
  //   // defaultFontSize: '',
  //   fonts: [
  //     { class: 'arial', name: 'Arial' },
  //     { class: 'times-new-roman', name: 'Times New Roman' },
  //     { class: 'calibri', name: 'Calibri' },
  //     { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  //   ],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ],
  //   uploadUrl: 'v1/image',
  //   sanitize: true,
  //   toolbarPosition: 'top',
  //   toolbarHiddenButtons: [
  //     ['bold', 'italic'],
  //     ['fontSize']
  //   ]
  // };

  

  // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  //   toolbarHiddenButtons: [
  //     ['bold']
  //     ],
  //   customClasses: [
  //     {
  //       name: "quote",
  //       class: "quote",
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: "titleText",
  //       class: "titleText",
  //       tag: "h1",
  //     },
  //   ]
  // };


  // update() {
  //   console.log(this.bannerForm.value.Id)
  //   console.log(this.bannerForm.value.createdDate)
  //   console.log(this.getId);
  // fileChangeEvent(fileInput: any) {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  //   console.log(" this.filesToUpload==========", this.filesToUpload)

  // }

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

 //   console.log(this.response['data'])
    //   var data = this.response['data']
    //   console.log("data=============Array", data)
    //   for (let index = 0; index < data.length; index++) {
    //     const id = data[index]['id'];
    //     console.log(id)
    //     if (id == this.prodId) {
    //       //  this.AddPostForm.controls['title'].setValue(id.)
    //     }
    //   }


    // author: 
  // category: 
  // cover_img:
  // created_date:
  // description: 
  // id: 30
  // likes: 0
  // post_title: "test ankit"
  // video_id:

   // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   customClasses: [
  //     {
  //       name: "quote",
  //       class: "quote",
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: "titleText",
  //       class: "titleText",
  //       tag: "h1",
  //     },
  //   ]
  // }
