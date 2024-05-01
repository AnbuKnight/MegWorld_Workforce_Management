import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { LoginUserModel, Users } from 'src/app/core/models/model/users';
import { LoginServiceService } from 'src/app/core/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginServiceService,
    private toastr: ToastrService
  ) {}

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
  selectedRole: string = 'Admin';

  NameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  roleFormControl = new FormControl(this.selectedRole);

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

  ngOnInit(): void {
    //this.getUser();
    this.registerUser();
  }

  getUser() {
    this.LoginUserObject.email = 'test1@gmail.com';
    this.LoginUserObject.password = 'Test1@123';
    this.loginService.getUserDetailsFromDB(this.LoginUserObject).subscribe(
      (response: any) => {
        console.log('Subscribed result');
        // console.log(response.data.name);
        // console.log(response.data.token);
        // console.log(response.message);
        // console.log(response.success);
        console.log(response);
        alert(22);
        this.toastr.success('User logged in successfully');
      },
      (error) => {
        console.log(error);
        alert(5);
      }
    );
  }

  registerUser() {
    // this.userObject.name=this.NameFormControl.value?.toString();
    // this.userObject.email=this.emailFormControl.value?.toString();
    // this.userObject.password=this.passwordFormControl.value?.toString();
    // this.userObject.c_password=this.passwordFormControl.value?.toString();
    // this.userObject.role_name=this.roleFormControl.value?.toString();
    this.userObject.c_password = 'test55';
    this.userObject.email = 'test55@gmail.com';
    this.userObject.name = 'TestUser55';
    this.userObject.password = 'test55';
    this.userObject.role_name = 'Admin';

    this.loginService.registerUserToDBTest(this.userObject).subscribe({
      next: (data) => {
        console.log('****');
        console.log('Registration API response');
        console.log(data);
        console.log('****');
        this.toastr.success('User registered successfully', 'SUCCESS', {
          positionClass: 'toast-top-center',
        });
        //alert(1);
      },
      error: (error) => {
        alert(2);
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('User registration failed');
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
