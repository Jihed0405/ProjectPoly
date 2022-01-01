import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BooksrviceService } from '../services/booksrvice.service';
import { CartService } from '../services/cart.service';
import { EncryptjsService } from '../services/encryptjs.service';
import { TokenStorageService } from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';
import { numbers } from '@material/dialog';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  decoded: any;
  userId: any;
  errorMessage: any;
  books: any = [];
  uniqueArray: any = [];
  data: any = [];
  quantity: number = 0;

  totals: any = [];
  quantities: any = [];
  tab: any;
  obj: { data: any; total: any } | undefined;
  totallless: any = [];
  total: number = 0;
  quantityForm:any =  FormGroup;
  alltotal: number=0;
  tot: string="";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private encryptjs: EncryptjsService,
    private bookServ: BooksrviceService,
    private cartServ: CartService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.quantityForm = this.formBuilder.group({
      quantity: [0, [Validators.required]],
     
      });
      //=this.quantityOp();
    var token = this.tokenStorage.getToken();
    this.decoded = jwt_decode(token + '');
    this.userId = this.decoded['_id'];
    this.cartServ.getcart(this.userId).subscribe(
      (data) => {
        data.forEach((element: any, ind: number) => {
          element.book.map((el: any, index: number) => {
            this.books.push(el);
          });

          //this.router.navigate(["/home"]);
        });
        const isbns = this.books.map((el: any) => el._id);
        this.uniqueArray = this.books.filter(
          ({ _id }: any, index: number) => !isbns.includes(_id, index + 1)
        );

        for (let i = 0; i < this.uniqueArray.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j].book[0]['_id'] === this.uniqueArray[i]['_id']) {
              this.total += +data[j].total;
            }
          }
          this.totallless.push((Math.round(this.total * 100) / 100).toFixed(2));
          this.total = 0;
        }
        this.totallless.map((el:any)=>{
          this.alltotal+=+el;
         
        })
        this.tot=(Math.round(this.alltotal * 100) / 100).toFixed(2);
        console.log(this.tot);
      },
      (err) => {
        this.errorMessage = err.error.msg;
      }
    );
  }
  quantityOp(a: any, b: any) {
   
    b = +b.substring(2);
    return a/b;
    
  }
  removeitem(i: any) {
    this.uniqueArray.splice(i, 1);

    this.totallless.splice(i, 1);
  }
  updateCoupon() {
    console.log('in the update');
  }
  onChangeNumber(value:any){
console.log("in the event" ,value)
  }
}
