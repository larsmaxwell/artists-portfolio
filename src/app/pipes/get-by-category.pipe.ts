import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getByCategory'
})
export class GetByCategoryPipe implements PipeTransform {

  transform(items: Array<any>, categoryId: string): Array<any> {
    if (items) return items.filter((item) => item.category ? item.category._ref === categoryId : '').reverse();
  }

}
