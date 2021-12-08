import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit {
  images = [];
  isScroll = false;
  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }

  onSearch(result){
    this.images = result;
  }

  onScroll(){
    this.isScroll=true;
  }

  GetNext(result) {
    this.images = this.images.concat(result);
    this.isScroll=false;
  }

}
