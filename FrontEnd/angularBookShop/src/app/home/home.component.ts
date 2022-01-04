import { Component, OnInit } from '@angular/core';
import { BooksrviceService } from '../services/booksrvice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage: any;
  
  books: any;

  constructor(private bookServ:BooksrviceService) {this.bookServ.getbooks().subscribe(
    data=>{ 
    
     this.books=data.slice(0, 4);;
     console.log("data works",this.books);
     
    }, err => {
      this.errorMessage = err.error.message;
     console.log("erreorrr")
    }
  ); }

  ngOnInit(): void {
    
  }
 //Slider settings
 slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;
}
