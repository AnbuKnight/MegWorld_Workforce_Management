import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddClientComponent } from './features/client/add-client/add-client.component';
import { ViewClientComponent } from './features/client/view-client/view-client.component';
import { AddEmployeeComponent } from './features/Workforce/Employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './features/Workforce/Employee/view-employee/view-employee.component';
import { AddSubcontractorComponent } from './features/Workforce/SubContractors/add-subcontractor/add-subcontractor.component';
import { ViewSubcontractorsComponent } from './features/Workforce/SubContractors/view-subcontractors/view-subcontractors.component';
import { AddSiteComponent } from './features/sites/add-site/add-site.component';
import { ViewSitesComponent } from './features/sites/view-sites/view-sites.component';
import { AddEventComponent } from './features/event/add-event/add-event.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'viewclient', component: ViewClientComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'viewEmployee', component: ViewEmployeeComponent },
  { path: 'addSubContractor', component: AddSubcontractorComponent },
  { path: 'viewSubContractor', component: ViewSubcontractorsComponent },
  { path: 'addSite', component: AddSiteComponent },
  { path: 'viewSite', component: ViewSitesComponent },
  { path: 'addEvent', component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
