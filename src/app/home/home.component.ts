import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { NgxMasonryComponent } from 'ngx-masonry';

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
  selectedItem: HTMLElement | null;
  
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private vendorService: VendorService,
      private router: Router) { }

  ngOnInit(): void {
    this.selectedItem = null;
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
    var selectedElements = document.querySelectorAll('.card-selected');

    //Unselected any selected
    if(selectedElements.length){
      selectedElements.forEach(elem => {
          elem.classList.remove("card-selected");          
          elem.classList.add("sm-card");
          elem.querySelector('.card-text')?.classList.add('d-none');
      });
    }
    this.selectedItem = document.getElementById(vendor.id.toString()) as HTMLElement;
    this.selectedItem?.classList.add("card-selected");
    this.selectedItem?.classList.remove("sm-card");
    this.selectedItem?.querySelector('.card-text')?.classList.remove('d-none');
    this.selectedItem.scrollIntoView({behavior: 'smooth'});

    this.masonry.reloadItems();
    this.masonry.layout();
    //const detailUrl: string = this.url + vendor.id;
    //this.router.navigateByUrl(detailUrl);
  }

}
