import { Component, OnInit, TemplateRef, ViewChild,ElementRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Imeme } from '../Imeme';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
 
  
  constructor(private apiservice:ServiceService,private spinner: NgxSpinnerService
    ,private dialog: MatDialog) { 
  }
  name: FormControl = new FormControl('', Validators.maxLength(256));
  caption: FormControl = new FormControl('', Validators.maxLength(256));
  url: FormControl = new FormControl('');
  public Memes:any[]=[];
  public BeforeSortMemes:any[]=[];
  public temp:any[]=[];
  ngOnInit(): void {
    this.Memes=[];
    this.BeforeSortMemes=[];
    this.spinner.show();
    this.apiservice.getMemes()
    .subscribe(data=>{
      this.BeforeSortMemes=data;
      console.log(this.BeforeSortMemes);
      let count =100;
      for(let i=this.BeforeSortMemes.length-1;i>=0&&count-->0;i--){
        this.Memes.push(this.BeforeSortMemes[i]);
      }
      console.log(this.Memes);
      this.spinner.hide();
    });
  }
  public reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  URLFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.reg)
  ]);
  
  public submit(){
    console.log(this.name.value+" "+this.caption.value+" "+this.url.value);
    if(this.name.value==""){
      alert("Please enter a name");
      return;
    }
    if(this.caption.value==""){
      alert("Please enter a caption");
      return;
    }
    if(this.url.value==""){
      alert("Please enter a url");
      return;
    }
    let meme:Imeme={} as Imeme;
    
    //alert("Please enter a name");
    meme.id=(this.Memes.length+1).toString();
    meme.name=this.name.value;
    meme.caption=this.caption.value;
    meme.url=this.url.value;
    
    this.spinner.show();
    this.apiservice.addMeme(meme).subscribe(data => {
      this.temp.push(data);
      this.Memes=[];
      this.BeforeSortMemes=[];
      this.spinner.show();
      this.apiservice.getMemes()
        .subscribe(data=>{
      this.BeforeSortMemes=data;
      console.log(this.BeforeSortMemes);
      let count =100;
      for(let i=this.BeforeSortMemes.length-1;i>=0&&count-->0;i--){
        this.Memes.push(this.BeforeSortMemes[i]);
      }
      console.log(this.Memes);
      this.spinner.hide();
    });
      this.name.setValue("");
      this.caption.setValue("");
      this.url.setValue("");
      alert("Submitted Successfully");
      this.spinner.hide();

    });

  }
  openDialog(id:string,name:string,caption:string,url:string){
    let EditBuffer:any[]=[];
    console.log(id+" "+name+" "+caption+" "+url);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height="450px";
    dialogConfig.width="500px"
    dialogConfig.data = {
      id: id,
      name:name,
      caption:caption,
      url:url
    };
    let dialogRef =this.dialog.open(DialogComponent, dialogConfig);
   
    //= this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data1 =>{
      EditBuffer=data1;
        this.ngOnInit();
    })
  }
}
