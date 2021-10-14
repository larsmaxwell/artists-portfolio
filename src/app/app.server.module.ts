import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './components/app.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UniversalInterceptor} from './universal-interceptor';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: UniversalInterceptor,
  //   multi: true
  // }]
})
export class AppServerModule {}
