import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QueriesService } from '../service/queries.service';

@Component({
  selector: 'app-test-edi',
  templateUrl: './test-edi.component.html',
  styleUrls: ['./test-edi.component.css']
})
export class TestEdiComponent implements OnInit {

  testEdiForm = this.fb.group({
    input_json : ['',Validators.required],
    users_transmitter_text : ['',Validators.required]  
  });

  constructor(private fb: FormBuilder,private queryService : QueriesService) { }

  ngOnInit(): void {
  }

  getJSONForEdiTest(){
    var data = {
      'input_json':this.testEdiForm.value.input_json,
      'users_transmitter_text':this.testEdiForm.value.users_transmitter_text
    };
    return JSON.stringify(data)
  }

  onGetTestEdi(){
    console.log(this.testEdiForm.value)
    console.log(this.getJSONForEdiTest)
    this.callMainfestQueryService(this.getJSONForEdiTest())
   
  }
  outputEDI;
  callMainfestQueryService(data:any){
    this.queryService.testEdiQuery(data)
    .subscribe(resp => {
      console.log('resp',resp); 
      this.outputEDI = resp.output_json
      console.log('withoutBody',this.outputEDI)
      this.outputEDI =resp.body.output_json;
      console.log('body', this.outputEDI)
    })
  }

  response = {
    ediMessage : "A1401S5G                 AX                                                     B  1401S5GAX                                                                    E0 SUMMRY 000001 REF ID: S5G 00000018                                           E1 F122   BOND WAIVER IND MUST BE 0               S5G  00000018                 Y  1401S5GAX00004                                                               Z1401S5G"  
    
  }

}
