import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Product } from "../models/database";


@Injectable({
 providedIn: 'root'
})
export class DatabaseService {

 constructor(private http: HttpClient) { }

 getAllProducts(): Observable<Product[]> {
  return this.http
    .get<{ results: Product[] }>('/api/public-products/')
    .pipe(map(response => response.results));
}
}
