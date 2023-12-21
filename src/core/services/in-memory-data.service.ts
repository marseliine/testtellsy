import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        login: 'kate',
        password: 'kate',
        firstName: 'Ekaterina',
        lastName: 'Solomatina',
        email: 'solomatina-Ekaterina@ya.ru',
        webSite: 'https://www.google.com/',
        phone: '+77899326278',
      },
    ];
    return { users };
  }
  constructor() {}
}
