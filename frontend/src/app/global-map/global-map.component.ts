import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { CountryService } from '../country.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-global-map',
  standalone: false,
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {
  map: any;
  countryStabilityData: any = {};

  countries = [
  { id: '1', name: 'China', lat: 35.8617, lon: 104.1954 },
  { id: '2', name: 'India', lat: 20.5937, lon: 78.9629 },
  { id: '3', name: 'USA', lat: 37.0902, lon: -95.7129 },
  { id: '4', name: 'Indonesia', lat: -0.7893, lon: 113.9213 },
  { id: '5', name: 'Pakistan', lat: 30.3753, lon: 69.3451 },
  { id: '6', name: 'Brazil', lat: -14.2350, lon: -51.9253 },
  { id: '7', name: 'Nigeria', lat: 9.0820, lon: 8.6753 },
  { id: '8', name: 'Bangladesh', lat: 23.6850, lon: 90.3563 },
  { id: '9', name: 'Russia', lat: 61.5240, lon: 105.3188 },
  { id: '10', name: 'Mexico', lat: 23.6345, lon: -102.5528 },
  { id: '11', name: 'Japan', lat: 36.2048, lon: 138.2529 },
  { id: '12', name: 'Ethiopia', lat: 9.1450, lon: 40.4897 },
  { id: '13', name: 'Philippines', lat: 12.8797, lon: 121.7740 },
  { id: '14', name: 'Egypt', lat: 26.0975, lon: 30.0444 },
  { id: '15', name: 'Vietnam', lat: 14.0583, lon: 108.2772 },
  { id: '16', name: 'DR Congo', lat: -4.0383, lon: 21.7587 },
  { id: '17', name: 'Turkey', lat: 38.9637, lon: 35.2433 },
  { id: '18', name: 'Iran', lat: 32.4279, lon: 53.6880 },
  { id: '19', name: 'Germany', lat: 51.1657, lon: 10.4515 },
  { id: '20', name: 'Thailand', lat: 15.8700, lon: 100.9925 },
  { id: '21', name: 'United Kingdom', lat: 55.3781, lon: -3.4360 },
  { id: '22', name: 'France', lat: 46.6034, lon: 1.8883 },
  { id: '23', name: 'Italy', lat: 41.8719, lon: 12.5674 },
  { id: '24', name: 'Tanzania', lat: -6.3690, lon: 34.8888 },
  { id: '25', name: 'South Africa', lat: -30.5595, lon: 22.9375 },
  { id: '26', name: 'Myanmar', lat: 21.9162, lon: 95.9560 },
  { id: '27', name: 'Kenya', lat: -0.0236, lon: 37.9062 },
  { id: '28', name: 'South Korea', lat: 35.9078, lon: 127.7669 },
  { id: '29', name: 'Colombia', lat: 4.5709, lon: -74.2973 },
  { id: '30', name: 'Spain', lat: 40.4637, lon: -3.7492 },
  { id: '31', name: 'Uganda', lat: 1.3733, lon: 32.2903 },
  { id: '32', name: 'Argentina', lat: -38.4161, lon: -63.6167 },
  { id: '33', name: 'Algeria', lat: 28.0339, lon: 1.6596 },
  { id: '34', name: 'Sudan', lat: 12.8628, lon: 30.2176 },
  { id: '35', name: 'Ukraine', lat: 48.3794, lon: 31.1656 },
  { id: '36', name: 'Iraq', lat: 33.2232, lon: 43.6793 },
  { id: '37', name: 'Afghanistan', lat: 33.9391, lon: 67.7100 },
  { id: '38', name: 'Poland', lat: 51.9194, lon: 19.1451 },
  { id: '39', name: 'Canada', lat: 56.1304, lon: -106.3468 },
  { id: '40', name: 'Morocco', lat: 31.7917, lon: -7.0926 },
  { id: '41', name: 'Saudi Arabia', lat: 23.8859, lon: 45.0792 },
  { id: '42', name: 'Uzbekistan', lat: 41.3775, lon: 64.5853 },
  { id: '43', name: 'Peru', lat: -9.1900, lon: -75.0152 },
  { id: '44', name: 'Angola', lat: -11.2027, lon: 17.8739 },
  { id: '45', name: 'Malaysia', lat: 4.2105, lon: 101.9758 },
  { id: '46', name: 'Mozambique', lat: -18.6657, lon: 35.5296 },
  { id: '47', name: 'Ghana', lat: 7.9465, lon: -1.0232 },
  { id: '48', name: 'Yemen', lat: 15.5527, lon: 48.5164 },
  { id: '49', name: 'Nepal', lat: 28.3949, lon: 84.1240 },
  { id: '50', name: 'Venezuela', lat: 6.4238, lon: -66.5897 }
  ];

  constructor(private router: Router, private countryService: CountryService) {}

  ngOnInit() {
    this.initializeMap();
    this.loadCountryStabilityData();
  }

  loadCountryStabilityData() {
    const requests = this.countries.map(country => 
      this.countryService.getCountryStability(country.name)
    );

    forkJoin(requests).subscribe(responses => {
      responses.forEach((data, index) => {
        this.countryStabilityData[this.countries[index].id] = data.stabilityScore;
      });
      this.addMarkers();
    }, error => {
      console.error('Error loading data', error);
      this.addDefaultMarkers();
    });
  }

  addDefaultMarkers() {
    this.countries.forEach(country => {
      const randomScore = Math.floor(Math.random() * 101);

      let color: string;
      if (randomScore > 90) {
        color = "#00FF00";
      } else if (randomScore> 80) {
        color = "#33FF00"
      } else if (randomScore > 70) {
        color = "#66FF00"
      } else if (randomScore > 60) {
        color = "#CCFF00"
      } else if (randomScore > 50) {
        color = "#FFFF00"
      } else if (randomScore > 40) {
        color = "#FFCC00"
      } else if (randomScore > 30) {
        color = "#FF9900"
      } else if (randomScore > 20) {
        color = "#FF6600"
      } else if (randomScore > 10) {
        color = "#FF3300"
      } else {
        color = "#FF0000"
      }

      const countryMarker = L.circleMarker([country.lat, country.lon], {
        color: color,
        radius: 10
      })
        countryMarker.addTo(this.map)
        countryMarker.bindPopup(`<b>${country.name}</b><br>Stability Score: ${randomScore} `);
        countryMarker.on('mouseover', function (e) {
          countryMarker.openPopup();
        });
        countryMarker.on('mouseout', function(e) {
          countryMarker.closePopup();
        });
        //countryMarker.on('mouseover', () => this.onCountryHover([countryMarker]));
        countryMarker.on('click', () => this.onCountryClick(country.name));
    })
  }
  onCountryHover(countryMarker: any) {
    countryMarker.openPopup();
  }

  addMarkers() {
    this.countries.forEach(country => {
      const stabilityScore = this.countryStabilityData[country.id] || 50;

      let color: string;
      if (stabilityScore > 90) {
        color = "#00FF00";
      } else if (stabilityScore > 80) {
        color = "#33FF00"
      } else if (stabilityScore > 70) {
        color = "#66FF00"
      } else if (stabilityScore > 60) {
        color = "#CCFF00"
      } else if (stabilityScore > 50) {
        color = "#FFFF00"
      } else if (stabilityScore > 40) {
        color = "#FFCC00"
      } else if (stabilityScore > 30) {
        color = "#FF9900"
      } else if (stabilityScore > 20) {
        color = "#FF6600"
      } else if (stabilityScore > 10) {
        color = "#FF3300"
      } else {
        color = "#FF0000"
      }

      const countryMarker = L.circleMarker([country.lat, country.lon], {
        color: color,
        radius: 10
      })
        countryMarker.addTo(this.map);
        countryMarker.bindPopup(`<b>${country.name}</b><br>Stability Score: ${stabilityScore}`);
        countryMarker.on('mouseover', function (e) {
          countryMarker.openPopup();
        });
        countryMarker.on('mouseout', function (e) {
          countryMarker.closePopup();
        });
        countryMarker.on('click', () => this.onCountryClick(country.name));
    });
  }

  initializeMap() {
    this.map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  onCountryClick(country: string) {
    this.router.navigate(['/country', country]);
    //this.router.navigate(['/error']);
  }
}
