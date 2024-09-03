import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brands } from '../../interfaces/brands';
import { Enviroment } from '../../../base/Enviroment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HTTPClient: HttpClient) {}

  getAllBrands(): Observable<Brands> {
    let url: string = `${Enviroment.baseUrl}/api/v1/brands`;
    return this._HTTPClient.get<Brands>(url);
  }
}
