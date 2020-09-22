import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ManifestQueryCommon } from './manifest-query.common'
import { QueriesService } from '../service/queries.service'

@Component({
  selector: 'app-manifest-query',
  templateUrl: './manifest-query.component.html',
  styleUrls: ['./manifest-query.component.css']
})
export class ManifestQueryComponent implements OnInit {
 
  queryStatusList = [
    {'code':'ES', 'text':'Entry Status'},
    {'code':'IS','text':'Inbond Status'},
    {'code':'SBS','text':'Surface Bill Of Lading Status'}]

  queryStatus='IS';

  limitResultList=[ 
    {'code':'space','text':'Return only most recent notifications/selectivly result'},
    {'code':'1','text':'Return up to the last 5 notifications/selectivly result'},
    {'code':'2','text':'Return all available notifications/selectivly result'}
  ]
  limitResult:'space';
  entryForm = this.fb.group({
    entryCode : ['',Validators.required],
    entryNumber : ['',Validators.required],
    bolIndicator :  [false],
    limitOutputOption : ['2']
  });

  surfaceBillOfLadingForm =  this.fb.group({
    scacCode :  ['', Validators.required],
    billNo :  ['', Validators.required],
    bolIndicator :  [false],
    limitOutputOption : ['2']
  });
  
  inBoundForm =  this.fb.group({
    inBoundNo :  ['', Validators.required],
    limitOutputOption : ['2']
  });

  formsReset(){
    console.log("InReset")
    this.inBoundForm.reset();
    this.entryForm.reset();
    this.surfaceBillOfLadingForm.reset();
    this.inBoundForm.patchValue({
      limitOutputOption : '2'
    })
    this.entryForm.patchValue({
      limitOutputOption : '2'
    })
    this.surfaceBillOfLadingForm.patchValue({
      limitOutputOption : '2'
    })
  }
  
  constructor(private fb: FormBuilder,private queryService : QueriesService) {
  }

  ngOnInit(): void {
    
  }

  getJSONForsurfaceBillOfLading(){
    var data = {'queryStatus':this.queryStatus,
      'app_identifier_code':'CQ',
      'scac_code':this.surfaceBillOfLadingForm.value.scacCode,
      'billLading_number':this.surfaceBillOfLadingForm.value.billNo,
      'bol_indicator':this.surfaceBillOfLadingForm.value.bolIndicator? 'Y':'space',
      'limit_output_option':this.surfaceBillOfLadingForm.value.limitOutputOption
    };
    return JSON.stringify(data) 
  }
  getJSONForEntry() {
    var data = {
    'queryStatus':this.queryStatus,
    'app_identifier_code':'CQ',
    'entry_filer_code':this.entryForm.value.entryCode,
    'entry_number':this.entryForm.value.entryNumber,
    'entry_data_indicator':this.entryForm.value.bolIndicator? 'Y':'space',
    'limit_output_option':this.entryForm.value.limitOutputOption
  };
  return JSON.stringify(data)
  }
  getJSONForinBound(){
    var data = {
      'queryStatus':this.queryStatus,
      'app_identifier_code':'CQ',
      'inbound_number':this.inBoundForm.value.inBoundNo,
      'limit_output_option':this.inBoundForm.value.limitOutputOption
    };
    return JSON.stringify(data)
  }

  onGetReportsEntry(){
    console.log(this.entryForm.value);
    console.log( this.getJSONForEntry());
    this.callMainfestQueryService(this.getJSONForEntry())
  }
  onGetReportsBOL(){
    console.log(this.surfaceBillOfLadingForm.value);
    console.log( this.getJSONForsurfaceBillOfLading());
    this.callMainfestQueryService(this.getJSONForsurfaceBillOfLading())
  }
  
  onGetReportsInBound(){
    console.log(this.inBoundForm.value);
    console.log( this.getJSONForinBound());
    this.callMainfestQueryService(this.getJSONForinBound())  
  }

  objWR0 ;
  objWSA ;
  objWR1Master;
 

  callMainfestQueryService(data:any){
    this.queryService.createManifestQuery(data)
    .subscribe(resp => {
      console.log('resp',resp); 
      this.objWR0 = resp.body.objWR0;
      this.objWSA = resp.body.objWSA;
      this.objWR1Master= resp.body.objStatusWR1Master;
      console.log('WRO OBJECT : ',this.objWR0);
      console.log('WSA OBJECT : ',this.objWSA);
      console.log('WR1 OBJECT : ',this.objWR1Master);
    })
  }
  
  
}
