import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Product } from "./database";


@Injectable({
 providedIn: 'root'
})
export class DatabaseService {

 constructor(private http: HttpClient) { }

 getAllProducts(): Observable<Product[]> {
  return this.http
    .get<{ results: Product[] }>('/api/products/')
    .pipe(map(response => response.results));
}
}
