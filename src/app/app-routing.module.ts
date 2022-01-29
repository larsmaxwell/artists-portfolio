import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index/index.component';
import { IllustrationComponent } from './components/illustration/illustration.component';
import { IllustrationListComponent } from './components/illustration-list/illustration-list.component';
import { AlbumComponent } from './components/album/album.component';
import { WorkComponent } from './components/work/work.component';
import { PageComponent } from './components/page/page.component';
import { IllustrationResolverService } from './services/illustration-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', 
    component: IllustrationComponent,
    resolve: {illustrations: IllustrationResolverService},
    data: { home: true }, },
  { path: 'illustration/', 
    component: IllustrationComponent,
    resolve: {illustrations: IllustrationResolverService},
    data: { home: true },
  },
  { path: 'illustration/:imgId',
    component: IllustrationComponent, 
    resolve: {illustrations: IllustrationResolverService},
    data: { home: false },
  },
  { path: 'works/:permalink', component: WorkComponent,
    children: [
      { path: '', component: AlbumComponent },
      { path: ':imgId', component: AlbumComponent },
      { path: ':albumId/:imgId', redirectTo: ':imgId' }
    ]
  },
  { path: 'about', redirectTo: 'pages/about' },
  { path: 'pages/:permatwo', component: PageComponent},
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
