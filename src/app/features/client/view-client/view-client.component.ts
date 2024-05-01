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
//import {DataShareService} from '../../../core/services/data-share.service'

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css'],
})
export class ViewClientComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'client_name',
    'client_contact_person',
    'client_contact_number',
    'client_address',
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
    this.getClientsData();
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

  getClientsData() {
    this.clientHttpService.getClientsData().subscribe({
      next: (result) => {
        console.log('****');
        console.log('Get Client API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.dataSource.data = result.data;
        } else {
          this.toastr.error(
            'Error occurred while fetching client details',
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
          'Error occurred while fetching client details',
          'FAILURE',
          {
            positionClass: 'toast-top-center',
          }
        );
      },
    });
  }

  navigateToAddClient() {
    this.router.navigate(['/addClient']);
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  rowEdit(rowData: any) {
    this.dataShareService.setData(rowData);
    this.router.navigate(['/addClient']);
  }
  rowDelete(rowData: any) {}
}

export interface ClientDetails {
  client_address: string;
  client_charge_guarding: number;
  client_charge_supervisor: number;
  client_contact_email: string;
  client_contact_fax: string;
  client_contact_number: string;
  client_contact_person: string;
  client_contract_end: string;
  client_contract_start: string;
  client_invoice_terms: string;
  client_name: string;
  client_payment_terms: string;
  client_status: string;
  client_vat_number: number;
  client_vat_reg: string;
  company_branch: string;
  created_at: string;
  updated_at: string;
  id: number;
}
