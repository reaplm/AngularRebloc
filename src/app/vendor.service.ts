import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Vendor } from './vendor';
import { VENDORS } from './mock-vendor';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorsUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getVendors(): Observable<HttpResponse<Vendor[]>>{
    //return VENDORS;
    return this.http.get<Vendor[]>(this.vendorsUrl, {observe: 'response'})
      .pipe(catchError(this.handleError));
     
  }
  getVendor(id: number): Observable<Vendor>{
    const vendor = VENDORS.find(v => v.id === id)!;

    return of(vendor);
  }
  private handleError(error: HttpErrorResponse){
    let errorMsg = "Unknown Error!";
    if( error.error instanceof ErrorEvent){
      //Client side error
      errorMsg = `Error Occured: ${error.error.message}`;
    }else{
      //server side error
      errorMsg = `Status Code: ${error.status} \nError Message: ${error.message}`;
    }
    window.alert(errorMsg);

    return throwError(() => new Error(errorMsg));
  }
  
}
