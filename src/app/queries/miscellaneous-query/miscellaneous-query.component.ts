import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup ,FormArray} from '@angular/forms';
import { NgbDateStruct , NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { QueriesService } from '../service/queries.service';

@Component({
  selector: 'app-miscellaneous-query',
  templateUrl: './miscellaneous-query.component.html',
  styleUrls: ['./miscellaneous-query.component.css']
})
export class MiscellaneousQueryComponent implements OnInit {
  
  scacCodeForm = this.fb.group({
    scacCode : ['',Validators.required],
  });

  model: NgbDateStruct;
  tariffForm: FormGroup;
  firmQueriesList = [
    {'code':'1', 'text':'Only Firms Code'},
    {'code':'2','text':'For Facility Name and District Code'},
    {'code':'3','text':'For District Code and Begin Date'}]

  queryStatus='1';
  firmsQueryFormForCode = this.fb.group({
    firmsCode : ['',Validators.required], 
  });
  
  firmsQueryFormForFacility = this.fb.group({
    facilityName : ['',Validators.required],
    districtCode : [''] 
  });
  
  firmsQueryFormForDistrictCode : FormGroup;
  

  exchangeRateForm = this.fb.group({
    currencyCode : ['',Validators.required],
    date : ['']
  }); 

  ADCVDFormForActive : FormGroup;
  ADCVDFormForInactive : FormGroup;
  ADCVDFormForBoth : FormGroup;

  ADCVDFormForCaseNumber =  this.fb.group({
    caseNumber : ['',Validators.required]
  });

  quoteQueryForm = this.fb.group({
    tariffQuotaVisaNum1 : ['',Validators.required],
    tariffQuotaVisaNum2 : [''],
    countryofOrigin : ['',Validators.required],
    visaQueryCriteria : ['R'] 
  });
  
  caseQueryCriteriaList=[ 
    {'code':'space','text':''},
    {'code':'A','text':'Active'},
    {'code':'I','text':'In-Active'},
    {'code':'B','text':'Both'}
  ]

  caseQueryCriteria = 'space';

  visaQueryCriteriaList=[
    {'code':'R','text':'Tariff Number'},
    {'code':'X','text':'Textile Category Number'},
  ]

  

  

  constructor(private fb: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter,private datePipe: DatePipe,private queryService : QueriesService) { }
  currentDate;
  ngOnInit(): void {
    let d: Date = new Date();
    

    this.tariffForm = this.fb.group({
      HTSUSNo : ['',Validators.required],
      fromDate : [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}]
    });

    this.firmsQueryFormForDistrictCode = this.fb.group({
      districtCode : [''],
      beginDate : [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}]
    });

    this.ADCVDFormForActive = this.fb.group({
      tariffNumber : [''] ,
      countryCode : [''],
      tsusaNumber : [''],
      midCode : [''],
      foreignExporterIdentificationCode : [''],
      lastDate : ['']
    })

    this.ADCVDFormForInactive = this.fb.group({
      tariffNumber : [''] ,
      countryCode : [''],
      tsusaNumber : [''],
      midCode : [''],
      foreignExporterIdentificationCode : [''],
      lastDate : ['']
    })

    this.ADCVDFormForBoth = this.fb.group({
      tariffNumber : [''] ,
      countryCode : [''],
      tsusaNumber : [''],
      midCode : [''],
      foreignExporterIdentificationCode : [''],
      lastDate : ['']
    })

    

    

    this.currentDate=this.firmsQueryFormForDistrictCode.value.beginDate;
  }

  resetResponseaAndForm(){
    this.formsReset();
    this.resetResponse();

  }
  
  formsReset(){
    console.log("ResetForm")
    let d: Date = new Date();
    this.firmsQueryFormForCode.reset(); 
    this.firmsQueryFormForFacility.reset();
    this.firmsQueryFormForDistrictCode.reset();
    this.tariffForm.reset();
    this.scacCodeForm.reset();
    this.ADCVDFormForCaseNumber.reset();
    this.ADCVDFormForActive.reset();
    this.ADCVDFormForInactive.reset();
    this.ADCVDFormForBoth.reset();
    this.exchangeRateForm.reset();
    this.quoteQueryForm.reset();
    this.tariffForm.patchValue({
      fromDate : this.currentDate
    })
    this.firmsQueryFormForDistrictCode.patchValue({
      beginDate : this.currentDate
    })
    this.quoteQueryForm.patchValue({
      visaQueryCriteria : 'R'
    })
   

   
   /*  this.ADCVDFormForActive.patchValue({
      lastDate : this.currentDate
    })
    this.ADCVDFormForInactive.patchValue({
      lastDate : this.currentDate
    })
    this.ADCVDFormForBoth.patchValue({
      lastDate : this.currentDate
    }) */
  }


  resetResponse(){

    console.log("resetResponse")
    this.objTariffQueryMaster = '';
    this.objScacQueryResponse = [];
    this.objScacQueryErrorResponse = [];
    this.objFirmsQueryf211 = [];
    this.objFirmsQueryf311 = [];
    this.objFirmsQueryf411 =  [];
    this.objADCVDResponseMaster = '';
    this.objQuotaQueryResponseMaster = '';

  }

  getJSONForTariffQuery() {
    var data = {
      'tariffNumber' : this.tariffForm.value.HTSUSNo,
      'asOfDate'  : this.datePipe.transform(this.myDate,'MMddyy')
  };
  return JSON.stringify(data)
  }

  myDate;
  objTariffQueryMaster;

  onGetReportsTariffQuery(){
    console.log(this.tariffForm.value)
    let ngbDate = this.tariffForm.controls['fromDate'].value;
    this.myDate= this.ngbDateParserFormatter.format(ngbDate);
    console.log(this.getJSONForTariffQuery());
    this.callTariffQueryService(this.getJSONForTariffQuery())
   
  }

  callTariffQueryService(data:any) {
    this.queryService.createTariffQuery(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objTariffQueryMaster = resp.body.tariffStatusResponse;
      console.log(this.objTariffQueryMaster);
      });
  }

  getJSONForScacQuery() {
    var data = {
      'carrierCode' : this.scacCodeForm.value.scacCode,
  };
  return JSON.stringify(data)
  }

  onGetReportsScacQuery(){
    console.log(this.scacCodeForm.value)
    console.log(this.getJSONForScacQuery());
    this.callScacQueryService(this.getJSONForScacQuery())
  }

  objScacQueryResponse = [];
  objScacQueryErrorResponse = [];
  callScacQueryService(data:any) {
    this.queryService.createScacQuery(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objScacQueryResponse = resp.body.f106;
      this.objScacQueryErrorResponse = resp.body.f906;
      console.log(this.objScacQueryResponse);
      console.log(this.objScacQueryErrorResponse);
      }); 
  }

  getJSONForFirmsQueryForCode() {
    var data = {
      'firmsCode' : this.firmsQueryFormForCode.value.firmsCode,
  };
  return JSON.stringify(data)
  }

  onGetReportsFirmsQueryForCode(){
    console.log(this.firmsQueryFormForCode.value)
    console.log(this.getJSONForFirmsQueryForCode());
    this.callFirmsQueryService(this.getJSONForFirmsQueryForCode())
  }

  getJSONForFirmsQueryForFacility() {
    var data = {
      'nameOfFacility' : this.firmsQueryFormForFacility.value.facilityName,
      'districtCode' : this.firmsQueryFormForFacility.value.districtCode,
  };
  return JSON.stringify(data)
  }

  onGetReportsFirmsQueryForFacility(){
    console.log(this.firmsQueryFormForFacility.value)
    console.log(this.getJSONForFirmsQueryForFacility());
    this.callFirmsQueryService(this.getJSONForFirmsQueryForFacility())
  }

  getJSONForFirmsQueryForDistrictCode() {
    var data = {
      'districtCode' : this.firmsQueryFormForDistrictCode.value.districtCode,
      'beginDate' : this.datePipe.transform(this.myDate1,'MMddyy')
  };
  return JSON.stringify(data)
  }

  myDate1;

  onGetReportsFirmsQueryForDistrict(){
    console.log(this.firmsQueryFormForDistrictCode.value)
    let ngbDate = this.firmsQueryFormForDistrictCode.controls['beginDate'].value;
    this.myDate1= this.ngbDateParserFormatter.format(ngbDate);
    console.log(this.getJSONForFirmsQueryForDistrictCode());
    this.callFirmsQueryService(this.getJSONForFirmsQueryForDistrictCode())
  }

  objFirmsQueryf211 = [];
  objFirmsQueryf311 = [];
  objFirmsQueryf411 =  [];
  callFirmsQueryService(data:any) {
    this.queryService.createFirmsQuery(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objFirmsQueryf211 = resp.body.f211;
      this.objFirmsQueryf311 = resp.body.f311;
      this.objFirmsQueryf411 = resp.body.f411;
      console.log(this.objFirmsQueryf211);
      console.log(this.objFirmsQueryf311);
      console.log(this.objFirmsQueryf411);
      }); 
  }

  
  onGetReportsExchangeRateQuery(){
    console.log(this.exchangeRateForm.value)
  }

  onGetReportsTariffQueryCBP(){
    console.log(this.tariffForm.value)
  }

  onGetReportsTariffQueryHarmonized(){
    window.open("https://hts.usitc.gov/");
  }

  getJSONForADCVDCBPForActive(){
    var data = {
      'companyCaseStatus' : 'A',
      'countryCode' : this.ADCVDFormForActive.value.countryCode,
      'htsNumber' : this.ADCVDFormForActive.value.tariffNumber,
      'tsusaNumber' : this.ADCVDFormForActive.value.tsusaNumber,
      'manufacturerIdentificationCode' : this.ADCVDFormForActive.value.midCode,
      'foreignExporterIdentificationCode' : this.ADCVDFormForActive.value.foreignExporterIdentificationCode,
      'dateSinceLastUpdate' : this.datePipe.transform(this.myDate2,'MMddyy')
  };
  return JSON.stringify(data)
  }

  myDate2;
  myDate3;
  myDate4;

  getJSONForADCVDCBPForInactive(){
    var data = {
      'companyCaseStatus' : 'I',
      'countryCode' : this.ADCVDFormForInactive.value.countryCode,
      'htsNumber' : this.ADCVDFormForInactive.value.tariffNumber,
      'tsusaNumber' : this.ADCVDFormForInactive.value.tsusaNumber,
      'manufacturerIdentificationCode' : this.ADCVDFormForInactive.value.midCode,
      'foreignExporterIdentificationCode' : this.ADCVDFormForInactive.value.foreignExporterIdentificationCode,
      'dateSinceLastUpdate' : this.datePipe.transform(this.myDate3,'MMddyy')
  };
  return JSON.stringify(data)
  }

  getJSONForADCVDCBPForBoth(){
    var data = {
      'companyCaseStatus' : 'B',
      'countryCode' : this.ADCVDFormForBoth.value.countryCode,
      'htsNumber' : this.ADCVDFormForBoth.value.tariffNumber,
      'tsusaNumber' : this.ADCVDFormForBoth.value.tsusaNumber,
      'manufacturerIdentificationCode' : this.ADCVDFormForBoth.value.midCode,
      'foreignExporterIdentificationCode' : this.ADCVDFormForBoth.value.foreignExporterIdentificationCode,
      'dateSinceLastUpdate' : this.datePipe.transform(this.myDate4,'MMddyy')
  };
  return JSON.stringify(data)
  }

  getJSONForADCVDCBPForCaseNumber(){
    var data = {
      'caseNumber' : this.ADCVDFormForCaseNumber.value.caseNumber
    };
    return JSON.stringify(data)
  }

  onGetReportsADCVD(){
    console.log(this.ADCVDFormForCaseNumber.value)
    console.log(this.getJSONForADCVDCBPForCaseNumber());
    this.callADCVDQueryService(this.getJSONForADCVDCBPForCaseNumber())
  }

  onGetReportsADCVDForInactive(){
    console.log(this.ADCVDFormForInactive.value)
    let ngbDate = this.ADCVDFormForInactive.controls['lastDate'].value;
    this.myDate3= this.ngbDateParserFormatter.format(ngbDate);
    console.log(this.getJSONForADCVDCBPForInactive());
    this.callADCVDQueryService2(this.getJSONForADCVDCBPForInactive())
  }

  onGetReportsADCVDForBoth(){
    console.log(this.ADCVDFormForBoth.value)
    let ngbDate = this.ADCVDFormForBoth.controls['lastDate'].value;
    this.myDate4= this.ngbDateParserFormatter.format(ngbDate);
    console.log(this.getJSONForADCVDCBPForBoth());
    this.callADCVDQueryService2(this.getJSONForADCVDCBPForBoth())
  }

  onGetReportsADCVDForActive(){
    console.log(this.ADCVDFormForActive.value)
    let ngbDate = this.ADCVDFormForActive.controls['lastDate'].value;
    this.myDate2= this.ngbDateParserFormatter.format(ngbDate);
    console.log(this.getJSONForADCVDCBPForActive());
    this.callADCVDQueryService2(this.getJSONForADCVDCBPForActive())
  }

  convertToPercentage(data){
    if(data.rf.length>0)
    {
      for(let i=0;i<data.rf.length;i++){
        
        let per=data.rf[i].adValoremDepositRate / 100;
        data.rf[i].adValoremDepositRate = per;
      }
    }
    return data
  }

  convertToDollar(data){
    if(data.rf.length>0)
    {
      for(let i=0;i<data.rf.length;i++){
        let per=data.rf[i].specificDepositRate / 100;
        data.rf[i].specificDepositRate = per;
      }
    } 
    return data
  }

  objADCVDResponseMaster;
  callADCVDQueryService(data:any) {
    this.queryService.createADCVDQuery(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objADCVDResponseMaster = resp.body.adCvdMaster;
      this.objADCVDResponseMaster=this.convertToPercentage(this.objADCVDResponseMaster)
      this.objADCVDResponseMaster=this.convertToDollar(this.objADCVDResponseMaster);
      console.log("new obj",this.objADCVDResponseMaster)
      }); 
  }

  callADCVDQueryService2(data:any) {
    this.queryService.createADCVDQuery1(data)
    .subscribe(resp => { 
      console.log('resp',resp); 
      this.objADCVDResponseMaster = resp.body.adCvdMaster;
      this.objADCVDResponseMaster=this.convertToPercentage(this.objADCVDResponseMaster)
      this.objADCVDResponseMaster=this.convertToDollar(this.objADCVDResponseMaster);
      console.log("new obj",this.objADCVDResponseMaster)
      }); 
  }
  onGetReportsADCVDSearch(){
    window.open("https://aceservices.cbp.dhs.gov/adcvdweb");
  }

  getJSONForQuotaQuery(){
    var data = {
      'quotaQueryIdTypeCode' : this.quoteQueryForm.value.visaQueryCriteria,
      'quotaQueryId' : this.quoteQueryForm.value.tariffQuotaVisaNum1,
      'secondTariffNumber' : this.quoteQueryForm.value.tariffQuotaVisaNum2,
      'countryOfOrigin' : this.quoteQueryForm.value.countryofOrigin,

  };
  return JSON.stringify(data)
  }

  onGetReportsQuotaQuery(){
    console.log(this.quoteQueryForm.value)
    console.log(this.getJSONForQuotaQuery());
    this.callQuotaQueryService(this.getJSONForQuotaQuery())
  }

  objQuotaQueryResponseMaster;

  callQuotaQueryService(data:any) {
    this.queryService.createQuotaQuery(data)
      .subscribe(resp => { 
      console.log('resp',resp); 
      this.objQuotaQueryResponseMaster = resp.body.quotaMasterResp;
      console.log("objQuotaQuery",this.objQuotaQueryResponseMaster)
      }); 
  }

}
