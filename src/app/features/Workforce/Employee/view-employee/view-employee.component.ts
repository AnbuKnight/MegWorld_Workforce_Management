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
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'employee_forename',
    'employee_type',
    'employee_department',
    'employee_contactno',
    'employee_sia_no',
    'employee_expdate',
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
    this.getEmployeesData();
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

  getEmployeesData() {
    this.clientHttpService.getEmployeesData().subscribe({
      next: (result) => {
        console.log('****');
        console.log('Get Employee API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.dataSource.data = result.data;
        } else {
          this.toastr.error(
            'Error occurred while fetching employee details',
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
          'Error occurred while fetching employee details',
          'FAILURE',
          {
            positionClass: 'toast-top-center',
          }
        );
      },
    });
  }

  navigateToAddEmployee() {
    this.router.navigate(['/addEmployee']);
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  rowEdit(rowData: any) {
    this.dataShareService.setData(rowData);
    this.router.navigate(['/addclient']);
  }
  rowDelete(rowData: any) {}
}

export interface EmployeeDetails {
  id: string;
  employee_staff_pin: number;
  company_branch: string;
  employee_forename: string;
  employee_middname: string;
  employee_surname: string;
  employee_gender: string;
  employee_dob: string;
  employee_contactno: string;
  employee_type: string;
  employee_jobname: string;
  employee_department: string;
  employee_sia_no: string;
  employee_sia_type: number;
  employee_expdate: string;
  sia_req_check: string;
  employee_status: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
