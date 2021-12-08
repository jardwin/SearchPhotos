import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Criteria } from '../search-criteria/search-criteria.component';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
  owner: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  prevKeyword: string;
  currPage = 1;
  safe = 1;

  constructor(private http: HttpClient) { }

  search_keyword(criteria: Criteria) {
    if (this.prevKeyword === criteria.keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    if (criteria.nsfw == true) {
      this.safe = 3;
    }
    else {
      this.safe = 1;
    }
    this.prevKeyword = criteria.keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${criteria.keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}&safe_search=${this.safe}&min_upload_date=${criteria.dateMin}&max_upload_date=${criteria.dateMax}&in_gallery=${criteria.gallery}`;

    return this.http.get(url + params).pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const test = this.search_photos_info(ph.id);
        console.log(test);
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
          title: ph.title,
          owner: ph.owner,
          secret: ph.secret,
          id: ph.id
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }

  search_photos_info(id) {
    //console.log('ok');
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    const params = `api_key=${environment.flickr.key}&photo_id=${id}`;

    return this.http.get(url + params)
  }
}
