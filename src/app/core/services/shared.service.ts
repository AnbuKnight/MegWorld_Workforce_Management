import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  displayNavBars: boolean=true;
  setGlobalVariable(value: any) {
    this.displayNavBars = value;
  }

  getGlobalVariable() {
    return this.displayNavBars;
  }
}
