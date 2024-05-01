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
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
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
    this.filteredEventTypeList =
      this.firstFormGroup.controls.eventTypeFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterEventType(value || ''))
      );

    this.filteredConnectEventToList =
      this.firstFormGroup.controls.connectEventToFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterConnectEvent(value || ''))
      );

    this.filteredEmpOrSubList =
      this.firstFormGroup.controls.empOrSubFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterEmpOrSub(value || ''))
      );
    this.filteredSiteList =
      this.firstFormGroup.controls.siteFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterSite(value || ''))
      );
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
  selectedRole: string = 'Admin';
  selectedRowDataFromClientView!: any;
  isNew: boolean = true;

  firstFormGroup = this._formBuilder.group({
    eventDateFormControl: new Date(),
    eventTypeFormControl: [''],
    eventDetailFormControl: [''],
    connectEventToFormControl: [''],
    empOrSubFormControl: [''],
    siteFormControl: [''],
  });

  eventTypeList: string[] = [
    'Accident',
    'Blow out',
    'Complaint',
    'Incident',
    'Lateness',
    'Other',
  ];
  filteredEventTypeList: Observable<string[]> | undefined;
  connectEventToList: string[] = ['Employee', 'Sub Contractor'];
  filteredConnectEventToList: Observable<string[]> | undefined;
  empOrSubList: string[] = [
    'Employee 1',
    'Employee 2',
    'Sub Contractor 1',
    'Sub Contractor 2',
  ];
  filteredEmpOrSubList: Observable<string[]> | undefined;
  siteList: string[] = ['Site 1', 'Site 2', 'Site 3'];
  filteredSiteList: Observable<string[]> | undefined;

  matcher = new MyErrorStateMatcher();

  userObject: Users = new Users();
  LoginUserObject: LoginUserModel = new LoginUserModel();

  stepperOrientation!: Observable<StepperOrientation>;
  addSubContractorObject: AddSubContractor = new AddSubContractor();

  private _filterEventType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.eventTypeList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterConnectEvent(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.connectEventToList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterEmpOrSub(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.empOrSubList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterSite(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.siteList.filter((option) =>
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
    // this.addSubContractorObject.subcon_company_name =
    //   this.firstFormGroup.value.companyFormControl?.toString();
    // var address1 = this.firstFormGroup.value.streetFormControl?.toString();
    // var address2 = this.firstFormGroup.value.stateFormControl?.toString();
    // var address3 = this.firstFormGroup.value.countryFormControl?.toString();
    // var whiteSpace = ' ';
    // this.addSubContractorObject.subcon_company_address = address1
    //   ?.concat(whiteSpace!)
    //   ?.concat(address2!)
    //   ?.concat(whiteSpace!)
    //   ?.concat(address3!);
    // this.addSubContractorObject.subcon_contact_person =
    //   this.secondFormGroup.value.FirstNameFormControl?.toString();
    // this.addSubContractorObject.subcon_contact_number =
    //   this.secondFormGroup.value.contactFaxFormControl?.toString();
    // this.addSubContractorObject.subcon_contact_depart = '';
    // this.addSubContractorObject.subcon_email =
    //   this.secondFormGroup.value.emailFormControl?.toString();
    // this.addSubContractorObject.subcon_invoice_terms =
    //   this.thirdFormGroup.value.invoiceTermFormControl?.toString();
    // this.addSubContractorObject.subcon_payment_terms =
    //   this.thirdFormGroup.value.paymentTermFormControl?.toString();
    // this.addSubContractorObject.subcon_vat_reg = 'No';
    // this.addSubContractorObject.subcon_vat_number =
    //   this.thirdFormGroup.value.vatRegistrationNumberFormControl?.toString();
    // this.addSubContractorObject.subcon_payrate =
    //   this.thirdFormGroup.value.chargeRateFormControl?.toString();
    // this.addSubContractorObject.subcon_status = 'Active';
    // this.addSubContractorObject.company_branch = '1';
    // this.clientHttpService
    //   .addSubContractor(this.addSubContractorObject)
    //   .subscribe({
    //     next: (result) => {
    //       console.log('****');
    //       console.log('Add SubContractor API response');
    //       console.log(result);
    //       console.log('****');
    //       if (result.success) {
    //         this.toastr.success(
    //           'SubContractor created successfully',
    //           'SUCCESS',
    //           {
    //             positionClass: 'toast-top-center',
    //           }
    //         );
    //       } else {
    //         this.toastr.error(
    //           'Creating a new SubContractor failed',
    //           'FAILURE',
    //           {
    //             positionClass: 'toast-top-center',
    //           }
    //         );
    //       }
    //     },
    //     error: (error) => {
    //       console.log(error.message);
    //       console.error('There was an error!', error);
    //       this.toastr.error('Creating a new SubContractor failed', 'FAILURE', {
    //         positionClass: 'toast-top-center',
    //       });
    //     },
    //   });
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
