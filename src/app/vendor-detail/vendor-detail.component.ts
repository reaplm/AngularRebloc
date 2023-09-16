import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';


@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  @Input() vendor?: Vendor;
  imageUrl: string;
  padId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vendorService: VendorService
  ) { }

  ngOnInit(): void {
    this.getVendor();
  }
  getVendor(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.getVendor(id)
      .subscribe(response => {
          if(response.body != null){
            this.vendor = response.body;
            this.imageUrl = this.vendor.imageUrl;
            this.padId = this.vendor.id.toString().padStart(2,'0')
          }
      });
  }
}
