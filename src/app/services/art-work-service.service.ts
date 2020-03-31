import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ArtWork } from '../types/art-work';
import { MessageService } from '../services/message.service';

import { environment } from '../../environments/environment';
const sanityClientService = require('@sanity/client');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArtWorkService {

  private worksUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  init() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      // token: environment.token,
      useCdn: environment.useCdn,
      ignoreBrowserTokenWarning: true
    });
  }

  /** Get ArtWorks from the server */
  getWorks (client: any) {

    const query = '*[_type == "artwork"]'

    return client.fetch(query);
  }

  getWorkByPermalink(permalink:string): Observable<any> {

    const url = `${this.worksUrl}[_type%20==%20"artwork"%20%26%26%20slug.current%20==%20"${permalink}"]`;

    return this.http.get<any>(url).pipe(
      map(work => work.result[0]),
      tap(_ => this.log(`fetched work id=${permalink}`)),
      catchError(this.handleError<any>(`getHero id=${permalink}`))
    );

    // return client.fetch(query)
    //   .catch(err => {
    //     this.handleError(err.message);
    //   });

      // .pipe(
      //   map(result<any> => result),
      //   tap(_ => this.log(`fetched work permalink=${permalink}`)),
      //   catchError(this.handleError<any>(`getWork permalink=${permalink}`))
      // )
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('WorkService: ' + message);
  }

  getItems(client: any, permalink:string): any {
    const query = `*[_type == "artwork" && slug.current == "${permalink}"]`

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

}
