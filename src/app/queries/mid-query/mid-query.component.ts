import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QueriesService } from '../service/queries.service';

@Component({
  selector: 'app-mid-query',
  templateUrl: './mid-query.component.html',
  styleUrls: ['./mid-query.component.css'],
  
})
export class MidQueryComponent implements OnInit {
  
  
  midQueryForm :  FormGroup;

  
  constructor(private fb: FormBuilder, private queryService : QueriesService) { }

  ngOnInit(): void {

    this.midQueryForm = this.fb.group({
      midCode : ['',Validators.required],
    });
    
  
  }
  getJSONForMidQuery() {
    var data = {
      'manufacturerIdCode' : this.midQueryForm.value.midCode
  };
  return JSON.stringify(data)
  }
  
  onGetReportsMidQuery(){

    console.log(this.midQueryForm.value)
    this.callMidQueryService(this.getJSONForMidQuery())
  }

  objMidQueryMaster;

  callMidQueryService(data:any){
      this.queryService.createMidQuery(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objMidQueryMaster = resp.body.midQueryMasterResp;
      console.log(this.objMidQueryMaster);  
      });   
  }


    
  }

