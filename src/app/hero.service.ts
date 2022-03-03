import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private hClient: HttpClient, private messageService: MessageService) { }

  public getHeroes(): Observable<Hero[]> {
    return this.hClient.get<Hero[]>(this.heroesURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * getHero
   */
  public getHero(id: number): Observable<Hero> {
    return this.hClient.get<Hero>(`${this.heroesURL}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /**
   * searchHeroes
   */
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.hClient.get<Hero[]>(`${this.heroesURL}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found heroes matching ${term}`) : this.log(`no heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /**
   * updateHero
   */
  public updateHero(hero: Hero): Observable<any> {
    return this.hClient.put(this.heroesURL, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /**
   * addHero
   */
  public addHero(hero: Hero): Observable<Hero> {
    return this.hClient.post<Hero>(this.heroesURL, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /**
   * deleteHero
   */
  public deleteHero(id: number): Observable<Hero> {
    return this.hClient.delete<Hero>(`${this.heroesURL}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
