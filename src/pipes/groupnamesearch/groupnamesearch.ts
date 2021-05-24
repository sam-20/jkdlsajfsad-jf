import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GroupnamesearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'groupnamesearch',
})
export class GroupnamesearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
    //replace it.name with the property name u want to filter in the html page
    //eg. it.username ie. if we want to filter usernames
    //.username is the property of the data from the db's console.log(data)*/
      return it.group_name_fetched.toLowerCase().includes(terms);
    });
  }
}
