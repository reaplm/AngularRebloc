import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vendor } from './vendor';
import { VENDORS } from './mock-vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor() { }

  getVendors(): Vendor[]{
    return VENDORS;
  }
  getVendor(id: number): Observable<Vendor>{
    const vendor = VENDORS.find(v => v.id === id)!;

    return of(vendor);
  }

}
