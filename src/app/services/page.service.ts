import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Page } from '../types/page';

import { environment } from '../../environments/environment';
const sanityClientService = require('@sanity/client');


@Injectable()
export class PageService {

  private clientUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  clientInit() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      // token: environment.token,
      useCdn: environment.useCdn,
      ignoreBrowserTokenWarning: true
    });
  }

  getPageByPermalink(permalink:string): Observable<Page> {

    const url = `${this.clientUrl}[_type%20==%20"page"%20%26%26%20slug.current%20==%20"${permalink}"]`;
    // console.log("URL ", url);
    return this.http.get<any>(url).pipe(
      map(data => data.result[0]),
      tap(_ => this.log(`fetched work id=${permalink}`)),
      catchError(this.handleError<any>(`getHero id=${permalink}`))
    );
  }

  getPage(client: any, permalink:string): any {
    const query = `*[_type == "page" && slug.current == "${permalink}"]`

    const itemsObservable = new Observable(observer => {
      return client.fetch(query)
        .then(data => {
          console.log(data);
          observer.next(data)
          observer.complete()
        })
        .catch(err => {
          this.handleError(err.message);
        });
    });
    return itemsObservable;
  }

  getPageImages(client: any, id: string) {
    const query = `*[_id == "${id}"]{pageContent[]{..., "asset": asset->}}[]`;
    const itemsObservable = new Observable(observer => {
      return client.fetch(query)
        .then(data => {
          observer.next(data[0].pageContent)
          observer.complete()
        })
        .catch(err => {
          this.handleError(err.message);
        });
    });
    return itemsObservable;
  }

  getPages(client: any) {
    const query = `*[_type == "page"]`
    const itemsObservable = new Observable(observer => {
      return client.fetch(query)
        .then(data => {
          observer.next(data)
          observer.complete()
        })
        .catch(err => {
          this.handleError(err.message);
        });
    });
    return itemsObservable;
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PageService: ' + message);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
