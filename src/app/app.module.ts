import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WorksComponent } from './works/works.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MessageService } from './message.service';
import { WorkService } from './work.service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { WorkCategoryComponent } from './work-category/work-category.component';

import { LightboxModule } from 'angular2-lightbox';
import { WorkAlbumComponent } from './work-detail/work-album/work-album.component';
import { AlbumService } from './album.service';
import { ImgZoomComponent } from './work-detail/work-album/img-zoom/img-zoom.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksComponent,
    WorkDetailComponent,
    DashboardComponent,
    AboutComponent,
    MenuComponent,
    HomeComponent,
    WorkCategoryComponent,
    WorkAlbumComponent,
    ImgZoomComponent,
    ContactFormComponent
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
    LightboxModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [WorkService, MessageService, OrderModule, LightboxModule, AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
