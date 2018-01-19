import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Certification} from '../../models/cv/certification.model';


@Injectable()
export class CertificationService {

  constructor(public http: Http) { }

  saveCertification(certification: Certification) {
    return this.http.post('http://localhost:8080/certification', certification)
      .map(resp => resp.json());
  }

  deletetCertification(certification: Certification) {
    return this.http.delete('http://localhost:8080/certifications/' + certification.idCertification)
      .map(resp => resp.json());
  }

  listeCertificationCandidat(id: number) {
    return this.http.get('http://localhost:8080/listecertifications/' + id)
      .map(resp => resp.json());
  }


}
