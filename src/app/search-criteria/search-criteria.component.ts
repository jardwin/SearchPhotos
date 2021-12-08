import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit, OnChanges {
  criteria: Criteria = { keyword: "", dateMax: null, dateMin: null, gallery: false, nsfw: false };
  @Output() onSearch = new EventEmitter<string[]>();
  @Output() onNeedNext = new EventEmitter<string[]>();

  constructor(private flickrService: FlickrService) { }

  searchForm = new FormGroup({
    title: new FormControl(),
    nsfw: new FormControl(),
    dateMin: new FormControl(),
    dateMax: new FormControl(),
    gallery: new FormControl(),
  });

  @Input()
  IsNeedNext: boolean = false;

  submitSearch() {
    console.log(this.searchForm.value);
    this.criteria.keyword = this.searchForm.value.title.toLowerCase();
    this.criteria.nsfw = this.searchForm.value.nsfw;
    this.criteria.dateMax = this.searchForm.value.dateMax;
    this.criteria.dateMin = this.searchForm.value.dateMin;
    this.criteria.gallery = this.searchForm.value.gallery;
    console.log(this.criteria.keyword + "//" + this.criteria.nsfw + "//" + this.criteria.dateMax + "//" + this.criteria.dateMin + "//" + this.criteria.gallery);
    if (this.criteria.keyword && this.criteria.keyword.length > 0) {
      this.flickrService.search_keyword(this.criteria)
        .toPromise()
        .then(res => {
          console.log(res);
          this.onSearch.emit(res);
        });
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.IsNeedNext){
      this.needNext();
    }
  }

  

  needNext() {
    if (this.criteria.keyword.length > 0) {
      this.flickrService.search_keyword(this.criteria)
        .toPromise()
        .then(res => {
          this.onNeedNext.emit(res);
        });
    }
  }

}

export interface Criteria {
  keyword: string;
  nsfw: boolean;
  dateMin: Date;
  dateMax: Date;
  gallery: boolean;
}