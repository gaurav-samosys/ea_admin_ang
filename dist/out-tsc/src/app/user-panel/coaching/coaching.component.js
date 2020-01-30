import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let CoachingComponent = class CoachingComponent {
    /**
        * Constructor
        *
        * @param {FuseConfigService} _fuseConfigService
        * @param {FormBuilder} _formBuilder
        */
    constructor(fb, _fuseConfigService) {
        this.fb = fb;
        this._fuseConfigService = _fuseConfigService;
        this.mySlideOptions = { items: 1, dots: true, nav: false };
        this.myCarouselOptions = { items: 1, dots: false, nav: true, loop: true };
        this.myCarouselImages = [
            '../assets/webroot/img/home_new/coaching_banner3.jpg',
            '../assets/webroot/img/home_new/banner_coaching.png',
            '../assets/webroot/img/home_new/coaching_banner.jpg',
            '../assets/webroot/img/home_new/coaching_banner2.jpg',
            '../assets/images/banner.png'
        ];
        this.multipleItems = [{ id: 1, name: 'Starting and maintaining a budget' }, { id: 2, name: 'Basic money management' }, { id: 3, name: 'Crushing debt' }, { id: 4, name: 'Understanding credit' }, { id: 5, name: 'Banking' }, { id: 6, name: 'Homeownership and/or car loans' }, { id: 7, name: ' Other' }];
        this.items = [{ id: 1, name: 'Home Phone', isSelected: false }, { id: 2, name: 'Work Phone', isSelected: false }, { id: 3, name: 'Email', isSelected: false }, { id: 4, name: 'Mail', isSelected: false }];
        this.title = 'Ng Image Slider';
        this.showSlider = true;
        this.myCarouselOptions1 = { items: 1, dots: false, nav: true, autoplay: false, };
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
        this.submitted = false;
        this.multiSelectedCheckBox = [];
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
        this.coachingForm = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', [Validators.required, Validators.minLength(15)]],
            work_phone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            employer: ['', Validators.required],
        });
    }
    ngOnInit() {
    }
    onChange(id) {
        console.log(id);
        this.ids = id;
    }
    onChangeMultiple(name) {
        console.log(name);
        this.multiSelectedCheckBox.push(name);
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
        };
        console.log(item);
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
};
tslib_1.__decorate([
    ViewChild('nav', { static: false }),
    tslib_1.__metadata("design:type", NgImageSliderComponent)
], CoachingComponent.prototype, "ds", void 0);
CoachingComponent = tslib_1.__decorate([
    Component({
        selector: 'app-coaching',
        templateUrl: './coaching.component.html',
        styleUrls: ['./coaching.component.css'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        FuseConfigService])
], CoachingComponent);
export { CoachingComponent };
//# sourceMappingURL=coaching.component.js.map