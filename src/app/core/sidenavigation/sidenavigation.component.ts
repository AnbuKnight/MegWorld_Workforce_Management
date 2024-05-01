import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { UserDetails } from '../models/model/userDetails';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css'],
})
export class SidenavigationComponent implements OnDestroy {
  //@Output() sidenavClose = new EventEmitter();

  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  public loggedInUserName!: string;
  userDetails: UserDetails = new UserDetails();

  constructor(private media: MediaObserver, private router: Router) {
    this.mediaWatcher = this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });

    if (
      localStorage.getItem('userDetails') != null &&
      localStorage.getItem('userDetails') != ''
    ) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails')!);
      this.loggedInUserName = this.userDetails.name!;
    } else {
      this.loggedInUserName = 'User';
    }
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  signout() {
    this.router.navigate(['/signin']);
  }
}

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
export let menu: NavItem[] = [
  {
    displayName: 'Home',
    iconName: 'home',
    route: 'home',
  },
  {
    displayName: 'Profile',
    iconName: 'person',
    route: 'profile',
  },
  {
    displayName: 'About',
    iconName: 'info',
    route: 'about',
  },
];
