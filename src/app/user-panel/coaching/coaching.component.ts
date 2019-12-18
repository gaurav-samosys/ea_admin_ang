import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CoachingComponent implements OnInit {
  coachingForm: FormGroup;
  mySlideOptions = { items: 1, dots: true, nav: false };
  myCarouselOptions = { items: 1, dots: false, nav: true ,loop:true};
  myCarouselImages = [
    '../assets/webroot/img/home_new/coaching_banner3.jpg',
    '../assets/webroot/img/home_new/banner_coaching.png',
    '../assets/webroot/img/home_new/coaching_banner.jpg',
    '../assets/webroot/img/home_new/coaching_banner2.jpg',
    '../assets/images/banner.png'

  ]
  multipleItems = [{ id: 1, name: 'Starting and maintaining a budget' }, { id: 2, name: 'Basic money management' }, { id: 3, name: 'Crushing debt' }, { id: 4, name: 'Understanding credit' }, { id: 5, name: 'Banking' }, { id: 6, name: 'Homeownership and/or car loans' }, { id: 7, name: ' Other' }]

  items = [{ id: 1, name: 'Home Phone', isSelected: false }, { id: 2, name: 'Work Phone', isSelected: false }, { id: 3, name: 'Email', isSelected: false }, { id: 4, name: 'Mail', isSelected: false }]
  @ViewChild('nav', { static: false }) ds: NgImageSliderComponent;
  title = 'Ng Image Slider';
  showSlider = true;
  myCarouselOptions1 = { items: 1, dots: false, nav: true, autoplay: false, };
  sliderWidth: Number = 1000;
  sliderImageWidth: Number = 250;
  sliderImageHeight: Number = 250;
  sliderArrowShow: Boolean = true;
  sliderInfinite: Boolean = true;
  sliderImagePopup: Boolean = true;
  sliderAutoSlide: Boolean = true;
  sliderSlideImage: Number = 1;
  sliderAnimationSpeed: any = 1;
  imageObject: Array<object> = [];
  submitted = false;
 /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
  constructor(private fb: FormBuilder,
    private _fuseConfigService: FuseConfigService,) {
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
    this.setImageObject();
    this.coachingForm = this.fb.group({
      name: ['',Validators.required],
      address:['',Validators.required],
      phone: ['', [Validators.required, Validators.minLength(15)]],
      work_phone: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employer: ['',Validators.required],
    })
  }
  Swiper;
  ngOnInit() {

  }
  ids
  onChange(id) {
    console.log(id)
    this.ids = id
  }
  multiSelectedCheckBox = []
  onChangeMultiple(name) {
    console.log(name);
    this.multiSelectedCheckBox.push(name)
    console.log(this.multiSelectedCheckBox);

  }

  // get f() { return this.coachingForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.coachingForm.invalid) {
  //         return;
  //     }

  //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.coachingForm.value))
  // }
  submit() {
    var item = {
      name: this.coachingForm.controls['name'].value,
      address: this.coachingForm.controls['address'].value,
      phone: this.coachingForm.controls['phone'].value,
      work_phone: this.coachingForm.controls['work_phone'].value,
      email: this.coachingForm.controls['email'].value,
      employer: this.coachingForm.controls['employer'].value,
      singleselect: this.ids,
      multiSelect: this.multiSelectedCheckBox
    }
    console.log(item)
  }
  onChangeHandler() {
    this.setImageObject();
    this.showSlider = false;
    setTimeout(() => {
      this.showSlider = true;
    }, 10);
  }

  setImageObject() {
    this.imageObject = [{
      image: '../assets/images/logo1.png',
      thumbImage: '../assets/images/logo1.png',

      alt: 'alt of image1',

    }, {
      image: '../assets/images/logo2.png',

      thumbImage: '../assets/images/logo2.png',

      alt: 'alt of image2',


    },
    {
      image: '../assets/images/logo3.png',

      thumbImage: '../assets/images/logo3.png',
      alt: 'alt of image3',


    },
    {
      image: '../assets/images/logo5.png',

      thumbImage: '../assets/images/logo5.png',

      alt: 'alt of image5',


    },
    {
      image: '../assets/images/logo5.png',

      thumbImage: '../assets/images/logo5.png',

      alt: 'alt of image5',


    },
    {
      image: '../assets/images/logo6.png',

      thumbImage: '../assets/images/logo6.png',

      alt: 'alt of image6',

    }, {
      image: '../assets/images/logo7.png',

      thumbImage: '../assets/images/logo7.png',

      alt: 'alt of image7',

    }, {
      image: '../assets/images/logo8.png',

      thumbImage: '../assets/images/logo8.png',

      alt: 'alt of image8',

    },
    ];
  }

  imageOnClick(index) {
    // console.log('index', index);
  }

  arrowOnClick(event) {
    // console.log('arrow click event', event);
  }

  lightboxArrowClick(event) {
    console.log('popup arrow click', event);
  }

  prevImageClick() {
    this.ds.prev();
  }

  nextImageClick() {
    this.ds.next();
  }
}
