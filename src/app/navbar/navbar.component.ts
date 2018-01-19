import { LoginGuard } from './../login.guard';
import { Component, OnInit } from '@angular/core';
import {OffreService} from '../../services/entreprise/offre.service';
import {Router} from '@angular/router';
import { LocalStorageClass } from '../localStorageClass';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public offreservices: OffreService,
              public router: Router,
              public loginGuard: LoginGuard,
              public localS: LocalStorageClass
            ) { }

  ngOnInit() {
  }

  home() {
    this.offreservices.listeOffres() ;
    this.router.navigate(['/home'] );
  }
  deconnexion() {
    localStorage.clear() ;
    this.router.navigateByUrl('/connexion');
  }

}
