import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-details',
  standalone: false,
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent implements OnInit {
  countryId: string = '';
  countryDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryId = params.get('id')!;
      this.getCountryDetails();
    });
  }
  getCountryDetails(): void {
    this.countryService.getCountryDetails(this.countryId).subscribe(data => {
      this.countryDetails = data;
    });
  }
}
