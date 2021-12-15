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
  description: Object;
  datetaken: Date;
  dateupload: number;
  height_q: number;
  width_q: number;
  ispublic: number;
  lastupdate: number;
  latitude: number;
  longitude: number;
  ownername: string;
  tags: string;
}

export interface OurImage {
  urlLink: string;
  urlImg:string;
  title: string;
  owner: string;
  secret: string;
  id: string;
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
    const params = `api_key=${environment.flickr.key}&text=${criteria.keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}&safe_search=${this.safe}&min_upload_date=${criteria.dateMin}&max_upload_date=${criteria.dateMax}&in_gallery=${criteria.gallery}&tags=${criteria.tags}&extras=tags%2Cdate_taken%2Cowner_name%2Curl_q%2Curl_ms%2Cdescription%2Clicence%2Cdate_upload%2Cgeo%2Clast_update%2Cviews'`;

    return this.http.get(url + params).pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      console.log(res);
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          urlLink: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_b.jpg`,
          urlImg: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title,
          owner: ph.owner,
          secret: ph.secret,
          id: ph.id,
          description: ph.description,
          datetaken: ph.datetaken,
          dateupload: ph.dateupload,
          height_q: ph.height_q,
          width_q: ph.width_q,
          ispublic: ph.ispublic,
          lastupdate: ph.lastupdate,
          latitude: ph.latitude,
          longitude: ph.longitude,
          ownername: ph.ownername,
          tags: ph.tags,
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }

  search_photos_info(id) {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    const params = `api_key=${environment.flickr.key}&photo_id=${id}`;

    return this.http.get(url + params, {responseType: "text" });
  }
}
