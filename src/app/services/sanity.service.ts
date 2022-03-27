import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const imageUrlBuilder = require('@sanity/image-url');
const sanityClientService = require('@sanity/client');
import { environment } from '../../environments/environment'
import { Album } from '../models/album.model';
import { ArtWork } from '../models/art-work.model';
import { Category } from '../models/category.model';
import { Image } from '../models/image.model';
import { Page } from '../models/page.model';
import { MessageService } from './message.service';

@Injectable()
export class SanityService {

  client: any;
  private worksUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"

  // sanityClientService: any;
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
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

  getItemById(id: string): Observable<any> {
    const query = `[_id == "${id}"]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      tap(_ => this.log(`fetched item by ID`)),
      map(data => {
        return data.result[0];
      }),
      catchError(this.handleError<any>(`Error fetching Item by ID`))
    );
  }

  getSiteSettings(): Observable<any> {
    const query = `[_id == "siteSettings"]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      tap(_ => this.log(`fetched site document`)),
      map(data => {
        return data.result[0];
      }),
      catchError(this.handleError<any>(`Error fetching Site Document`))
    );
  }

  getMenu(id: string): Observable<any> {
    // string to nest internalLink reference to object
    const internalLinkQueryString =
    `"internalLinkContent": {
      "permalink": internalLink->slug,
      "_type": internalLink->_type,
    }`;
    // nested menu
    // internal links can be fetched
    // instead of referenced using -> operator
    const query = `[_id == "${id}"]{
      ...,
      items[]{
        ...,
        navigationItemUrl{
          ...,
          ${internalLinkQueryString}
        },
        childrenItems[]{
          ...,
          navigationItemUrl{
            ...,
            ${internalLinkQueryString}
          }
        }
      }
    }`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      tap(_ => this.log(`fetched navigation document`)),
      map(data => {
        return data.result[0];
      }),
      catchError(this.handleError<any>(`Error fetching Navigation Document`))
    );
  }

  getPage(permalink:string):Observable<Page> {
    const query = `[_type == "page" && slug.current == "${permalink}"]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(data => data.result[0]),
      tap(data => this.log(`fetched page id=${data._id}`)),
      catchError(this.handleError<any>(`Page permalink=${permalink}`))
    );
  }

  getPageBlockContents(id: string):Observable<any> {
    const query = `[_id == "${id}"]{pageContent[]{..., "asset": asset->}}[]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(data => data.result[0].pageContent),
      tap(_ => this.log(`fetched pageContent`)),
      catchError(this.handleError<any>(`Works not found`))
    );
  }

  getPages():Observable<Page[]> {
    const query = `[_type == "page"]`
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(data => data.result),
      tap(_ => this.log(`fetched works`)),
      catchError(this.handleError<any>(`Works not found`))
    );
  }
  
  /** Get ArtWorks from the server */
  getIllustrationAssets():Observable<any> {
    const query = `[_type == "illustration"]{_id, _createdAt, releaseDate, name, description, featuredImage{..., "asset": asset->}}[]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      tap(_ => this.log(`fetched illustration images`)),
      map(data => {
        return data.result.sort((a, b) => {
          const date1 = new Date(a.releaseDate).getTime();
          const date2 = new Date(b.releaseDate).getTime();
          if (date1 < date2) {
            return 1;
          }
          if (date1 > date2) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }),
      catchError(this.handleError<any>(`fetched illustration images`))
    );
  }

  /** Get ArtWorks from the server */
  getWorks():Observable<ArtWork[]> {
    const query = '[_type == "artwork"]';
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(data => data.result),
      tap(_ => this.log(`fetched works`)),
      catchError(this.handleError<any>(`Works not found`))
    );
  }

  getWorkByPermalink(permalink:string): Observable<ArtWork> {
    // For some reason, sanity client does not work with SSR
    const query = `[_type == "artwork" && slug.current == "${permalink}"]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(work => work.result[0]),
      tap(work => this.log(`fetched work id=${work._id}`)),
      catchError(this.handleError<any>(`Work permalink=${permalink}`))
    );
  }

  getAlbumImages(id: string): Observable<any> {
    const query = `[_id == "${id}"]{images[]{..., "asset": asset->}}[]`;
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      tap(_ => this.log(`fetched album images ${id}`)),
      map(data => {
        return data.result[0].images;
      }),
      catchError(this.handleError<any>(`Work albume ID =${id}`))
    );
  }

  getCategories():Observable<Category[]> {
    const query = '[_type == "category"]';
    const encodeStr = encodeURIComponent(query);

    return this.http.get<any>(`${this.worksUrl}${encodeStr}`).pipe(
      map(data => data.result),
      tap(_ => this.log(`fetched categories`)),
      catchError(this.handleError<any>(`Categories`))
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

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add('SanityService: ' + message);
  }
}
