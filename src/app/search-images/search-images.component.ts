import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit {
  images = [];
  keyword: string;

  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }

  searchForm = new FormGroup({
    title: new FormControl(),
    nsfw: new FormControl(),
    dateMin: new FormControl(),
    dateMax: new FormControl(),
  });
  
  submitSearch() {
    console.log(this.searchForm.value);
        this.keyword = this.searchForm.value.title.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
    }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then(res => {
        this.images = this.images.concat(res);
      });
    }
  }

}
