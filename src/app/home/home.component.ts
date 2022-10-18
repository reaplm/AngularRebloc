import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vendors: Vendor[] = [];
  selectedVendor?: Vendor;

  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.getVendors();
  }
  /**
   * Fetch vendor list
   */
  getVendors(): void{
    this.vendors = this.vendorService.getVendors();
  }
  onSelected(vendor: Vendor): void{
    this.selectedVendor = vendor;
  }
}
