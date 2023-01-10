import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vendors: Vendor[] = [];
  selectedVendor?: Vendor;
  url: string = "/vendors/detail/";
  moreIcon = faAngleDoubleRight;
  

  constructor(private vendorService: VendorService,
      private router: Router) { }

  ngOnInit(): void {
    this.getVendors();
  }
  /**
   * Fetch vendor list from service
   */
  getVendors(): void{

    this.vendorService.getVendors()
    .subscribe((response) => {
      console.log(response);
        if(response.body != null){
          for( const data of response.body){
            this.vendors.push(data);
          }
        } 
      }
    );
  }
  onCardSelected(vendor: Vendor): void{
    const detailUrl: string = this.url + vendor.id;
    this.router.navigateByUrl(detailUrl);
  }

}
