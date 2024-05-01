import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployee } from 'src/app/features/Workforce/Employee/add-employee/add-employee.component';
import { AddSubContractor } from 'src/app/features/Workforce/SubContractors/add-subcontractor/add-subcontractor.component';
import { AddClient } from 'src/app/features/client/add-client/add-client.component';
import { AddSite } from 'src/app/features/sites/add-site/add-site.component';

@Injectable({
  providedIn: 'root',
})
export class ClientHttpService {
  constructor(private http: HttpClient) {}

  addClient(clientDetails: AddClient): Observable<any> {
    let body = JSON.stringify(clientDetails);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 78|iSYfKwfOGjWq8wsccsBLmGt5JajWRStHtyLEidROe993c521',
      },
    };
    console.log('**Input**');
    console.log(JSON.stringify(clientDetails));
    // headers.set(
    //   'Authorization',
    //   'Bearer 75|ECWCGd5cZuN8AfhRjGMvjVFUjKqErLH5aZu3A1Js2a64b3ee'
    // );
    return this.http.post<any>(
      'https://srltd.megworld.in/api/client_store',
      JSON.stringify(clientDetails),
      httpOptions
    );
  }

  getClientsData(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 78|iSYfKwfOGjWq8wsccsBLmGt5JajWRStHtyLEidROe993c521',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'x-requested-with, x-auth-token',
        'Access-Controll-Allow-Credentials': 'true',
      },
    };

    return this.http.post<any>(
      'https://srltd.megworld.in/api/client_show',
      httpOptions
    );
  }

  addEmployee(employeeDetails: AddEmployee): Observable<any> {
    let body = JSON.stringify(employeeDetails);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 78|iSYfKwfOGjWq8wsccsBLmGt5JajWRStHtyLEidROe993c521',
      },
    };
    console.log('**Input**');
    console.log(JSON.stringify(employeeDetails));

    return this.http.post<any>(
      'https://srltd.megworld.in/api/employee_store',
      JSON.stringify(employeeDetails),
      httpOptions
    );
  }

  getEmployeesData(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '82|px5BKmZPU8VLq6ebPZ9rJstuJQ2ftDNN9WpWgwvV626089cf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'x-requested-with, x-auth-token',
        'Access-Controll-Allow-Credentials': 'true',
      },
    };

    return this.http.post<any>(
      'https://srltd.megworld.in/api/employee_show',
      httpOptions
    );
  }

  addSubContractor(subContractorDetails: AddSubContractor): Observable<any> {
    let body = JSON.stringify(subContractorDetails);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 78|iSYfKwfOGjWq8wsccsBLmGt5JajWRStHtyLEidROe993c521',
      },
    };
    console.log('**Input**');
    console.log(JSON.stringify(subContractorDetails));

    return this.http.post<any>(
      'https://srltd.megworld.in/api/sub_contract_store',
      JSON.stringify(subContractorDetails),
      httpOptions
    );
  }

  getSubContractorsData(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '82|px5BKmZPU8VLq6ebPZ9rJstuJQ2ftDNN9WpWgwvV626089cf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'x-requested-with, x-auth-token',
        'Access-Controll-Allow-Credentials': 'true',
      },
    };

    return this.http.post<any>(
      'https://srltd.megworld.in/api/sub_contract_show',
      httpOptions
    );
  }

  addSite(siteDetails: AddSite): Observable<any> {
    let body = JSON.stringify(siteDetails);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 78|iSYfKwfOGjWq8wsccsBLmGt5JajWRStHtyLEidROe993c521',
      },
    };
    console.log('**Input**');
    console.log(JSON.stringify(siteDetails));

    return this.http.post<any>(
      'https://srltd.megworld.in/api/site_store',
      JSON.stringify(siteDetails),
      httpOptions
    );
  }

  getSiteData(): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '82|px5BKmZPU8VLq6ebPZ9rJstuJQ2ftDNN9WpWgwvV626089cf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'x-requested-with, x-auth-token',
        'Access-Controll-Allow-Credentials': 'true',
      },
    };

    return this.http.post<any>(
      'https://srltd.megworld.in/api/site_show',
      httpOptions
    );
  }
}
