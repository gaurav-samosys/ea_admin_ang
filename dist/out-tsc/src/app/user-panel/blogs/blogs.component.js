import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let BlogsComponent = class BlogsComponent {
    /**
      * Constructor
      *
      * @param {FuseConfigService} _fuseConfigService
      * @param {FormBuilder} _formBuilder
      */
    constructor(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        this.imageObject = [{
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image1',
                title: 'title of image1'
            }, {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image2',
                title: 'title of image2'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image3',
                title: 'title of image3'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image4',
                title: 'title of image4'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image5',
                title: 'title of image5'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image6',
                title: 'title of image6'
            }, {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image1',
                title: 'title of image1'
            }, {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image2',
                title: 'title of image2'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image3',
                title: 'title of image3'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image4',
                title: 'title of image4'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image5',
                title: 'title of image5'
            },
            {
                image: '../assets/images/arian.png',
                thumbImage: '../assets/images/arian.png',
                alt: 'alt of image6',
                title: 'title of image6'
            }
        ];
        this.myCarouselOptionsBlog = { items: 3, dots: true, nav: true, autoplay: true, autoplayTimeout: 3000, loop: true };
        this.mySlideOptions = { items: 1, dots: true, nav: false };
        this.myCarouselOptions = { items: 1, dots: true, nav: true, loop: true };
        this.myCarouselImages = [
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png',
            '../assets/images/banner.png'
        ];
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
    }
    ngOnInit() {
    }
    prevImageClick() {
        this.slider.prev();
    }
    nextImageClick() {
        this.slider.next();
    }
};
tslib_1.__decorate([
    ViewChild('nav', { static: true }),
    tslib_1.__metadata("design:type", NgImageSliderComponent)
], BlogsComponent.prototype, "slider", void 0);
BlogsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-blogs',
        templateUrl: './blogs.component.html',
        styleUrls: ['./blogs.component.css'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], BlogsComponent);
export { BlogsComponent };
//# sourceMappingURL=blogs.component.js.map