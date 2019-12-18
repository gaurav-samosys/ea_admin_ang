import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
// import { NgImageSliderComponent } from 'projects/ng-image-slider/src/lib/ng-image-slider.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  encapsulation: ViewEncapsulation.None,
  // animations   : fuseAnimations
})
export class AboutUsComponent implements OnInit {
  mySlideOptions={items: 1, dots: true, nav: false ,loop: true };
  myCarouselOptions={items: 1, dots: true, nav: true, loop: true };
  myCarouselImages = [
    '../assets/images/banner.png',
    '../assets/images/banner.png',
    '../assets/images/banner.png',
    '../assets/images/banner.png',
    '../assets/images/banner.png'
  
  ]
  @ViewChild('nav', {static: false}) ds: NgImageSliderComponent;
  title = 'Ng Image Slider';
  showSlider = true;

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

  /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _fuseConfigService: FuseConfigService,
  
    ) {
      // Configure the layout
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
      console.log('index', index);
  }

  arrowOnClick(event) {
      console.log('arrow click event', event);
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
  ngOnInit(){

  }
}
