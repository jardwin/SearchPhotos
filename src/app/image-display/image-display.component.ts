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

  info() {
    console.log(this.image);
    alert(
      "Auteur : " + this.image.ownername +
      ", Titre : " + this.image.title +
      ", Description : " + JSON.stringify(this.image.description) +
      ", Date : " + this.image.datetaken +
      ", Date upload : " + this.image.dateupload +
      ", Hauteur : " + this.image.height_q +
      ", Largeur : " + this.image.width_q +
      ", Photo publique : " + this.image.ispublic +
      ", Dernière update : " + this.image.lastupdate +
      ", Latitude : " + this.image.latitude +
      ", Longitude : " + this.image.longitude +
      ", Tags : " + this.image.tags 
    );
  }

}
