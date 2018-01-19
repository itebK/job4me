import {Entreprise} from '../User/model.entreprise';
import {Poste} from './model.post';
import {Competence} from './model.competence';
import {TypeContrat} from './model.typeContrat' ;
import {Ville} from './enum.ville';

export class Offre {
  idOffre: number ;
  titre: string;
  description: string;
  salaire: string;
  entreprise: Entreprise;
  dateCreation: Date = new Date() ;
  dateExpiration: Date = new Date() ;
  poste: string;
  ville: Ville ;
  typeContrat: TypeContrat ;
  competences: Array<Competence>;
  constructor() {}

}



