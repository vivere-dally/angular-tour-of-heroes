import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  /**
   * add
   * @param message a string representing the message to be stored
   */
  public add(message: string) {
    this.messages.push(message);
  }

  /**
   * clear
   */
  public clear() {
    this.messages = [];
  }
}
