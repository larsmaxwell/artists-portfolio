import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { WorkCategoryComponent } from './components/work-category/work-category.component';
import { WorksListComponent } from './components/works-list/works-list.component';
import { ImgZoomComponent } from './components/img-zoom/img-zoom.component';
import { ArtWorkViewComponent } from './components/art-work-view/art-work-view.component';
import { WorkAlbumComponent } from './components/work-album/work-album.component';
import { PageTypeComponent } from './components/page-type/page-type.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workstest', component: WorksListComponent },
  { path: 'works/:permalink', component: ArtWorkViewComponent,
    children: [
      { path: './', component: WorkAlbumComponent },
    ]
  },
  { path: 'works/:permalink/:albumId/:imgId', component: ImgZoomComponent, },
  { path: 'works/:permalink/:albumId/', component: ImgZoomComponent },
  { path: 'works/category/:category', component: WorkCategoryComponent},
  { path: 'pages/:permatwo', component: PageTypeComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
