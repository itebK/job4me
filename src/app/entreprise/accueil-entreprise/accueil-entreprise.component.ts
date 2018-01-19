import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-entreprise',
  templateUrl: './accueil-entreprise.component.html',
  styleUrls: ['./accueil-entreprise.component.css']
})
export class AccueilEntrepriseComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
      if (localStorage.getItem('role') !== 'Entreprise') {
        this.router.navigateByUrl('/home');
    }
  }

}
