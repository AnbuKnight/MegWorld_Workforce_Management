import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { UserDetails } from '../../models/model/userDetails';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  //@Output() public sidenavToggle = new EventEmitter();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '/dashboard',
    },
    {
      label: 'Clients',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '/viewclient',
    },
    {
      label: 'Workforce',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      isDropdown: true,
      dropdownList: [
        { label: 'Employees', navigationLink: '/viewEmployee' },
        { label: 'Sub Contractors', navigationLink: '/viewSubContractor' },
      ],
      navigationLink: '',
    },
    {
      label: 'Site',
      icon: '',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '/viewSite',
    },
    {
      label: 'Events',
      icon: '',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '/addEvent',
    },
    {
      label: 'Roaster',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '',
    },
    {
      label: 'Invoices',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      isDropdown: true,
      dropdownList: [
        { label: 'Invoices', navigationLink: '' },
        { label: 'Payments', navigationLink: '' },
      ],
      navigationLink: '',
    },
    {
      label: 'Settings',
      icon: 'rss_feed',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '',
    },
    {
      label: 'Logout',
      icon: 'rss_feed',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      isDropdown: false,
      dropdownList: [],
      navigationLink: '',
    },
  ];

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  public loggedInUserName!: string;
  userDetails: UserDetails = new UserDetails();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media1: MediaMatcher,
    private media: MediaObserver,
    private router: Router
  ) {
    this.mobileQuery = media1.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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

  ngOnInit(): void {}
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
}
export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  isDropdown: boolean;
  dropdownList: SubMenuItem[];
  navigationLink: string;
}

export interface SubMenuItem {
  label: string;
  navigationLink: string;
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
    displayName: 'Site',
    iconName: 'home',
    route: 'home',
  },
  {
    displayName: 'Event',
    iconName: 'person',
    route: 'profile',
  },
  {
    displayName: 'Roaster',
    iconName: 'info',
    route: 'about',
  },
];
