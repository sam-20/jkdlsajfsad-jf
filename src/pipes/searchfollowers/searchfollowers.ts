import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchfollowersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchfollowers',
})
export class SearchfollowersPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.follower_username_fetched.toLowerCase().includes(terms); // only filter country name
    });
  }
}
