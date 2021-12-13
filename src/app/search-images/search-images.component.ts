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
  nsfw: boolean;
  dateMin: Date;
  dateMax: Date;
  gallery: boolean;
  tags: string;

  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }

  searchForm = new FormGroup({
    title: new FormControl(),
    nsfw: new FormControl(),
    dateMin: new FormControl(),
    dateMax: new FormControl(),
    gallery: new FormControl(),
    tags: new FormControl(),
  });
  
  submitSearch() {
    console.log(this.searchForm.value);
    this.keyword = this.searchForm.value.title.toLowerCase();
    this.nsfw = this.searchForm.value.nsfw;
    this.dateMax = this.searchForm.value.dateMax;
    this.dateMin = this.searchForm.value.dateMin;
    this.gallery = this.searchForm.value.gallery;
    this.tags = this.searchForm.value.tags;
    console.log(this.keyword + "//" + this.nsfw + "//" + this.dateMax + "//" + this.dateMin + "//" + this.gallery + "//" + this.tags);
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword, this.nsfw, this.dateMax, this.dateMin, this.gallery, this.tags)
      .toPromise()
      .then(res => {
        this.images = res;
        console.log(this.images);
      });
    }
    }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword, this.nsfw, this.dateMax, this.dateMin, this.gallery, this.tags)
      .toPromise()
      .then(res => {
        this.images = this.images.concat(res);
      });
    }
  }

}
