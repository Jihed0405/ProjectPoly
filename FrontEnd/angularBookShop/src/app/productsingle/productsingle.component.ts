import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BooksrviceService } from '../services/booksrvice.service';
import { CartService } from '../services/cart.service';
import jwt_decode from 'jwt-decode';
import { EncryptjsService } from '../services/encryptjs.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Router}from '@angular/router'
@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  id: any;
  book: any;
  errorMessage: any;
  oldprice: any="";
  books: any;
  decoded: any;
  userId: any;
  total: any;
  quantityForm:any =  FormGroup;

  constructor(private formBuilder: FormBuilder,private router :Router,private route: ActivatedRoute,private encryptjs:EncryptjsService,private bookServ:BooksrviceService,private cartServ:CartService,private tokenStorage: TokenStorageService) {
    this.bookServ.getbooks().subscribe(
      data=>{ 
      
       this.books=data.slice(0, 4);;
       console.log("data works",this.books);
       
      }, err => {
        this.errorMessage = err.error.message;
       console.log("erreorrr")
      }
    );
   }

  ngOnInit(): void {
    this.quantityForm = this.formBuilder.group({
      quantity: [0, [Validators.required]],
     
      });
    this.id=this.route.snapshot.paramMap.get('id');
   
    this.bookServ.getbookById(this.id).subscribe(
      data=>{ 
      
       this.book=data;
       if(this.book.promotion!=undefined){
         this.oldprice=this.book.promotion;
       }
       this.book.language="english";
       this.book.paperback="190 pages";
       this.book.weight="6.2 ounces";
       this.book.dimensions="5 x 0.43 x 8 inches";
       console.log("data works",this.book);
       
      }, err => {
        this.errorMessage = err.error.message;
       console.log("erreorrr")
      }
    );

  }
  addToCart(){
    console.log("in add");
    var token=this.tokenStorage.getToken();
    this.decoded = jwt_decode(token+""); 
    this.userId=this.decoded['_id'];
    const quantity=this.quantityForm.value.quantity;
    const price=+this.book.price.substring(2);
    this.total=price*quantity;
    this.cartServ.addCart(this.userId,this.book,this.total).subscribe(
      data => {
        console.log(data);
        
      this.router.navigate(["/cart"]);

      },
      err => {
        this.errorMessage = err.error.msg;
        
        
      }
      );

  }

}
