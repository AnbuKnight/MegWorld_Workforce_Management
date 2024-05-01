import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/core/models/model/users';
import { LoginServiceService } from 'src/app/core/services/login-service.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userData: Users = new Users();
  value = '';
  levels: Array<any> = ['Admin', 'Labor'];
  selectedLevel = this.levels[0];

  constructor(
    private user: UserService,
    private loginService: LoginServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userData.role_name = this.levels[0];
    //this.user.currentUserData.subscribe(userData => this.userData = userData)
  }
  signUp(data: any) {
    //this.user.changeData(data);

    this.loginService.registerUserToDBTest(data).subscribe({
      next: (result) => {
        console.log('****');
        console.log('Registration API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.toastr.success('User registered successfully', 'SUCCESS', {
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['']);
        } else {
          this.toastr.success('User registration failed', 'FAILURE', {
            positionClass: 'toast-top-center',
          });
        }

        //alert(1);
      },
      error: (error) => {
        //alert(2);
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('User registration failed');
      },
    });
  }
  onChange = (input: string) => {
    this.value = input;
    console.log('Input changed', input);
  };
}

export class userRoles {
  roleId: number | undefined;
  role: string | undefined;
}
