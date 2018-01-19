import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UtilisateurService {
  constructor(public http: Http) {
  }

  allUser() {
    return this.http.get('http://localhost:8080/utilisateur' )
      .map(resp => resp.json());
  }

  getUser(idUser: number) {
    return this.http.get('http://localhost:8080/utilisateur/' + idUser )
      .map(resp => resp.json());
  }

  authentification(email: string , password: any) {
    return this.http.get('http://localhost:8080/authentification/' + email + '/' + password )
      .map(resp => resp.json());
  }

}
