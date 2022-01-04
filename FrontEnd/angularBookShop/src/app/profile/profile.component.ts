import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import {MatInputModule} from '@angular/material/input';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ProfileForm: any;
  decoded:any;
  submitted = false;
  errorMessage = '';
  datas: any;
   userId:any

  get f() { return this.ProfileForm.controls; }
 
 


  constructor(private formBuilder: FormBuilder,private tokenStorage: TokenStorageService,
    private userService : UserService,private router:Router
  ) {
    this.ProfileForm = this.formBuilder.group({
       
      firstname:['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required]],
      address: ['', [Validators.required]],
      job:['', [Validators.required]],
      bio:['', [Validators.required]],
      });
   }
   cancelFunction(){
    this.router.navigate(["/home"]);
   }
   onSubmit() {
     
    this.submitted = true;
    
    if(this.submitted)
    {console.log("in submit");
      var myFormData = new FormData();
      // Begin assigning parameters
      const userId=this.userId;
     const email=this.ProfileForm.value.email;
    const firstname=this.ProfileForm.value.firstname;
    const lastname=this.ProfileForm.value.lastname;
    const tel=this.ProfileForm.value.tel;
    const address=this.ProfileForm.value.address;
    const job=this.ProfileForm.value.job;
    const bio=this.ProfileForm.value.bio;
    console.log(userId);
      this.userService.editUser(userId,email,firstname,lastname,tel,address,job,bio).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(["/home"]);
         
        }, err => {
          this.errorMessage = err.error.message;
         console.log("erreorrr")
        }
      );
      
    }
   }
  ngOnInit() {
    var token=this.tokenStorage.getToken();
    this.decoded = jwt_decode(token+""); 
    this.userId=this.decoded['_id'];
    this.userService.getUser(this.userId).subscribe(data=>{
      console.log(data);
      this.ProfileForm = this.formBuilder.group({
       
        firstname:[data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        username: [data.username, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        tel: [data.tel, [Validators.required]],
        address: [data.address, [Validators.required]],
        job:[data.job, [Validators.required]],
        bio:[data.bio, [Validators.required]],
        });
        console.log(this.ProfileForm.get("job").value)
    }, err => {
      this.errorMessage = err.error.message;
     
    }
  );
 


  }

}