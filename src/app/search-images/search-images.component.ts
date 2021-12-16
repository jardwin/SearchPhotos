import { Component, OnInit } from '@angular/core';
import { OurImage } from '../services/flickr.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit {
  images:OurImage[] = [];
  isScroll = false;
  isSlider = false;
  constructor() { }

  ngOnInit() {
  }

  onSearch(result){
    this.images = result;
  }

  onScroll(){
    this.isScroll=true;
    console.log("ma bite")
  }

  GetNext(result) {
    this.images = this.images.concat(result);
    this.isScroll=false;
  }

}
