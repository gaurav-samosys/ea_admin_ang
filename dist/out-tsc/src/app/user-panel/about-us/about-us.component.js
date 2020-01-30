import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
// import { NgImageSliderComponent } from 'projects/ng-image-slider/src/lib/ng-image-slider.component';
import { FuseConfigService } from '@fuse/services/config.service';
let AboutUsComponent = class AboutUsComponent {
    /**
       * Constructor
       *
       * @param {FuseConfigService} _fuseConfigService
       * @param {FormBuilder} _formBuilder
       */
    constructor(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        this.mySlideOptions = { items: 1, dots: true, nav: false, loop: true };
        this.myCarouselOptions = { items: 1, dots: true, nav: true, loop: true };
        this.myCarouselImages = [
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png'
        ];
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
    ngOnInit() {
    }
};
tslib_1.__decorate([
    ViewChild('nav', { static: false }),
    tslib_1.__metadata("design:type", NgImageSliderComponent)
], AboutUsComponent.prototype, "ds", void 0);
AboutUsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-about-us',
        templateUrl: './about-us.component.html',
        styleUrls: ['./about-us.component.css'],
        encapsulation: ViewEncapsulation.None,
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], AboutUsComponent);
export { AboutUsComponent };
//# sourceMappingURL=about-us.component.js.map