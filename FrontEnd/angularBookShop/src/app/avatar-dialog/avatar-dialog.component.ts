import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();
imageUsers=[{"link":"assets/images/cart-1.jpg"},{"link":"assets/images/cart-1.jpg"},{"link":"assets/images/cart-1.jpg"}];
  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
     this.avatars = this.imageUsers;
  }

  close(avatar:any){
    this.dialogRef.close(avatar);
  }

}


