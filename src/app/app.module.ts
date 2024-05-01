import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './core/header/header/header.component';
import { SidenavigationComponent } from './core/sidenavigation/sidenavigation.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddClientComponent } from './features/client/add-client/add-client.component';
import { MatCardModule } from '@angular/material/card';
//import { ResponsiveToolbarComponent } from './responsive-toolbar/responsive-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MenuListItemComponent } from './core/header/menu-list-item/menu-list-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { ViewClientComponent } from './features/client/view-client/view-client.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AddEmployeeComponent } from './features/Workforce/Employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './features/Workforce/Employee/view-employee/view-employee.component';
import { ViewSubcontractorsComponent } from './features/Workforce/SubContractors/view-subcontractors/view-subcontractors.component';
import { AddSubcontractorComponent } from './features/Workforce/SubContractors/add-subcontractor/add-subcontractor.component';
import { AddSiteComponent } from './features/sites/add-site/add-site.component';
import { ViewSitesComponent } from './features/sites/view-sites/view-sites.component';
import { AddEventComponent } from './features/event/add-event/add-event.component';
import { ViewEventsComponent } from './features/event/view-events/view-events.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavigationComponent,
    DashboardComponent,
    AddClientComponent,
    MenuListItemComponent,
    ViewClientComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    ViewSubcontractorsComponent,
    AddSubcontractorComponent,
    AddSiteComponent,
    ViewSitesComponent,
    AddEventComponent,
    ViewEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,

    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatStepperModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
