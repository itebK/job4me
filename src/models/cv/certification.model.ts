import {CvEnLigne} from './cv_en_ligne.model';

export class Certification {
  public cvEnLigne: CvEnLigne;
  public idCertification: number;
  constructor(
    public certification: string,
    public annee: string,
  ) {}
}
