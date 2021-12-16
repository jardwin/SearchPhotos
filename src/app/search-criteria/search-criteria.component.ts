import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlickrService, OurImage } from '../services/flickr.service';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit, OnChanges {
  criteria: Criteria = { keyword: "", dateMax: null, dateMin: null, gallery: true, nsfw: true, tags:"" };
  @Output() onSearch = new EventEmitter<OurImage[]>();
  @Output() onNeedNext = new EventEmitter<OurImage[]>();

  constructor(private flickrService: FlickrService) { }


  @Input()
  IsNeedNext: boolean = false;

  submitSearch() {
    console.log(this.criteria.keyword + "//" + this.criteria.nsfw + "//" + this.criteria.dateMax + "//" + this.criteria.dateMin + "//" + this.criteria.gallery);
    if (this.criteria.keyword && this.criteria.keyword.length > 0) {
      this.flickrService.search_keyword(this.criteria)
        .subscribe(res => {
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
  tags: string;
}