import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  constructor() {}
  private clientData = new BehaviorSubject<string>('');

  setData(data: string): void {
    this.clientData.next(data);
  }

  getData() {
    return this.clientData.asObservable();
  }

  clearData() {
    this.clientData.next('');
  }
}
