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
    .get<{ results: Product[] }>('http://127.0.0.1:8000/api/products/')
    .pipe(map(response => response.results));
}
}
