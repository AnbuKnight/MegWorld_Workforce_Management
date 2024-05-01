import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { ClientHttpService } from 'src/app/core/services/client-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/core/services/data-share.service';

@Component({
  selector: 'app-view-sites',
  templateUrl: './view-sites.component.html',
  styleUrls: ['./view-sites.component.css'],
})
export class ViewSitesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'site_client_name',
    'site_contact_person',
    'site_contact_number',
    'site_address',
    'edit',
    'delete',
  ];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // dataSource!: MatTableDataSource<PeriodicElement, MatTableDataSourcePaginator>;
  dataSource = new MatTableDataSource();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private clientHttpService: ClientHttpService,
    private toastr: ToastrService,
    private router: Router,
    private dataShareService: DataShareService
  ) {
    this.getSiteData();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getSiteData() {
    this.clientHttpService.getSiteData().subscribe({
      next: (result) => {
        console.log('****');
        console.log('Get getSiteData API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.dataSource.data = result.data;
        } else {
          this.toastr.error(
            'Error occurred while fetching getSiteData details',
            'FAILURE',
            {
              positionClass: 'toast-top-center',
            }
          );
        }

        //alert(1);
      },
      error: (error) => {
        //alert(2);
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error(
          'Error occurred while fetching getSiteData details',
          'FAILURE',
          {
            positionClass: 'toast-top-center',
          }
        );
      },
    });
  }

  navigateToAddSite() {
    this.router.navigate(['/addSite']);
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  rowEdit(rowData: any) {
    this.dataShareService.setData(rowData);
    this.router.navigate(['/addSite']);
  }
  rowDelete(rowData: any) {}
}
export interface SiteDetails {
  id: number;
  site_client_name: string;
  site_group_name: string;
  site_name: string;
  site_contact_person: string;
  site_contact_number: string;
  site_trained_guard: string;
  site_address: string;
  site_post_code: string;
  site_bill_guarding: string;
  site_bill_supervisor: string;
  site_pay_guarding: string;
  site_pay_supervisor: string;
  site_note: string;
  site_status: string;
  company_branch: string;
  created_at: string;
  updated_at: string;
}
