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

// export const DD_MM_YYYY_Format = {
//   parse: {
//     dateInput: 'YYYY-MM-DD',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  //providers: [{ provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format }],
})
export class AddClientComponent implements OnInit {
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
      this.firstFormGroup.controls.countryFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCountry(value || ''))
      );

    this.filteredStateList =
      this.firstFormGroup.controls.stateFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterState(value || ''))
      );

    this.filteredCityList =
      this.firstFormGroup.controls.cityFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCity(value || ''))
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
    CompanyFormControl: ['', Validators.required],
    StreetFormControl: [''],
    countryFormControl: [''],
    stateFormControl: [''],
    cityFormControl: [''],
    zipCodeFormControl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstNameFormControl: ['', Validators.required],
    lastNameFormControl: ['', Validators.required],
    phoneFormControl: [''],
    emailFormControl: ['', Validators.required, Validators.email],
    contactFaxFormControl: [''],
  });
  thirdFormGroup = this._formBuilder.group({
    invoiceTermFormControl: [''],
    paymentTermFormControl: [''],
    contractStartFormControl: new Date(),
    contractEndFormControl: new Date(),
    guardingChargeRateFormControl: [''],
    supervisorChargeRateFormControl: [''],
  });

  countryList: string[] = ['India', 'United States', 'United Kingdom'];
  filteredCountryList: Observable<string[]> | undefined;
  stateList: string[] = ['TamilNadu', 'Karnataka', 'Kerala'];
  filteredStateList: Observable<string[]> | undefined;
  cityList: string[] = ['Chennai', 'Coimbatore', 'Trichy'];
  filteredCityList: Observable<string[]> | undefined;
  invoiceTermList: string[] = [
    'Fortnightly Invoice',
    'Monthly Invoice',
    'Weekly Invoice',
  ];
  filteredInvoiceTermList: Observable<string[]> | undefined;
  // CompanyFormControl = new FormControl('', [Validators.required]);
  // StreetFormControl = new FormControl('');
  // countryFormControl = new FormControl('');
  // countryList: string[] = ['India', 'United States', 'United Kingdom'];
  // filteredCountryList: Observable<string[]> | undefined;
  // stateFormControl = new FormControl('');
  // stateList: string[] = ['TamilNadu', 'Karnataka', 'Kerala'];
  // filteredStateList: Observable<string[]> | undefined;
  // cityFormControl = new FormControl('');
  // cityList: string[] = ['Chennai', 'Coimbatore', 'Trichy'];
  // filteredCityList: Observable<string[]> | undefined;
  // zipCodeFormControl = new FormControl('', [Validators.required]);
  // firstNameFormControl = new FormControl('', [Validators.required]);
  // lastNameFormControl = new FormControl('', [Validators.required]);
  // phoneFormControl = new FormControl('');
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  // contactFaxFormControl = new FormControl('');
  // invoiceTermFormControl = new FormControl('');
  // invoiceTermList: string[] = [
  //   'Fortnightly Invoice',
  //   'Monthly Invoice',
  //   'Weekly Invoice',
  // ];
  // filteredInvoiceTermList: Observable<string[]> | undefined;
  // paymentTermFormControl = new FormControl('');
  // contractStartFormControl = new FormControl();
  // contractEndFormControl = new FormControl();
  // guardingChargeRateFormControl = new FormControl('');
  // supervisorChargeRateFormControl = new FormControl('');

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
  addClientObject: AddClient = new AddClient();

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countryList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityList.filter((option) =>
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
    this.firstFormGroup
      .get('countryFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_address);
    this.thirdFormGroup
      .get('guardingChargeRateFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_charge_guarding);
    this.thirdFormGroup
      .get('supervisorChargeRateFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_charge_supervisor);
    this.secondFormGroup
      .get('firstNameFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_contact_person);
    this.secondFormGroup
      .get('phoneFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_contact_number);
    this.secondFormGroup
      .get('emailFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_contact_email);
    this.secondFormGroup
      .get('contactFaxFormControl')
      ?.setValue(this.selectedRowDataFromClientView.client_contact_fax);
  }

  onSubmit() {
    this.addClientObject.client_name =
      this.firstFormGroup.value.CompanyFormControl?.toString();
    this.addClientObject.client_address =
      this.firstFormGroup.value.StreetFormControl?.toString();
    this.addClientObject.client_contact_person =
      this.secondFormGroup.value.firstNameFormControl?.toString();
    this.addClientObject.client_contact_number =
      this.secondFormGroup.value.phoneFormControl?.toString();
    this.addClientObject.client_contact_fax =
      this.secondFormGroup.value.contactFaxFormControl?.toString();
    this.addClientObject.client_contact_email =
      this.secondFormGroup.value.emailFormControl?.toString();
    this.addClientObject.client_invoice_terms =
      this.thirdFormGroup.value.invoiceTermFormControl?.toString();
    this.addClientObject.client_payment_terms =
      this.thirdFormGroup.value.paymentTermFormControl?.toString();
    this.addClientObject.client_contract_start =
      this.thirdFormGroup.value.contractStartFormControl
        ?.toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
    this.addClientObject.client_contract_end =
      this.thirdFormGroup.value.contractEndFormControl
        ?.toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
    // this.addClientObject.client_contract_start = '2023-12-01';
    // this.addClientObject.client_contract_end = '2026-12-01';
    this.addClientObject.client_charge_guarding =
      this.thirdFormGroup.value.guardingChargeRateFormControl?.toString();
    this.addClientObject.client_charge_supervisor =
      this.thirdFormGroup.value.supervisorChargeRateFormControl?.toString();
    this.addClientObject.client_vat_reg = 'No';
    this.addClientObject.client_vat_number = '';
    this.addClientObject.client_status = 'Active';
    this.addClientObject.company_branch = '6';

    this.clientHttpService.addClient(this.addClientObject).subscribe({
      next: (result) => {
        console.log('****');
        console.log('Add Client API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.toastr.success('Client created successfully', 'SUCCESS', {
            positionClass: 'toast-top-center',
          });
        } else {
          this.toastr.error('Creating a new client failed', 'FAILURE', {
            positionClass: 'toast-top-center',
          });
        }
      },
      error: (error) => {
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('Creating a new client failed', 'FAILURE', {
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

export class AddClient {
  client_name: string | undefined;
  client_address: string | undefined;
  client_contact_person: string | undefined;
  client_contact_number: string | undefined;
  client_contact_fax: string | undefined;
  client_contact_email: string | undefined;
  client_invoice_terms: string | undefined;
  client_payment_terms: string | undefined;
  client_contract_start!: string | undefined;
  client_contract_end!: string | undefined;
  client_charge_guarding: string | undefined;
  client_charge_supervisor: string | undefined;
  client_vat_reg: string | undefined;
  client_vat_number: string | undefined;
  client_status: string | undefined;
  company_branch: string | undefined;
}
