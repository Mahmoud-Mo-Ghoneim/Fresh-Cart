import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { categoryResponse } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<categoryResponse> {
    return this._HttpClient.get<categoryResponse>(
      `${Enviroment.baseUrl}/api/v1/categories`
    );
  }

  getSubcategoriesOnCategory(productId: string): Observable<any> {
    return this._HttpClient.get<any>(
      `${Enviroment.baseUrl}/api/v1/categories/${productId}/subcategories`
    );
  }
}
