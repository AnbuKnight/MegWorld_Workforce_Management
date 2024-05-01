import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, MAT_DATE_FORMATS } from '@angular/material/core';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, map, startWith } from 'rxjs';
import { LoginUserModel, Users } from 'src/app/core/models/model/users';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginServiceService } from 'src/app/core/services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { ClientHttpService } from 'src/app/core/services/client-http.service';
import { DataShareService } from 'src/app/core/services/data-share.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent {
  constructor(
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private clientHttpService: ClientHttpService,
    private toastr: ToastrService,
    private dataShareService: DataShareService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    if (this.isNew == false) {
      this.dataShareService.getData().subscribe((data) => {
        this.selectedRowDataFromClientView = data;
        if (data != '' && data != null && data != undefined) {
          this.isNew = false;
          this.loadClientData();
        }
      });
    }
  }
  ngOnInit() {
    this.filteredCountryList =
      this.firstFormGroup.controls.siteGroupFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCountry(value || ''))
      );

    this.filteredClientNameList =
      this.firstFormGroup.controls.clientNameFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterClientname(value || ''))
      );

    this.filteredInvoiceTermList =
      this.thirdFormGroup.controls.invoiceTermFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterInvoiceTerm(value || ''))
      );
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
  selectedRole: string = 'Admin';
  selectedRowDataFromClientView!: any;
  isNew: boolean = true;

  firstFormGroup = this._formBuilder.group({
    clientNameFormControl: ['', Validators.required],
    siteGroupFormControl: [''],
    siteNameFormControl: [''],
  });
  secondFormGroup = this._formBuilder.group({
    FirstNameFormControl: [''],
    LastNameFormControl: [''],
    emailFormControl: [''],
    phoneFormControl: [''],
    contactFaxFormControl: [''],
    addressFormControl: [''],
    postCodeFormControl: [''],
  });
  thirdFormGroup = this._formBuilder.group({
    invoiceTermFormControl: [''],
    siteNoteFormControl: [''],
    contractStartFormControl: new Date(),
    contractEndFormControl: new Date(),
    siteBillableRateGuardingFormControl: [''],
    sitePayableRateGuardingFormControl: [''],
    siteBillableRateSupervisorFormControl: [''],
    sitePayableRateSupervisorFormControl: [''],
  });

  countryList: string[] = ['India', 'United States', 'United Kingdom'];
  filteredCountryList: Observable<string[]> | undefined;

  clientNameList: string[] = ['Client 1', 'Client 2', 'Client 3'];
  filteredClientNameList: Observable<string[]> | undefined;

  invoiceTermList: string[] = [
    'Fortnightly Invoice',
    'Monthly Invoice',
    'Weekly Invoice',
  ];
  filteredInvoiceTermList: Observable<string[]> | undefined;

  matcher = new MyErrorStateMatcher();

  userObject: Users = new Users();
  LoginUserObject: LoginUserModel = new LoginUserModel();

  userRoles: any = [
    {
      id: 1,
      roleName: 'Admin',
    },
    {
      id: 2,
      roleName: 'User',
    },
    {
      id: 3,
      roleName: 'Staff',
    },
  ];
  stepperOrientation!: Observable<StepperOrientation>;
  addSiteObject: AddSite = new AddSite();

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countryList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterClientname(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientNameList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterInvoiceTerm(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.invoiceTermList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  registerUser() {}

  loadClientData() {
    // this.firstFormGroup
    //   .get('countryFormControl')
    //   ?.setValue(this.selectedRowDataFromClientView.client_address);
  }

  onSubmit() {
    this.addSiteObject.site_client_name =
      this.firstFormGroup.value.clientNameFormControl?.toString();
    this.addSiteObject.site_group_name =
      this.firstFormGroup.value.siteGroupFormControl?.toString();
    this.addSiteObject.site_name =
      this.firstFormGroup.value.siteNameFormControl?.toString();
    this.addSiteObject.site_contact_person =
      this.secondFormGroup.value.FirstNameFormControl?.toString();
    this.addSiteObject.site_contact_number =
      this.secondFormGroup.value.phoneFormControl?.toString();
    this.addSiteObject.site_trained_guard = 'No';
    this.addSiteObject.site_address =
      this.secondFormGroup.value.addressFormControl?.toString();
    this.addSiteObject.site_post_code =
      this.secondFormGroup.value.postCodeFormControl?.toString();
    this.addSiteObject.site_bill_guarding =
      this.thirdFormGroup.value.siteBillableRateGuardingFormControl?.toString();
    this.addSiteObject.site_bill_supervisor =
      this.thirdFormGroup.value.siteBillableRateSupervisorFormControl?.toString();
    this.addSiteObject.site_pay_guarding =
      this.thirdFormGroup.value.sitePayableRateGuardingFormControl?.toString();
    this.addSiteObject.site_note =
      this.thirdFormGroup.value.siteNoteFormControl?.toString();
    this.addSiteObject.site_status = 'Active';
    this.addSiteObject.company_branch = '1';

    this.clientHttpService.addSite(this.addSiteObject).subscribe({
      next: (result) => {
        console.log('****');
        console.log('Add Site API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.toastr.success('Site created successfully', 'SUCCESS', {
            positionClass: 'toast-top-center',
          });
        } else {
          this.toastr.error('Creating a new Site failed', 'FAILURE', {
            positionClass: 'toast-top-center',
          });
        }
      },
      error: (error) => {
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('Creating a new Site failed', 'FAILURE', {
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.passwordFormControl ===
    control.value.confirmPasswordFormControl
    ? null
    : { PasswordNoMatch: true };
};

export class AddSite {
  site_client_name: string | undefined;
  site_group_name: string | undefined;
  site_name: string | undefined;
  site_contact_person: string | undefined;
  site_contact_number: string | undefined;
  site_trained_guard: string | undefined;
  site_address: string | undefined;
  site_post_code: string | undefined;
  site_bill_guarding: string | undefined;
  site_bill_supervisor: string | undefined;
  site_pay_guarding: string | undefined;
  site_note: string | undefined;
  site_status: string | undefined;
  company_branch: string | undefined;
}
