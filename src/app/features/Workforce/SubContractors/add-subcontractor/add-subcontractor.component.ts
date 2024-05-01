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
  selector: 'app-add-subcontractor',
  templateUrl: './add-subcontractor.component.html',
  styleUrls: ['./add-subcontractor.component.css'],
})
export class AddSubcontractorComponent {
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
    companyFormControl: ['', Validators.required],
    streetFormControl: [''],
    countryFormControl: [''],
    stateFormControl: [''],
    cityFormControl: [''],
    zipCodeFormControl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    FirstNameFormControl: [''],
    LastNameFormControl: [''],
    emailFormControl: [''],
    phoneFormControl: [''],
    contactFaxFormControl: [''],
  });
  thirdFormGroup = this._formBuilder.group({
    invoiceTermFormControl: [''],
    paymentTermFormControl: [''],
    chargeRateFormControl: [''],
    vatRegistrationNumberFormControl: [''],
  });

  countryList: string[] = ['India', 'United States', 'United Kingdom'];
  filteredCountryList: Observable<string[]> | undefined;
  stateList: string[] = ['TamilNadu', 'Karnataka', 'Kerala'];
  filteredStateList: Observable<string[]> | undefined;
  cityList: string[] = ['Chennai', 'Coimbatore', 'Trichy'];
  filteredCityList: Observable<string[]> | undefined;
  positionList: string[] = ['Position 1', 'Position 2', 'Position 3'];
  filteredPositionList: Observable<string[]> | undefined;
  roleList: string[] = ['Admin', 'Marketing', 'Sales'];
  filteredRoleList: Observable<string[]> | undefined;
  departmentList: string[] = [
    'Admin (Only Administrator)',
    'Manager',
    'Agent',
    'Other',
  ];
  filteredDepartmentList: Observable<string[]> | undefined;
  booleanList: string[] = ['Yes', 'No'];
  filteredPMVATrainedList: Observable<string[]> | undefined;
  filteredIsUKVISANeededList: Observable<string[]> | undefined;
  visaTypeList: string[] = [
    'Admin (Only Administrator)',
    'Manager',
    'Agent',
    'Other',
  ];
  filteredVisaTypeList: Observable<string[]> | undefined;
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
  addSubContractorObject: AddSubContractor = new AddSubContractor();

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
  }

  onSubmit() {
    this.addSubContractorObject.subcon_company_name =
      this.firstFormGroup.value.companyFormControl?.toString();
    var address1 = this.firstFormGroup.value.streetFormControl?.toString();
    var address2 = this.firstFormGroup.value.stateFormControl?.toString();
    var address3 = this.firstFormGroup.value.countryFormControl?.toString();
    var whiteSpace = ' ';
    this.addSubContractorObject.subcon_company_address = address1
      ?.concat(whiteSpace!)
      ?.concat(address2!)
      ?.concat(whiteSpace!)
      ?.concat(address3!);
    this.addSubContractorObject.subcon_contact_person =
      this.secondFormGroup.value.FirstNameFormControl?.toString();
    this.addSubContractorObject.subcon_contact_number =
      this.secondFormGroup.value.contactFaxFormControl?.toString();
    this.addSubContractorObject.subcon_contact_depart = '';
    this.addSubContractorObject.subcon_email =
      this.secondFormGroup.value.emailFormControl?.toString();
    this.addSubContractorObject.subcon_invoice_terms =
      this.thirdFormGroup.value.invoiceTermFormControl?.toString();
    this.addSubContractorObject.subcon_payment_terms =
      this.thirdFormGroup.value.paymentTermFormControl?.toString();
    this.addSubContractorObject.subcon_vat_reg = 'No';
    this.addSubContractorObject.subcon_vat_number =
      this.thirdFormGroup.value.vatRegistrationNumberFormControl?.toString();
    this.addSubContractorObject.subcon_payrate =
      this.thirdFormGroup.value.chargeRateFormControl?.toString();
    this.addSubContractorObject.subcon_status = 'Active';
    this.addSubContractorObject.company_branch = '1';

    this.clientHttpService
      .addSubContractor(this.addSubContractorObject)
      .subscribe({
        next: (result) => {
          console.log('****');
          console.log('Add SubContractor API response');
          console.log(result);
          console.log('****');
          if (result.success) {
            this.toastr.success(
              'SubContractor created successfully',
              'SUCCESS',
              {
                positionClass: 'toast-top-center',
              }
            );
          } else {
            this.toastr.error(
              'Creating a new SubContractor failed',
              'FAILURE',
              {
                positionClass: 'toast-top-center',
              }
            );
          }
        },
        error: (error) => {
          console.log(error.message);
          console.error('There was an error!', error);
          this.toastr.error('Creating a new SubContractor failed', 'FAILURE', {
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

export class AddSubContractor {
  subcon_company_name: string | undefined;
  subcon_company_address: string | undefined;
  subcon_contact_person: string | undefined;
  subcon_contact_number: string | undefined;
  subcon_contact_depart: string | undefined;
  subcon_email: string | undefined;
  subcon_invoice_terms: string | undefined;
  subcon_payment_terms: string | undefined;
  subcon_vat_reg: string | undefined;
  subcon_vat_number: string | undefined;
  subcon_payrate: string | undefined;
  subcon_status: string | undefined;
  company_branch: string | undefined;
}
