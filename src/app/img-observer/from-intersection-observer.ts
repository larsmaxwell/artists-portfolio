import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';

export enum IntersectionStatus {
  Visible = 'Visible',
  Pending = 'Pending',
  NotVisible = 'NotVisible'
}

export const fromIntersectionObserver = (
  element: HTMLImageElement,
  config: IntersectionObserverInit,
  debounce: number
) =>
  new Observable<IntersectionStatus>(subscriber =>  {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserverInit;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) =>  {
        entries.forEach(entry => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer })
          }
        });
      },
      config
    )

    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });

    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      }
    }
  });


function isIntersecting(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
  