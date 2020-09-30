import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup ,FormArray} from '@angular/forms';
import { QueriesService } from '../service/queries.service'
@Component({
  selector: 'app-bond-query',
  templateUrl: './bond-query.component.html',
  styleUrls: ['./bond-query.component.css']
})
export class BondQueryComponent implements OnInit {
  
 public importerBondForm : FormGroup;
 
  AddressReqCodeList= [
    { id: '', name: 'Only get Importer Bond Information' },
    { id: '1', name: 'Get Importer Bond and Address Information' },
    { id: '2', name: 'Only Get Importer Address Information' },
  ];

  constructor(private fb: FormBuilder ,private queryService : QueriesService) {}
  count = 0;

  initImporters(){
    this.count++;
    console.log(this.count)
    return this.fb.group({
      importerNo: ['',Validators.required],
      addressReqCode: ['1'],
    });
  }

  get newImpoters()  {
    return this.importerBondForm.get("importers") as FormArray
  }

  addImporter() {
    if(this.count == 5){

    }else{
    this.newImpoters.push(this.initImporters());}
  }

  removeImporter(i:number) {
    this.count--;
    this.newImpoters.removeAt(i);
  }

  getJSONForImporterBond() {
    var data = {
      'importers' : this.importerBondForm.value.importers
  };
  return JSON.stringify(data)
  }

  onGetReportsimporterBond(){
    console.log(this.importerBondForm.value);
    console.log(this.getJSONForImporterBond());
    this.callImporterBondService(this.getJSONForImporterBond())
  }

  objImporterBondMaster;

    callImporterBondService(data:any){
      this.queryService.createImporterBond(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objImporterBondMaster = resp.body.statusImporter;
      console.log(this.objImporterBondMaster);  
      });   
  }

  ngOnInit(): void {
    this.importerBondForm = this.fb.group({
      importers: this.fb.array([this.initImporters()])
     });
  }

 

}
