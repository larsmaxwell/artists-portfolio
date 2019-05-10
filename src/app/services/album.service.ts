import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Album } from '../types/album';
import { MessageService } from '../services/message.service';

@Injectable()
export class AlbumService {

  private albumsUrl = 'api/albums';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET hero by id. Will 404 if id not found */
  getAlbum(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => this.log(`fetched album id=${id}`)),
      tap(_ => console.log(this)),
      catchError(this.handleError<Album>(`getAlbum id=${id}`))
    );
  }
  
  /** GET hero by id. Will 404 if id not found */
  getAlbumByWorkID(workId: number): Observable<Album> {
    const url = `${this.albumsUrl}/${workId}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => this.log(`fetched album id=${workId}`)),
      tap(_ => console.log(this)),
      catchError(this.handleError<Album>(`getHero id=${workId}`))
    );
  }
  
  /** GET work by id. Return `undefined` when id not found */
  getAlbumNo404<Data>(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/?id=${id}`;
    return this.http.get<Album[]>(url)
      .pipe(
        map(works => works[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} work id=${id}`);
        }),
        catchError(this.handleError<Album>(`getWork id=${id}`))
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
    this.messageService.add('AlbumService: ' + message);
  }

}
