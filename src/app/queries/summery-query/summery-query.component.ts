import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup ,FormArray} from '@angular/forms';

@Component({
  selector: 'app-summery-query',
  templateUrl: './summery-query.component.html',
  styleUrls: ['./summery-query.component.css']
})
export class SummeryQueryComponent implements OnInit {

 public entrySummeryForm : FormGroup;


  constructor(private fb: FormBuilder) { }

  count = 0;


  initEntries(){
   this.count++;
   return this.fb.group({
    releasePort: ['',Validators.required],
    entryNumber: ['',Validators.required],
  });
  }

  get newEntries()  {
    return this.entrySummeryForm.get("entries") as FormArray
  }

  addEntries() {
    if(this.count == 4){

    }else{
    this.newEntries.push(this.initEntries());
    }
  }

  removeEntries(i:number) {
    this.count--;
    this.newEntries.removeAt(i);
  }

  onGetReportsEntrySummery(){
    console.log(this.entrySummeryForm.value);
  }

  ngOnInit(): void {
    this.entrySummeryForm = this.fb.group({
      criteriaQueryType : ['EES',Validators.required],
      includeEntryDetails : [false],
      fromDate : ['',Validators.required],
      toDate : ['',Validators.required], 
      entries: this.fb.array([this.initEntries()])
     });
  }

  criteriaQueryTypeList = [
    {'code':'AII','text':'Entry summaries for which the Automated Invoice Interface (AII) invoice has been requested and has not been received'},
    {'code':'DOC','text':'Entry summaries for which documents have been requested by CBP, yet no document has been received by CBP'},
    {'code':'RCN','text':'Entry summaries flagged for reconciliation for which the reconciliation entry has not been received'},
    {'code':'PSC','text':'Entry summaries for which a post summary correction (PSC) has been filed'},
    {'code':'LIQ','text':'Entry summaries which have liquidated. NLQ – Entry summaries which have not yet liquidated'},
    {'code':'EES','text':'Every entry summary (within the date range)'}
  ]
}
