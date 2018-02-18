import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { AppComponent } from './app.component';
import { WorksComponent } from './works/works.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorkDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'works/:permalink', component: WorkDetailComponent },
  { path: '**', component: WorkDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
