import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
// import { Lightbox } from '@ngx-gallery/lightbox';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  mySlideOptions = { items: 1, dots: true, nav: false };
  myCarouselOptions = { items: 1, dots: true, nav: true, autoplay: false, loop: true };
  eventSpeaker = { items: 1, dots: false, nav: true, loop: true };
  eventSpeaker1 = { items: 4, dots: false, nav: true };
  eventSpeakerTab = { items: 4, dots: false, nav: true, loop: true }
  myCarouselImages = [
    '../assets/webroot/img/home_new/coaching_banner2.jpg',
    '../assets/images/banner.png',
    '../assets/webroot/img/home_new/coaching_banner2.jpg',
    '../assets/images/banner.png'

  ]
  myCarouselOptions1 = { items: 1, dots: false, nav: true, autoplay: false, };

  // constructor(public gallery: Gallery, public lightbox: Lightbox, private renderer: Renderer2) {
  // }

  constructor() {

  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }


  // ngAfterViewInit() {
  //   const d2 = this.renderer.createElement('div');
  //   const text = this.renderer.createText('two');
  //   this.renderer.appendChild(d2, text);
  //   this.renderer.appendChild(this.d1.nativeElement, d2);
  // }

  //app carousel slides = [
  //   {
  //     url: 'https://source.unsplash.com/1600x900/?nature,water'
  //   },
  //   {
  //     url: 'https://source.unsplash.com/1600x1600/?nature,forest'
  //   }
  // ]

  items: GalleryItem[];
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

  // myFunction() {
  //   document.getElementById("panel").style.display = "block";
  // }

}


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


