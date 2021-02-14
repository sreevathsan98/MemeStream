import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Imeme } from 'src/app/Imeme';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  //Dialog component which is used for editing the meme 

  //Objects to receive data from meme component are initialized 
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private apiservice:ServiceService) { }
  
    //All declarations for the dialog component 
    name: FormControl = new FormControl('', Validators.maxLength(256));
    caption: FormControl = new FormControl('', Validators.maxLength(256));
    public reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    url: FormControl = new FormControl('', Validators.maxLength(256));
    URLFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.reg)
    ]);
    public temp:any[]=[];

  //Very first function called on calling dialog component 
  ngOnInit(): void {
    this.name.setValue(this.data.name);
    this.caption.setValue(this.data.caption);
    this.url.setValue(this.data.url);
  }

  //Close option for dialog 
  close():void{
    this.dialogRef.close();
  }

  //Subitting the data to DB
  save():void{
    let meme:Imeme={} as Imeme;
    meme.id=this.data.id;
    meme.name=this.data.name;
    meme.caption=this.caption.value;
    meme.url=this.url.value;
    //Patch api call
    this.apiservice.modifyMeme(meme).subscribe(data => {
      this.temp.push(data);
      this.dialogRef.close();
    })
  }
}
