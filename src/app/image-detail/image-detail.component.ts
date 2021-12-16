import { Component, Input, OnInit } from '@angular/core';
import { FlickrPhoto } from '../services/flickr.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @Input()
  image: FlickrPhoto;
  constructor() { }

  ngOnInit(): void {
  }

}
