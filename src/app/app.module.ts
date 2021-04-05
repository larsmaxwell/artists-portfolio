import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMasonryGridModule } from 'ng-masonry-grid';

// Components
import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndexComponent } from './components/index/index.component';
import { WorkComponent } from './components/work/work.component';
import { AlbumComponent } from './components/album/album.component';
import { WorkListComponent } from './components/work-list/work-list.component';
import { PageComponent } from './components/page/page.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { IllustrationComponent } from './components/illustration/illustration.component';
import { StoreIndexComponent } from './components/store-index/store-index.component'

// Services

import { MessageService } from './services/message.service';
import { ArtWorkService } from './services/art-work-service.service';
import { ArtWorkAlbumService } from './services/art-work-album.service'
import { IllustrationService } from './services/illustration.service';
import { SanityService } from './services/sanity.service';
import { SanityCategoryService } from './services/category.service';
import { PageService } from './services/page.service';

// Pipe
import { GetByTypePipe } from './pipes/get-by-type.pipe';
import { GetImgUrlPipe } from './pipes/get-img-url.pipe';
import { GetByCategoryPipe } from './pipes/get-by-category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    AlbumComponent,
    PageComponent,
    GetByTypePipe,
    WorkListComponent,
    WorkComponent,
    GetImgUrlPipe,
    GetByCategoryPipe,
    PageListComponent,
    IllustrationComponent,
    StoreIndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mlauren-artist-website' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    OrderModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgMasonryGridModule
  ],
  providers: [
    ArtWorkService,
    ArtWorkAlbumService,
    IllustrationService,
    MessageService,
    PageService,
    OrderModule,
    SanityService,
    SanityCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
