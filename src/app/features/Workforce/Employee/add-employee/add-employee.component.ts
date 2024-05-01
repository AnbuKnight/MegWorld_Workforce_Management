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
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
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

    this.filteredCountryOfBirthList =
      this.firstFormGroup.controls.countryOfBirthFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCountryOfBirth(value || ''))
      );

    this.filteredStateOfBirthList =
      this.firstFormGroup.controls.stateOfBirthFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterStateOfBirth(value || ''))
      );

    this.filteredCityOfBirthList =
      this.firstFormGroup.controls.cityOfBirthFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCityOfBirth(value || ''))
      );

    this.filteredPositionList =
      this.secondFormGroup.controls.positionFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterPosition(value || ''))
      );

    this.filteredRoleList =
      this.secondFormGroup.controls.roleFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterRole(value || ''))
      );

    this.filteredDepartmentList =
      this.secondFormGroup.controls.departmentFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDepartment(value || ''))
      );

    this.filteredPMVATrainedList =
      this.thirdFormGroup.controls.pmvaTrainedFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterPMVATrained(value || ''))
      );

    this.filteredIsUKVISANeededList =
      this.thirdFormGroup.controls.UKvisaNeededFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterUKVISANeeded(value || ''))
      );

    this.filteredVisaTypeList =
      this.thirdFormGroup.controls.visaTypeFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterVisaType(value || ''))
      );
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
  selectedRole: string = 'Admin';
  selectedRowDataFromClientView!: any;
  isNew: boolean = true;

  firstFormGroup = this._formBuilder.group({
    FirstNameFormControl: [''],
    LastNameFormControl: [''],
    emailFormControl: [''],
    phoneFormControl: [''],
    dateOfBirthFormControl: new Date(),
    addressFormControl: [''],
    countryFormControl: [''],
    stateFormControl: [''],
    cityFormControl: [''],
    countryOfBirthFormControl: [''],
    stateOfBirthFormControl: [''],
    cityOfBirthFormControl: [''],
    nationalityFormControl: [''],
    zipCodeFormControl: ['', Validators.required],
    profileImageFormControl: [''],
    passwordFormControl: [''],
  });
  secondFormGroup = this._formBuilder.group({
    companyFormControl: ['', Validators.required],
    positionFormControl: ['', Validators.required],
    roleFormControl: [''],
    departmentFormControl: [''],
    siaLicenceFormControl: [''],
    licenceExpiryFormControl: new Date(),
  });
  thirdFormGroup = this._formBuilder.group({
    subStaffPinFormControl: [''],
    EDBSnumberFormControl: [''],
    NInumberFormControl: [''],
    trainingNameFormControl: [''],
    certificateNumberFormControl: [''],
    UKvisaNeededFormControl: [''],
    visaTypeFormControl: [''],
    visaExpiryFormControl: new Date(),
    pmvaTrainedFormControl: [''],
  });

  countryList: string[] = ['India', 'United States', 'United Kingdom'];
  filteredCountryList: Observable<string[]> | undefined;
  stateList: string[] = ['TamilNadu', 'Karnataka', 'Kerala'];
  filteredStateList: Observable<string[]> | undefined;
  cityList: string[] = ['Chennai', 'Coimbatore', 'Trichy'];
  filteredCityList: Observable<string[]> | undefined;
  countryOfBirthList: string[] = ['India', 'United States', 'United Kingdom'];
  filteredCountryOfBirthList: Observable<string[]> | undefined;
  stateOfBirthList: string[] = ['TamilNadu', 'Karnataka', 'Kerala'];
  filteredStateOfBirthList: Observable<string[]> | undefined;
  cityOfBirthList: string[] = ['Chennai', 'Coimbatore', 'Trichy'];
  filteredCityOfBirthList: Observable<string[]> | undefined;
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
    'Dependant',
    'Dependant leave to enter',
    'Dependant partner',
    'Graduate',
    'Graduate leave to remain',
    'Indefinite leave to remain (ILR)',
    'Limited leave to remain',
    'Refugee',
    'Settlement',
    'Spouse',
    'Student',
    'Work Permitted',
    'Others',
  ];
  filteredVisaTypeList: Observable<string[]> | undefined;

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
  addEmployeeObject: AddEmployee = new AddEmployee();

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

  private _filterCountryOfBirth(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countryOfBirthList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterStateOfBirth(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateOfBirthList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterCityOfBirth(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityOfBirthList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterPosition(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.positionList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterRole(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.roleList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDepartment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departmentList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterPMVATrained(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.booleanList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterUKVISANeeded(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.booleanList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterVisaType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.visaTypeList.filter((option) =>
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
    this.addEmployeeObject.employee_staff_pin =
      this.thirdFormGroup.value.subStaffPinFormControl?.toString();
    this.addEmployeeObject.employee_forename =
      this.firstFormGroup.value.FirstNameFormControl?.toString();
    this.addEmployeeObject.employee_middname = '';
    this.addEmployeeObject.employee_surname =
      this.firstFormGroup.value.LastNameFormControl?.toString();
    this.addEmployeeObject.employee_gender = 'M';
    this.addEmployeeObject.employee_dob =
      this.firstFormGroup.value.dateOfBirthFormControl
        ?.toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
    this.addEmployeeObject.employee_contactno =
      this.firstFormGroup.value.phoneFormControl?.toString();
    this.addEmployeeObject.employee_type =
      this.secondFormGroup.value.roleFormControl?.toString();
    this.addEmployeeObject.employee_sia_no =
      this.secondFormGroup.value.siaLicenceFormControl?.toString();
    this.addEmployeeObject.employee_sia_type =
      this.secondFormGroup.value.departmentFormControl?.toString();
    this.addEmployeeObject.employee_expdate =
      this.secondFormGroup.value.licenceExpiryFormControl
        ?.toLocaleDateString()
        .split('/')
        .reverse()
        .join('-');
    this.addEmployeeObject.sia_req_check =
      this.thirdFormGroup.value.pmvaTrainedFormControl?.toString();
    this.addEmployeeObject.employee_status = 'Active';
    this.addEmployeeObject.company_branch = '1';

    this.clientHttpService.addEmployee(this.addEmployeeObject).subscribe({
      next: (result) => {
        console.log('****');
        console.log('Add Employee API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.toastr.success('Employee created successfully', 'SUCCESS', {
            positionClass: 'toast-top-center',
          });
        } else {
          this.toastr.error('Creating a new employee failed', 'FAILURE', {
            positionClass: 'toast-top-center',
          });
        }
      },
      error: (error) => {
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('Creating a new employee failed', 'FAILURE', {
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

export class AddEmployee {
  employee_staff_pin: string | undefined;
  employee_forename: string | undefined;
  employee_middname: string | undefined;
  employee_surname: string | undefined;
  employee_gender: string | undefined;
  employee_dob: string | undefined;
  employee_contactno: string | undefined;
  employee_type: string | undefined;
  employee_sia_no: string | undefined;
  employee_sia_type: string | undefined;
  employee_expdate: string | undefined;
  sia_req_check: string | undefined;
  employee_status: string | undefined;
  company_branch: string | undefined;
}
