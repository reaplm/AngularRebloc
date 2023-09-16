import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Vendor } from './vendor';
import { VENDORS } from './mock-vendor';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVendors(): Observable<HttpResponse<Vendor[]>>{
    //return VENDORS;
    return this.http.get<Vendor[]>(this.baseUrl + this.apiUrl, {observe: 
'response'})
      .pipe(catchError(this.handleError));
     
  }
  getVendor(id: number): Observable<HttpResponse<Vendor>>{
    //const vendor = VENDORS.find(v => v.id === id)!;

    return this.http.get<Vendor>(this.baseUrl + this.apiUrl + id, {observe: 'response'})
      .pipe(catchError(this.handleError));turn of(vendor);
  }
  getDetailUrl(id: number): string{
    return environment.apiUrl + id; 
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
