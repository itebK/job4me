import {CvEnLigne} from './cv_en_ligne.model';

export class Experience {

  public idExperience: number;
  public poste_occupe: string;
  public duree: string;
  public description: string;
  public cvEnLigne: CvEnLigne;
    constructor( poste_occupe, duree, description, cvEnLigne) {}

}
