import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vendors', component: HomeComponent },
  { path: 'vendors/detail/:id', component: VendorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
