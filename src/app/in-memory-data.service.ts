import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    const heroes = [...HEROES];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 11;
  }
}
