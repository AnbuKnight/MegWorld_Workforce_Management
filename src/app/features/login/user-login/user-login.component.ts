import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUserModel } from 'src/app/core/models/model/users';
import { LoginServiceService } from 'src/app/core/services/login-service.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  userData: LoginUserModel = new LoginUserModel();
  constructor(
    private user: UserService,
    private loginService: LoginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.sharedService.displayNavBars = false;
  }

  ngOnInit() {
    //this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event: { target: { value: any } }) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login(data: any) {
    //this.user.changeData(data);

    this.loginService.getUserDetailsFromDB(data).subscribe({
      next: (result) => {
        console.log('****');
        console.log('Login API response');
        console.log(result);
        console.log('****');
        if (result.success) {
          this.toastr.success('User logged in successfully', 'SUCCESS', {
            positionClass: 'toast-top-center',
          });
          localStorage.setItem('userDetails', JSON.stringify(result.data));
          this.sharedService.displayNavBars = true;
          this.router.navigate(['/', 'dashboard']).then(
            (nav) => {
              console.log(nav); // true if navigation is successful
            },
            (err) => {
              console.log(err); // when there's an error
              this.toastr.success('Navigation from login failed', 'FAILURE', {
                positionClass: 'toast-top-center',
              });
            }
          );
        } else {
          this.toastr.success('User login failed', 'FAILURE', {
            positionClass: 'toast-top-center',
          });
        }

        //alert(1);
      },
      error: (error) => {
        //alert(2);
        console.log(error.message);
        console.error('There was an error!', error);
        this.toastr.error('User login failed');
      },
    });
  }
}
