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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { WorkCategoryComponent } from './components/work-category/work-category.component';
import { WorkAlbumComponent } from './components/work-album/work-album.component';
import { ImgZoomComponent } from './components/img-zoom/img-zoom.component';
import { WorksListComponent } from './components/works-list/works-list.component';
import { AlbumDetailComponent } from './components/works-list/album-detail/album-detail.component';
import { PageTypeComponent } from './components/page-type/page-type.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { IllustrationTileComponent } from './components/illustration-tile/illustration-tile.component';

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
import { ImgDetailComponent } from './components/works-list/album-detail/img-detail/img-detail.component';
import { ArtWorkViewComponent } from './components/art-work-view/art-work-view.component';
import { GetImgUrlPipe } from './pipes/get-img-url.pipe';
import { GetByCategoryPipe } from './pipes/get-by-category.pipe';

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
    PageTypeComponent,
    GetByTypePipe,
    WorksListComponent,
    AlbumDetailComponent,
    ImgDetailComponent,
    ArtWorkViewComponent,
    GetImgUrlPipe,
    GetByCategoryPipe,
    PageListComponent,
    IllustrationTileComponent
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
