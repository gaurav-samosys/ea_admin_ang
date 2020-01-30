import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { FormBuilder } from '@angular/forms';
let HomeComponent = class HomeComponent {
    constructor(fb, _fuseConfigService) {
        this.fb = fb;
        this._fuseConfigService = _fuseConfigService;
        this.title = 'Ng Image Slider';
        this.showSlider = true;
        this.sliderWidth = 1000;
        this.sliderImageWidth = 250;
        this.sliderImageHeight = 250;
        this.sliderArrowShow = true;
        this.sliderInfinite = true;
        this.sliderImagePopup = true;
        this.sliderAutoSlide = true;
        this.sliderSlideImage = 1;
        this.sliderAnimationSpeed = 1;
        this.imageObject = [];
        this.mySlideOptions = { items: 1, dots: true, nav: false, loop: true };
        this.myCarouselOptions = { items: 1, dots: true, nav: true, loop: true };
        this.myCarouselOptions1 = { items: 4, dots: false, nav: true, autoplay: false, loop: true };
        this.customers_Experience = { items: 1, dots: false, nav: true, autoplay: true };
        this.team_section_slider = { items: 4, dots: true, nav: true, autoplay: false, loop: true };
        this.popular_courses_section = { items: 3, dots: false, nav: true };
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
        this.myCarouselImages = [
            '../assets/webroot/img/home_new/banner_05_corporation.jpg',
            '../assets/webroot/img/home_new/banner_06_family.jpg',
            '../assets/webroot/img/home_new/banner_career_college.jpg',
            '../assets/webroot/img/home_new/banner_04_govermentn.jpg',
            '../assets/webroot/img/home_new/schools_and_boards.jpg',
            '../assets/webroot/img/home_new/banner.png',
        ];
        this.show = true;
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
        this.slides = [
            '../assets/images/arian.png',
            '../assets/images/arian.png',
            '../assets/images/arian.png',
            '../assets/images/arian.png',
            '../assets/images/arian.png'
        ];
        // prevImageClick() {
        //   this.slider.prev();
        // }
        // nextImageClick() {
        //   this.slider.next();
        // }
        this.imagesUrl = ['../assets/images/logo1.png', '../assets/images/logo2.png', '../assets/images/logo3.png', '../assets/images/logo4.png', '../assets/images/logo5.png', '../assets/images/logo6.png', '../assets/images/logo7.png', '../assets/images/logo8.png'];
        this.type = 'component';
        this.disabled = false;
        this.config = {
            direction: 'horizontal',
            slidesPerView: 1,
            keyboard: true,
            mousewheel: true,
            scrollbar: false,
            navigation: true,
            pagination: false
        };
        this.scrollbar = {
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true
        };
        this.pagination = {
            el: '.swiper-pagination',
            clickable: true,
            hideOnClick: false
        };
        //////////////////////
        // tabChanged(event) {
        //   console.log("index is =", event.index)
        //   if (event.index === undefined) { }
        //   if (event.index === 0) {
        //     }
        //   }
        this.tabChanged = (tabChangeEvent) => {
            console.log('tabChangeEvent => ', tabChangeEvent);
            console.log('index => ', tabChangeEvent.index);
        };
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
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
        });
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
    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }
    toggleType() {
        this.type = (this.type === 'component') ? 'directive' : 'component';
    }
    toggleDisabled() {
        this.disabled = !this.disabled;
    }
    toggleDirection() {
        this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
    }
    toggleSlidesPerView() {
        if (this.config.slidesPerView !== 1) {
            this.config.slidesPerView = 1;
        }
        else {
            this.config.slidesPerView = 2;
        }
    }
    toggleOverlayControls() {
        if (this.config.navigation) {
            this.config.scrollbar = false;
            this.config.navigation = false;
            this.config.pagination = this.pagination;
        }
        else if (this.config.pagination) {
            this.config.navigation = false;
            this.config.pagination = false;
            this.config.scrollbar = this.scrollbar;
        }
        else {
            this.config.scrollbar = false;
            this.config.pagination = false;
            this.config.navigation = true;
        }
        if (this.type === 'directive') {
            this.directiveRef.setIndex(0);
        }
        else {
            this.componentRef.directiveRef.setIndex(0);
        }
    }
    toggleKeyboardControl() {
        this.config.keyboard = !this.config.keyboard;
    }
    toggleMouseWheelControl() {
        this.config.mousewheel = !this.config.mousewheel;
    }
    onIndexChange(index) {
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
};
tslib_1.__decorate([
    ViewChild('nav', { static: false }),
    tslib_1.__metadata("design:type", NgImageSliderComponent)
], HomeComponent.prototype, "ds", void 0);
tslib_1.__decorate([
    ViewChild('nav', { static: true }),
    tslib_1.__metadata("design:type", NgImageSliderComponent)
], HomeComponent.prototype, "slider", void 0);
tslib_1.__decorate([
    ViewChild(SwiperComponent, { static: true }),
    tslib_1.__metadata("design:type", SwiperComponent)
], HomeComponent.prototype, "componentRef", void 0);
tslib_1.__decorate([
    ViewChild(SwiperDirective, { static: true }),
    tslib_1.__metadata("design:type", SwiperDirective)
], HomeComponent.prototype, "directiveRef", void 0);
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        FuseConfigService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map