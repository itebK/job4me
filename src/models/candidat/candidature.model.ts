import {Offre} from '../offre/model.offre';
export class Candidature {
  public idCandidature: number;
  public dateDepot: Date;
  public message: string;
  public archive: boolean;
  public offre: Offre;

  constructor() {}
}
