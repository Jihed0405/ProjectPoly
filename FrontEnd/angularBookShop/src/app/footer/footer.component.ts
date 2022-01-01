import { Component, OnInit } from '@angular/core';
import { BooksrviceService } from '../services/booksrvice.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: any;

  constructor(private bookServ:BooksrviceService) { this.bookServ.getCategories().subscribe(data=>{
    this.categories=data.slice(0, 5);
    console.log("here it is ",this.categories)
    
      }, err => {
        this.errorMessage = err.error.message;
       console.log("categories error", this.errorMessage)
      }); }
  errorMessage(arg0: string, errorMessage: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
