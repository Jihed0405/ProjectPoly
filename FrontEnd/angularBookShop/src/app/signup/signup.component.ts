import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ConfirmedValidator } from './confirmed.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,private authService : AuthService) { }

  registerForm:any =  FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    
    if(this.submitted)
    {
      var myFormData = new FormData();
      // Begin assigning parameters
      const username=this.registerForm.value.username;
     const email=this.registerForm.value.email;
    const password=this.registerForm.value.password;
      this.authService.register(username,email,password).subscribe(
        data=>{
          console.log(data)
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }, err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
      
    }
  
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]},
       { 
        validator: ConfirmedValidator('password', 'confirmpassword')
      }
      );
      
  }

}
