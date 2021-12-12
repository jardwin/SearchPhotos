import { Component, Input, OnInit } from '@angular/core';
import { OurImage, FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})


export class ImageDisplayComponent implements OnInit {

  @Input()
  image :OurImage ;

  onHover: boolean = false;
  photoInfo;

  constructor(private flickr: FlickrService) { }

  ngOnInit(): void {
  }

  mouseHover(){
    //!this.photoInfo && this.flickr.search_photos_info(this.image.id).subscribe((res) => {
      //this.onHover = true;
  //});
  }

  mouseOut(){
    this.onHover = false;
    
  }

}
