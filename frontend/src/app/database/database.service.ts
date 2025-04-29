import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { ProductArray } from "./database";


@Injectable({
 providedIn: 'root'
})
export class DatabaseService {

 constructor(private http: HttpClient) { }

 getAllProducts(): Observable<ProductArray> {
   return this.http.get('http://127.0.0.1:8000/api/products/') as Observable<ProductArray>;
 }
}
