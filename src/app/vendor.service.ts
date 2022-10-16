import { Injectable } from '@angular/core';
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
}
