import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Work } from '../types/work';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorkService {

  private worksUrl = 'api/works';
//skIgrXCNujRThrjUHWDYQIz36xGRfxjWM0OfUAYK9MzhVOwNccJZcqwyGBq9UsGuke54ZkGtXUymjSmqlpYuFRe0i88LGAqefGB0gqNM72y6a0CcEAWv4BzRHOiRkiBvvDSj9nVhabGq8b5ZD5gbQyzA47PeQrbp6D9AeJ0yVJEXQVvOM2pC


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Get Work from the server */
  getWorks (): Observable<Work[]> {
    const options = { params: new HttpParams().set('archive', 'false') };
    return this.http.get<Work[]>(this.worksUrl, options)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWork', []))
      );
  }

  /** Get Work from the server */
  getWorksByType (type: string): Observable<Work[]> {
    if (!type) {
      // if not search term, return empty hero array.
      return of([]);
    }
    type = type.trim();
    const options = type ?
    { params: new HttpParams().set('type', type).append('archive', 'false') } : {};
 
    return this.http.get<Work[]>(this.worksUrl, options)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWork', []))
      );
  }

  /** GET work by id. Return `undefined` when id not found */
  getWorkNo404<Data>(id: number): Observable<Work> {
    const url = `${this.worksUrl}/?id=${id}`;
    return this.http.get<Work[]>(url)
      .pipe(
        map(works => works[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} work id=${id}`);
        }),
        catchError(this.handleError<Work>(`getWork id=${id}`))
      );
  }

  getWorkByPermalink(permalink:string): Observable<Work[]> {
    if (!permalink) {
      // if not search term, return empty hero array.
      return of([]);
    }
    permalink = permalink.trim();
    const options = permalink ?
    { params: new HttpParams().set('permalink', permalink) } : {};
    return this.http.get<Work[]>(this.worksUrl, options)
      .pipe(
        tap(_ => this.log(`fetched permalink=${permalink}`)),
        catchError(this.handleError<Work[]>('getByPermalink', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getWork(id: number): Observable<Work> {
    const url = `${this.worksUrl}/${id}`;
    return this.http.get<Work>(url).pipe(
      tap(_ => this.log(`fetched work id=${id}`)),
      catchError(this.handleError<Work>(`getHero id=${id}`))
    );
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
