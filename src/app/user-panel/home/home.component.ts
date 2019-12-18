import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations


})
export class HomeComponent implements OnInit {
  /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
  @ViewChild('nav', { static: false }) ds: NgImageSliderComponent;
  title = 'Ng Image Slider';
  showSlider = true;
  emailForm: FormGroup
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

  mySlideOptions = { items: 1, dots: true, nav: false, loop: true };
  myCarouselOptions = { items: 1, dots: true, nav: true, loop: true };
  myCarouselOptions1 = { items: 4, dots: false, nav: true, autoplay: false, loop: true };
  customers_Experience = { items: 1, dots: false, nav: true, autoplay: true };
  team_section_slider = { items: 4, dots: true, nav: true, autoplay: false, loop: true };
  popular_courses_section = { items: 3, dots: false, nav: true };

  // nav: true,
  // items: 1,
  // loop: true,
  // center: true,
  // margin: 0,
  // lazyLoad:true,
  // dots: false
  // loop: isLooped,
  // nav:isNav,
  // margin:0,
  // video:true,
  // autoplay:true,
  // autoplayTimeout:3500,
  // autoplayHoverPause:true,
  // navSpeed:1300,
  // autoplaySpeed:1300
  // tabs1=[{'date':25,'month':'Nov','location':'BC'}]
  // tabs2=[{'date':27,'month':'Nov','location':'ON'}]
  // tabs3=[{'date':28,'month':'Nov','location':'ON'}]

  myCarouselImages = [
    '../assets/webroot/img/home_new/banner_05_corporation.jpg',
    '../assets/webroot/img/home_new/banner_06_family.jpg',
    '../assets/webroot/img/home_new/banner_career_college.jpg',
    '../assets/webroot/img/home_new/banner_04_govermentn.jpg',
    '../assets/webroot/img/home_new/schools_and_boards.jpg',
    '../assets/webroot/img/home_new/banner.png',
  ]
  public show: boolean = true;
  // variants = [
  //   'hvr-pulse-grow',
  //   'hvr-buzz',
  //   'hvr-wobble-vertical',
  // ];

  // passes = [
  //   'Caption 1',
  //   'Caption 2',
  //   'Caption 3',
  //   'Caption 5',
  //   'Caption 5',
  //   'Caption 6',
  // ];
  slides = [
    '../assets/images/arian.png',
    '../assets/images/arian.png',
    '../assets/images/arian.png',
    '../assets/images/arian.png',
    '../assets/images/arian.png'

  ];
  @ViewChild('nav', { static: true }) slider: NgImageSliderComponent;
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
  // prevImageClick() {
  //   this.slider.prev();
  // }

  // nextImageClick() {
  //   this.slider.next();
  // }
  imagesUrl = ['../assets/images/logo1.png', '../assets/images/logo2.png', '../assets/images/logo3.png', '../assets/images/logo4.png', '../assets/images/logo5.png', '../assets/images/logo6.png', '../assets/images/logo7.png', '../assets/images/logo8.png'];

  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent, { static: true }) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  constructor(private fb: FormBuilder,
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
    this.emailForm = this.fb.group({
      name: '',
      email: '',
      phone_no: '',
      company: '',
      message: '',
    })
  }
  onChangeHandler() {
    this.setImageObject();
    this.showSlider = false;
    setTimeout(() => {
      this.showSlider = true;
    }, 10);
  }
  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled() {
    this.disabled = !this.disabled;
  }

  public toggleDirection() {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView() {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls() {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive') {
      this.directiveRef.setIndex(0);
    } else {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl() {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl() {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number) {
    console.log('Swiper index: ', index);
  }
  ngOnInit() {

  }


  ////////////////////////////////////

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

  //////////////////////


  // tabChanged(event) {
  //   console.log("index is =", event.index)
  //   if (event.index === undefined) { }

  //   if (event.index === 0) {


  //     }
  //   }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }
}

