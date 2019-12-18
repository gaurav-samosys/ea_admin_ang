import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class BlogsComponent implements OnInit {
  @ViewChild('nav',{static:true}) slider: NgImageSliderComponent;
  imageObject: Array<object> = [{
    image:   '../assets/images/arian.png',
    
    thumbImage: '../assets/images/arian.png',

    alt: 'alt of image1',
    title: 'title of image1'
}, {
  image:   '../assets/images/arian.png',
    
  thumbImage: '../assets/images/arian.png',

  alt: 'alt of image2',
  title: 'title of image2'
},
{
  image:   '../assets/images/arian.png',
    
  thumbImage: '../assets/images/arian.png',
  alt: 'alt of image3',
  title: 'title of image3'
},
{
  image:   '../assets/images/arian.png',
    
  thumbImage: '../assets/images/arian.png',

  alt: 'alt of image4',
  title: 'title of image4'
},
{
  image:   '../assets/images/arian.png',
  thumbImage: '../assets/images/arian.png',

  alt: 'alt of image5',
  title: 'title of image5'
},
{
  image:   '../assets/images/arian.png',
    
  thumbImage: '../assets/images/arian.png',

  alt: 'alt of image6',
  title: 'title of image6'
},{
  image:   '../assets/images/arian.png',
  
  thumbImage: '../assets/images/arian.png',

  alt: 'alt of image1',
  title: 'title of image1'
}, {
image:   '../assets/images/arian.png',
  
thumbImage: '../assets/images/arian.png',

alt: 'alt of image2',
title: 'title of image2'
},
{
image:   '../assets/images/arian.png',
  
thumbImage: '../assets/images/arian.png',
alt: 'alt of image3',
title: 'title of image3'
},
{
image:   '../assets/images/arian.png',
  
thumbImage: '../assets/images/arian.png',

alt: 'alt of image4',
title: 'title of image4'
},
{
image:   '../assets/images/arian.png',
thumbImage: '../assets/images/arian.png',

alt: 'alt of image5',
title: 'title of image5'
},
{
image:   '../assets/images/arian.png',
  
thumbImage: '../assets/images/arian.png',

alt: 'alt of image6',
title: 'title of image6'
}
];
myCarouselOptionsBlog={items: 3, dots: true, nav: true, autoplay:true, autoplayTimeout:3000,loop:true};

mySlideOptions={items: 1, dots: true, nav: false };
myCarouselOptions={items: 1, dots: true, nav: true ,loop :true};
myCarouselImages = [
  '../assets/images/banner.png',
  '../assets/images/banner.png',
  '../assets/images/banner.png',
  '../assets/images/banner.png',
  '../assets/images/banner.png'

]
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
     }

  ngOnInit() {
  }

  prevImageClick() {
    this.slider.prev();
}

nextImageClick() {
    this.slider.next();
}
}
