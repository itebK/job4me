import { Component, OnInit } from '@angular/core';
import {OffreService} from '../../../services/entreprise/offre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {

  constructor(public offreservices: OffreService, public router: Router) { }

  ngOnInit() {
    this.offreservices.listeOffres() ;
    if (localStorage.getItem('role') !== 'admin') {
        this.router.navigateByUrl('/home');
    }
  }

}
