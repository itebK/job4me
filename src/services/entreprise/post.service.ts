import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class PosteService {

  constructor(public http: Http) { }


  getPostes() {
    return this.http.get('http://localhost:8080/poste')
      .map(resp => resp.json());

  }


}
