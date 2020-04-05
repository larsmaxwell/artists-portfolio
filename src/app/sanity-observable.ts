import {Observable} from 'rxjs';

const sanityClient = require('@sanity/client');
import { environment } from '../environments/environment';


const sanity$ = Observable.create((subject, sanityClient) => {

    const sanityClient2 = new sanityClient({
        projectId: environment.sanityProjectId,
        dataset: environment.dataset,
        useCdn: environment.useCdn, // `false` if you want to ensure fresh data
        ignoreBrowserTokenWarning: true
      });


    console.log('In Observable');
    
 });
 const subscription = sanity$.subscribe(console.log);
  
//  setTimeout(() => subscription.unsubscribe(), 10 * 1000);