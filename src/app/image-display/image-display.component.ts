import { Component, Input, OnInit } from '@angular/core';
import { FlickrPhoto, FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})


export class ImageDisplayComponent implements OnInit {

  @Input()
  image :FlickrPhoto ;

  constructor(private flickr: FlickrService) { }

  ngOnInit(): void {
  }
  
  info() {
    this.image.displayDetail = !this.image.displayDetail;
  }

}
