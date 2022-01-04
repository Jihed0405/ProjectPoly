import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage: any;

  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }
  logout(){

   
    this.authService.logout().subscribe(
      data => {
      
        this.tokenStorage.signOut();
        this.router.navigate([""]);

      },
      err => {
        this.errorMessage = err.error.msg;
      
        
      }
    );
  }
}
