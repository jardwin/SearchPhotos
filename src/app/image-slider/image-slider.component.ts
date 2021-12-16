import { Component, Input, OnInit } from '@angular/core';
import { FlickrPhoto } from '../services/flickr.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input()
  images: FlickrPhoto[] = [];


  currentIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.currentIndex = 0;
  }
  
  nextImage(){
    this.currentIndex++;
    if (this.currentIndex == this.images.length) {
      this.currentIndex=0;
    }
  }

  prevImage(){
    if (this.currentIndex == 0) {
      this.currentIndex=this.images.length;
    }
    this.currentIndex--;
  }
}
