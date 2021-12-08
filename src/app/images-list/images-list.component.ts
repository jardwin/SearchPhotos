import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {
  @Input()
  images: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
