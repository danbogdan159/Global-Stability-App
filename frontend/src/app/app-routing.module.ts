import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalMapComponent } from './global-map/global-map.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalMapComponent
  },
  {
    path: 'country/:id',
    component: CountryDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
