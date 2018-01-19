import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Experience} from '../../models/cv/experience.model';

@Injectable()
export class ExperienceService {

  constructor(public http: Http) { }

  saveExperience(experience: Experience) {
    return this.http.post('http://localhost:8080/experience', experience)
      .map(resp => resp.json());
  }

  deletetExperience(experience: Experience) {
    return this.http.delete('http://localhost:8080/experiences/' + experience.idExperience)
      .map(resp => resp.json());
  }

  listeExperienceCandidat(id: number) {
    return this.http.get('http://localhost:8080/listeexperiences/' + id)
      .map(resp => resp.json());
  }


}
