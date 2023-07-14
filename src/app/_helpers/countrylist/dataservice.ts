import { Injectable } from '@angular/core';
import { Country } from './country';
import { City } from './city';


@Injectable()
export class DataService {
  cities: City[];
  countries: Country[];

  findCountry(id) {
    this.countries = this.getCountries()

    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].id == id) {
        return this.countries[i]
      } else {
        return this.countries[0]
      }
    }
  }

  findCity(id) {
    this.cities = this.getCities()

    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].id == id) {
        return this.cities[i]
      } else {
        return this.cities[0]
      }
    }
  }


  getCountries() {
    return [
      new Country("", ""),
      new Country('1', 'Mexico'),
      new Country('2', 'Canada'),
    ];
  }

  getCities() {
    return [
      new City('1', '1', 'Monterrey'),
      new City('2', '1', 'Guadalajara'),
      new City('3', '1', 'CDMX'),
      new City('4', '2', 'Vancouver'),
      new City('5', '2', 'Toronto'),
    ];
  }
}
