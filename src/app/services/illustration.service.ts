import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../services/message.service';

import { environment } from '../../environments/environment';
import { Illustration } from '../models/illustration.model';
const sanityClientService = require('@sanity/client');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {

  private worksUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  init() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      useCdn: environment.useCdn,
      ignoreBrowserTokenWarning: true
    });
  }

  /** Get ArtWorks from the server */
  getItemsClient(client: any): any {
    const query = `*[_type == "illustration"]`

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

  /** Get ArtWorks from the server */
  getAssetsClient(client: any): any {
    const query = `*[_type == "illustration"]{_id, _createdAt, name, description, featuredImage{..., "asset": asset->}}[]`;

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
}
