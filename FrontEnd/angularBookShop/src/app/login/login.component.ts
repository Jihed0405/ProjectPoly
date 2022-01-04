import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router) { }
  registerForm:any =  FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      var myFormData = new FormData();
      const email=this.registerForm.value.email;
    const password=this.registerForm.value.password;
    this.authService.login(email, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      this.router.navigate(["/home"]);

      },
      err => {
        this.errorMessage = err.error.msg;
        this.isLoginFailed = true;
        
      }
    );
    }
  
  }
  reloadPage(): void {
    window.location.reload();
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
     
      //this.roles = this.tokenStorage.getUser().roles;
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      });
  }

}
