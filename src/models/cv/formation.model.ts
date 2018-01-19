import {CvEnLigne} from './cv_en_ligne.model';

export class Formation {
  public idFormation: number;
  public cvEnLigne: CvEnLigne;
  public etablissement: string;
  public specialite: string;
  public diplome: string;
  public annee: string;
  constructor(etablissement, specialite, diplome, annee) {}
}
