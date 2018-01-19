import {Utilisateur} from './utilisateur.model';

export class Candidat extends Utilisateur {
  public civilité: String;

  constructor() {
    super () ;
  }
}
