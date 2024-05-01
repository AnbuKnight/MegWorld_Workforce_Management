import { Component } from '@angular/core';
import { SharedService } from './core/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkForceManagement';
  constructor(public sharedService: SharedService) { 
    console.log(this.sharedService)
  }
}
