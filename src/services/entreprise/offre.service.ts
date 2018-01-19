import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Offre} from '../../models/offre/model.offre';

@Injectable()
export class OffreService {
  public  listOffres = new Subject<any>();
  public  listOffresEntreprise = new Subject<any>();
    listoffre: Offre [] = [];
  listoffre1: Offre [] = [];
  constructor(public http: Http) {

    this.getoffres()
      .subscribe(data => {
        this.listOffres.next(data );
      }, err => {
        console.log(err);
      });

  }

  getoffres() {
    return this.http.get('http://localhost:8080/offre')
      .map(resp => resp.json());

  }

  getoffreEntreprise(id: number) {
     this.http.get('http://localhost:8080/offreEntreprise/' + id)
      .map(resp => resp.json())
      .subscribe(data => {
        this.listOffresEntreprise.next(data ) ;
      }, err => {
        console.log(err); }) ;
    return this.listOffresEntreprise ;

  }


  addoffre(offre: Offre) {
    return this.http.post('http://localhost:8080/offre' , offre)
      .map(resp => resp.json());

  }

  deleteoffre(id: number) {
    return this.http.delete('http://localhost:8080/offres/' + id)
      .map(resp => resp.json());

  }
  recherche(motcle) {
    this.chercherOffres(motcle)
      .subscribe(data => {
        this.listOffres.next(data );
      }, err => {
        console.log(err);
      });
  }

  listeOffres() {
    this.getoffres()
      .subscribe(data => {
        this.listOffres.next(data );
      }, err => {
        console.log(err);
      });
  }

  getoffre(idOffre: number) {
    return this.http.get('http://localhost:8080/offre/' + idOffre )
      .map(resp => resp.json());

  }

  getTitresOffres() {
    return this.http.get('http://localhost:8080/titresoffres')
      .map(resp => resp.json());

  }

  chercherOffres(motCle: string) {
    return this.http.get('http://localhost:8080/chercherOffres?mc=' + motCle)
      .map(resp => resp.json());

  }

  filtreSalaire( salaire: number , competence: String[] ) {
    return this.http.get('http://localhost:8080/filtreoffre/' + salaire)
      .map(resp => resp.json()).subscribe(data => {

        if (competence.length === 0) {
          this.listOffres.next(data );
        } else {
          this.listoffre1 = [] ;
          this.listoffre = data ;
          for (const k of this.listoffre ) {
            let test = false ;
            for (const c of competence ) {
              for (const f of k.competences) {
                if (f.libelle === c) { test = true; }
              }
            }
            if (test === true) { this.listoffre1.push(k) ; }
          }
          this.listOffres.next(this.listoffre1);
        }
      }, err => {
        console.log(err);
      });
  }

  filtreType(listetype: String[] , salaire: number ) {
    this.http.get('http://localhost:8080/filtreoffre/' + salaire + '/' + listetype  )
      .map(resp => resp.json()).subscribe(data => {
      this.listOffres.next(data );
    }, err => {
      console.log(err);
    });

  }


  filtreoffre(listetype: String[] , salaire: number , competence: String[]) {
    this.listoffre1 = [] ;
    this.http.get('http://localhost:8080/filtreoffre/' + salaire + '/' + listetype  )
      .map(resp => resp.json()).subscribe(data => {
        this.listoffre = data ;
          for (const k of this.listoffre ) {
           let test = false ;
            for (const c of competence ) {
              for (const f of k.competences) {
                if (f.libelle === c) { test = true; }
              }
            }
            if (test === true) {
              this.listoffre1.push(k) ;
            }
          }
          this.listOffres.next(this.listoffre1);

      }, err => {
        console.log(err);
      });
  }}
