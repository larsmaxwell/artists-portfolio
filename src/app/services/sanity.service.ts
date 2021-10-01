import { Injectable, Input } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
const imageUrlBuilder = require('@sanity/image-url');
const sanityClientService = require('@sanity/client');
import { environment } from '../../environments/environment'
import { Album } from '../models/album.model';
import { ArtWork } from '../models/art-work.model';
import { Image } from '../models/image.model';
import { Page } from '../models/page.model';
import { MessageService } from './message.service';

@Injectable()
export class SanityService {

  client: any;

  // sanityClientService: any;
  constructor(
    private messageService: MessageService
  ) {
    this.client = this.init();
  }

  init() {
    return new sanityClientService({
      projectId: environment.sanityProjectId,
      dataset: environment.dataset,
      useCdn: environment.useCdn, // `false` if you want to ensure fresh data
    });
  }

  getImageUrlBuilder() {
    return new imageUrlBuilder(this.client);
  }

  getPage(permalink:string):Observable<Page> {
    const query = `*[_type == "page" && slug.current == "${permalink}"]`
    return this.getSanityObservable(query).pipe(
      map((data) => {
        return data[0];
      })
    );
  }

  getPageImages(id: string):Observable<any> {
    const query = `*[_id == "${id}"]{pageContent[]{..., "asset": asset->}}[]`;
    return this.getSanityObservable(query).pipe(
      map((data) => data[0].pageContent)
    );
  }

  getPages():Observable<Page[]> {
    const query = `*[_type == "page"]`
    return this.getSanityObservable(query);
  }
  
  /** Get ArtWorks from the server */
  getIllustrationAssets():Observable<any> {
    const query = `*[_type == "illustration"]{_id, _createdAt, name, description, featuredImage{..., "asset": asset->}}[]`;
    return this.getSanityObservable(query);
  }

  /** Get ArtWorks from the server */
  getWorks():Observable<ArtWork[]> {
    const query = '*[_type == "artwork"]';
    return this.getSanityObservable(query);
  }

  getWorkByPermalink(permalink:string): Observable<ArtWork> {
    const query = `*[_type == "artwork" && slug.current == "${permalink}"]`;
    return this.getSanityObservable(query)
    .pipe(
      map(work => work[0])
    );;
  }

  getAlbumImages(id: string):Observable<any> {
    const query = `*[_id == "${id}"]{images[]{..., "asset": asset->}}[]`;
    return this.getSanityObservable(query).pipe(
      map(data => {
        return data[0].images
      })
    );
  }

  getSanityObservable(query:string) {
    return new Observable<any>(observer => {
      return this.client.fetch(query)
        .then(data => {
          observer.next(data)
          observer.complete()
        })
        .catch(err => {
          observer.error(err);
        });
    })
    .pipe(
      catchError(error => {
        this.handleError(error.message);
        return throwError(error);
      })
    );;
  }

  getCategories() {
    const query = '*[_type == "category"]'

    return this.client.fetch(query);
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

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add('PageService: ' + message);
  }
}
