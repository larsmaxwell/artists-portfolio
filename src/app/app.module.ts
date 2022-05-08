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
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

// Services
import { MessageService } from './services/message.service';
import { SanityService } from './services/sanity.service';
import { AlbumSharedService } from './services/album-shared.service';

// Pipe
import { GetByTypePipe } from './pipes/get-by-type.pipe';
import { GetImgUrlPipe } from './pipes/get-img-url.pipe';
import { GetByCategoryPipe } from './pipes/get-by-category.pipe';

// Directive
import { ImgObserverDirective } from './directives/img-observer/img-observer.directive';
import { IllustrationResolverService } from './services/illustration-resolver.service';
import { NavigationMenuBlockComponent } from './components/navigation-menu-block/navigation-menu-block.component';
import { NavigationMenuItem } from './components/navigation-menu-item/navigation-menu-item.component';
import { FontAwesomeIconsService } from './services/font-awesome-icons.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavigationMenuBlockComponent,
    NavigationMenuItem,
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
    ImageGalleryComponent,
    LoadingIndicatorComponent,
    GalleryImageComponent,
    ImgObserverDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mlauren-artist-website' }),
    NgxGoogleAnalyticsModule.forRoot('UA-115925018-1'),
    NgxGoogleAnalyticsRouterModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    OrderModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    MessageService,
    FontAwesomeIconsService,
    OrderModule,
    SanityService,
    AlbumSharedService,
    IllustrationResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
