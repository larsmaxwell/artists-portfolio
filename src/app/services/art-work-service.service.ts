import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ArtWork } from '../types/art-work';
import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArtWorkService {

  private env = "production"
  private id = "qwmluuy0"
  private worksUrl = "https://" + this.id + ".api.sanity.io/v1/data/query/" + this.env + "/?query=*"

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Get ArtWorks from the server */
  getWorks (): Observable<ArtWork[]> {
    // const options = { params: new HttpParams().set('archive', 'false') };
    const newUrl = `${this.worksUrl}[_type%20==%20$type]&$type="artwork"`;

    return this.http.get<ArtWork[]>(newUrl)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWorks', []))
      );
  }

  getWorkByPermalink(permalink:string): Observable<ArtWork> {
    const url = `${this.worksUrl}[_type%20==%20"artwork"%20%26%26%20slug.current%20==%20"${permalink}"]`;
    return this.http.get<any>(url)
      .pipe(
        map(artwork => artwork.result[0]),
        tap(_ => this.log(`fetched permalink=${permalink}`)),
        catchError(this.handleError<ArtWork[]>('getByPermalink', []))
      );
  }

  /** GET work by id. Will 404 if id not found */
  getWork(id: String): Observable<ArtWork> {
    const url = `${this.worksUrl}[_id%20==%20${id}]`;
    return this.http.get<ArtWork>(url).pipe(
      tap(_ => this.log(`fetched work id=${id}`)),
      catchError(this.handleError<ArtWork>(`getHero id=${id}`))
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
