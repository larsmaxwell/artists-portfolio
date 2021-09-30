import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderModule } from 'ngx-order-pipe';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { IllustrationListComponent } from './components/illustration-list/illustration-list.component';

import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { StoreIndexComponent } from './components/store-index/store-index.component'


// Services
import { MessageService } from './services/message.service';
import { SanityService } from './services/sanity.service';

// Pipe
import { GetByTypePipe } from './pipes/get-by-type.pipe';
import { GetImgUrlPipe } from './pipes/get-img-url.pipe';
import { GetByCategoryPipe } from './pipes/get-by-category.pipe';

// Directive
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    AlbumComponent,
    GetByTypePipe,
    WorkListComponent,
    WorkComponent,
    GetImgUrlPipe,
    GetByCategoryPipe,
    PageComponent,
    PageListComponent,
    IllustrationComponent,
    IllustrationListComponent,
    ImageGalleryComponent,
    StoreIndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mlauren-artist-website' }),
    NgxGoogleAnalyticsModule.forRoot('UA-115925018-1'),
    NgxGoogleAnalyticsRouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    OrderModule,
    BrowserAnimationsModule,
    BrowserModule,
    LazyLoadImageModule
  ],
  providers: [
    MessageService,
    OrderModule,
    SanityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
