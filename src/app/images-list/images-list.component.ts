import { Component, Input, OnInit } from '@angular/core';
import { OurImage } from '../services/flickr.service';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {
  @Input()
  images:OurImage[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
