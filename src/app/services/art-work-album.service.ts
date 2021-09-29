import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../services/message.service';
import { Album } from '../models/album.model';

import { environment } from '../../environments/environment';


const sanityClient = require('@sanity/client');


@Injectable()
export class ArtWorkAlbumService {

  
  // private worksUrl = 'api/works';

  // sanity api key: skIgrXCNujRThrjUHWDYQIz36xGRfxjWM0OfUAYK9MzhVOwNccJZcqwyGBq9UsGuke54ZkGtXUymjSmqlpYuFRe0i88LGAqefGB0gqNM72y6a0CcEAWv4BzRHOiRkiBvvDSj9nVhabGq8b5ZD5gbQyzA47PeQrbp6D9AeJ0yVJEXQVvOM2pC

  private worksUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Get Work from the server */
  getAlbums (): Observable<Album[]> {
    // const options = { params: new HttpParams().set('archive', 'false') };
    const newUrl = `${this.worksUrl}[_type%20==%20$type]&$type="album"`;

    return this.http.get<Album[]>(newUrl)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWorks', []))
      );
  }

  /** GET work by id. Return `undefined` when id not found */
  getAlbumNo404<Data>(id: number): Observable<Album> {
    const url = `${this.worksUrl}/?id=${id}`;
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

  getAlbumImages(client: any, id: string) {
    const query = `*[_id == "${id}"]{images[]{..., "asset": asset->}}[]`;
    const itemsObservable = new Observable(observer => {
      return client.fetch(query)
        .then(data => {
          observer.next(data[0].images)
          observer.complete()
        })
        .catch(err => {
          this.handleError(err.message);
        });
    });
    return itemsObservable;
  }

  /** GET Album by id. Will 404 if id not found */
  getAlbumById(id: String): Observable<any> {
    const url = `${this.worksUrl}[_id%20==%20$id]&$id="${id}"`;

    return this.http.get<any>(url).pipe(
      map(album => album.result[0]),
      tap(_ => this.log(`fetched work id=${id}`)),
      catchError(this.handleError<any>(`getHero id=${id}`))
    );
  }

  sanityInit() {
    return new sanityClient({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      useCdn: environment.useCdn, // `false` if you want to ensure fresh data
      ignoreBrowserTokenWarning: true
    });
  }

  sanityGetAlbumById(id: String, client: any) {
    const query = `*[_id == '${id}']`
    return client.fetch(query);
  }

  getCategories(client: any) {
    const query = '*[_type == "category"]'

    return client.fetch(query);
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
