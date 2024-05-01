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
  selector: 'app-view-subcontractors',
  templateUrl: './view-subcontractors.component.html',
  styleUrls: ['./view-subcontractors.component.css'],
})
export class ViewSubcontractorsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'subcon_company_name',
    'subcon_contact_person',
    'subcon_contact_number',
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
    this.getSubContractorsData();
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

  getSubContractorsData() {
    this.clientHttpService.getSubContractorsData().subscribe({
      next: (result) => {
        console.log('****');
        console.log('Get getSubContractorsData API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.dataSource.data = result.data;
        } else {
          this.toastr.error(
            'Error occurred while fetching getSubContractorsData details',
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
          'Error occurred while fetching getSubContractorsData details',
          'FAILURE',
          {
            positionClass: 'toast-top-center',
          }
        );
      },
    });
  }

  navigateToAddSubContractor() {
    this.router.navigate(['/addSubContractor']);
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  rowEdit(rowData: any) {
    this.dataShareService.setData(rowData);
    this.router.navigate(['/addSubContractor']);
  }
  rowDelete(rowData: any) {}
}
export interface SubContractorsDetails {
  id: number;
  subcon_company_name: string;
  subcon_company_address: string;
  subcon_contact_person: string;
  subcon_contact_number: string;
  subcon_contact_depart: string;
  subcon_email: string;
  subcon_invoice_terms: string;
  subcon_payment_terms: string;
  subcon_vat_reg: string;
  subcon_vat_number: string;
  subcon_payrate: string;
  subcon_status: string;
  company_branch: string;
  created_at: string;
  updated_at: string;
}
