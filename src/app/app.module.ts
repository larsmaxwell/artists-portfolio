import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeferLoadModule } from '@trademe/ng-defer-load';


// Components
import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { WorkCategoryComponent } from './components/work-category/work-category.component';
import { WorkAlbumComponent } from './components/work-album/work-album.component';
import { ImgZoomComponent } from './components/img-zoom/img-zoom.component';
import { WorksListComponent } from './components/works-list/works-list.component';
import { AlbumDetailComponent } from './components/works-list/album-detail/album-detail.component';

// Services

import { MessageService } from './services/message.service';
import { WorkService } from './services/work.service';
import { ArtWorkService } from './services/art-work-service.service';
import { ArtWorkAlbumService } from './services/art-work-album.service'
import { AlbumService } from './services/album.service';
import { SanityService } from './services/sanity.service';

// Pipe
import { GetByTypePipe } from './pipes/get-by-type.pipe';
import { ImgDetailComponent } from './components/works-list/album-detail/img-detail/img-detail.component';
import { ArtWorkViewComponent } from './components/art-work-view/art-work-view.component';
import { GetImgUrlPipe } from './pipes/get-img-url.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    MenuComponent,
    HomeComponent,
    WorkCategoryComponent,
    WorkAlbumComponent,
    ImgZoomComponent,
    GetByTypePipe,
    WorksListComponent,
    AlbumDetailComponent,
    ImgDetailComponent,
    ArtWorkViewComponent,
    GetImgUrlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    OrderModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeferLoadModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, 
    //   { dataEncapsulation: false }
    // )
  ],
  providers: [
    WorkService,
    ArtWorkService,
    ArtWorkAlbumService,
    MessageService,
    OrderModule,
    AlbumService,
    DeferLoadModule,
    SanityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



 }
