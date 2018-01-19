import { Ville } from '../offre/enum.ville';
import {Utilisateur} from './utilisateur.model';

export class Entreprise extends Utilisateur {
  secteurActivite: string;
  siteWeb: string;
  effectif: number;
  description: string;
  ville: Ville;

  constructor() {
    super();
  }
}
