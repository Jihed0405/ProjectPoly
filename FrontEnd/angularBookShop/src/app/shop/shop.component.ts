import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BooksrviceService } from '../services/booksrvice.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  checkboxGroup: any=FormGroup;
  submittedValue: any;
  subscription: any =Subscription;
  books: any;
  errorMessage: any;
  categories: any=[];
  bookPopular: any;
  data: any=[];
  p: number = 1;
  checkboxValue: boolean = false;
  datas: any=[];
  
  constructor(private bookServ:BooksrviceService,private fb: FormBuilder) { 
   
  
    this.bookServ.getbooks().subscribe(
      data=>{ 
      this.data=data;
      this.datas=data;
       this.books=data.slice(0, 6);
       this.bookPopular=data.slice(0,3);
      
       
      }, err => {
        this.errorMessage = err.error.message;
       console.log("erreorrr",this.errorMessage)
      }
    );
  this.bookServ.getCategories().subscribe(data=>{
this.categories=data;

  }, err => {
    this.errorMessage = err.error.message;
   console.log("categories error", this.errorMessage)
  });
  }
  

  ngOnInit(): void {
     this.checkboxGroup=this.fb.group({
      otherControls: [''],
      // The filterCategoryArray, empty 
      myChoices: new FormArray([]),
    });
  }
  onCheckChange(event:any): void {
    const filterCategoryArray: FormArray = this.checkboxGroup.get('myChoices') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      filterCategoryArray.push(new FormControl(event.target.value));
      console.log("in the checkbox",filterCategoryArray.value);
      const filterarrray=this.data.filter(function(book:any){
        var bookfiltered
        filterCategoryArray.value.forEach((element: any) => {
        
          if( book.type===element){
            return bookfiltered=book;
            }
        });
        return bookfiltered;

      });
   
      this.datas=filterarrray;
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      filterCategoryArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          filterCategoryArray.removeAt(i);
          return;
        }
  
        i++;
      });
      const filterarrray=this.data.filter(function(book:any){
        var bookfiltered
        filterCategoryArray.value.forEach((element: any) => {
        
          if( book.type===element){
            return bookfiltered=book;
            }
        });
        return bookfiltered;

      });
  
      if(filterarrray.length!==0)
      this.datas=filterarrray;
else this.datas=this.data;
    }
  }
  onFilter(){
   
  }
  
}
