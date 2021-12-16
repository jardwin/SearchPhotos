import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchImagesComponent } from './search-images/search-images.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchImagesComponent,
    SearchCriteriaComponent,
    ImagesListComponent,
    ImageDisplayComponent,
    ImageSliderComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
