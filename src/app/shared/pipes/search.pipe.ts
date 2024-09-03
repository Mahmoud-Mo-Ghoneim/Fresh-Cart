import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[] , searchWord:string): product[] {
    return productList.filter(product => product.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
