import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getByType'
})
export class GetByTypePipe implements PipeTransform {

  transform(items: Array<any>, category: string): Array<any> {
    if (items) return items.filter(item => item.type === category).reverse();
  }

}
