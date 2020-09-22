import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct , NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mid-query',
  templateUrl: './mid-query.component.html',
  styleUrls: ['./mid-query.component.css'],
  
})
export class MidQueryComponent implements OnInit {
  
  
  midQueryForm = this.fb.group({});

  model: NgbDateStruct;
  
  constructor(private fb: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter,private datePipe: DatePipe) { }

  ngOnInit(): void {
    let d: Date = new Date();

    this.midQueryForm = this.fb.group({
      midCode : ['',Validators.required],
      fromDate : [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}]  
    });
    
  
  }

  midQueryButton(){
    console.log(this.midQueryForm)
  }
  onGetReportsMidQuery(){
    console.log(this.midQueryForm.value)
    
    let ngbDate = this.midQueryForm.controls['fromDate'].value;
    let myDate = this.ngbDateParserFormatter.format(ngbDate);
    
    console.log(this.datePipe.transform(myDate, 'yyMMdd'))
  }
}
