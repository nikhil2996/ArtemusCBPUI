import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { QueryApiInfo } from './QueryApiInfo';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  
  httpOptions={};

  

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    };
  }

  createManifestQuery(data:any){
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/cargomanifest/edimessage', data,this.httpOptions)
  }

  createTariffQuery(data: any) {
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/tariffquery/status', data,this.httpOptions)
  
  }

  createScacQuery(data: any) {
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/carrierquery/status', data,this.httpOptions)
  
  }

  createFirmsQuery(data: any) {
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/firmsquery/status', data,this.httpOptions)
  
  }

  createADCVDQuery(data: any) {
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/adcvdquery/q1status', data,this.httpOptions)
  
  }

  createADCVDQuery1(data: any) {
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/adcvdquery/q2status', data,this.httpOptions)
  
  }

  createImporterBond(data:any){
    console.log(data)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/importerBond/importerRecord', data,this.httpOptions)
  }

  testEdiQuery(data:any){
    console.log(data)
    //return this.http.post<any>('http://localhost:8080/ArtemusChb/editestscreen/testedimessage', data,this.httpOptions)
    return this.http.post<any>('http://3.231.243.179:8080/ArtemusChb/editestscreen/testedimessage', data,this.httpOptions)
  }

}
