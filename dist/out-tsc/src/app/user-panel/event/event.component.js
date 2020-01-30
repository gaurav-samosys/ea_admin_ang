import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
// import { Lightbox } from '@ngx-gallery/lightbox';
// import { map } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let EventComponent = class EventComponent {
    // constructor(public gallery: Gallery, public lightbox: Lightbox, private renderer: Renderer2) {
    // }
    /**
        * Constructor
        *
        * @param {FuseConfigService} _fuseConfigService
        * @param {FormBuilder} _formBuilder
        */
    constructor(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        this.mySlideOptions = { items: 1, dots: true, nav: false };
        this.myCarouselOptions = { items: 1, dots: true, nav: true, autoplay: false, loop: true };
        this.eventSpeaker = { items: 1, dots: false, nav: true, loop: true };
        this.eventSpeaker1 = { items: 4, dots: false, nav: true };
        this.eventSpeakerTab = { items: 4, dots: false, nav: true, loop: true };
        this.myCarouselImages = [
            '../assets/webroot/img/home_new/coaching_banner2.jpg',
            '../assets/images/banner.png',
            '../assets/webroot/img/home_new/coaching_banner2.jpg',
            '../assets/images/banner.png'
        ];
        this.myCarouselOptions1 = { items: 1, dots: false, nav: true, autoplay: false, };
        this.tabChanged = (tabChangeEvent) => {
            console.log('tabChangeEvent => ', tabChangeEvent);
            console.log('index => ', tabChangeEvent.index);
        };
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
    // imageData = item11;
    // imageData = data;
    ngOnInit() {
        // this.items = this.imageData.map(item => new ImageItem({ src: item.item, thumb: item.item }));
        // this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
        // const lightboxRef = this.gallery.ref('lightbox');
        // lightboxRef.setConfig({
        //   imageSize: ImageSize.Cover,
        //   thumbPosition: ThumbnailsPosition.Top
        // });
        // lightboxRef.load(this.items);
    }
};
EventComponent = tslib_1.__decorate([
    Component({
        selector: 'app-event',
        templateUrl: './event.component.html',
        styleUrls: ['./event.component.css'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], EventComponent);
export { EventComponent };
// const item11 = [
//   { item: '../assets/banner02.png' },
//   { item: '../assets/2.png' },
//   { item: '../assets/3.png' },
//   { item: '../assets/blog_02.png' },
//   { item: '../assets/blog_03.png' },
//   { item: '../assets/blog_04.png' },
// ]
// const data = [
//   {
//     srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
//     previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
//     previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
//     previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
//   },
//   {
//     srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
//     previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
//   }
// ];
//# sourceMappingURL=event.component.js.map