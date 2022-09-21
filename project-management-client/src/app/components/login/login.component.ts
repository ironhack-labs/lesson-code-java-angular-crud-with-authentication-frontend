import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailInput: FormControl;
  passwordInput: FormControl;

  externalErrorMsg: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.emailInput,
      password: this.passwordInput,
    });
    this.externalErrorMsg = '';
  }

  ngOnInit(): void {
  }

  login() {
    // Attempt to login
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log('Login successful');

        // Store user in local storage to keep user logged in between page refreshes
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', response.authToken);

        // Load user data
        this.authService.authenticate().subscribe({
          next: (userData: User) => {
            // Store user data in local storage
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.authService.currentUserSubject.next(userData);

            // Redirect to home page
            this.router.navigate(['/']);

          },
          error: error => {
            this.externalErrorMsg = 'Internal error please try again later';
          }

        }
        );
      },
      error: error => {
        console.log(error, error.status)
        if(error.status === 403) {
          this.externalErrorMsg = 'Wrong username/password';
        }
      }
    });
  }

}
