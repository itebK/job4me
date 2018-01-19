import { PieceJointe } from '../../models/candidat/pieceJointe.model';
import { Component, OnInit } from '@angular/core';
import { JsonObject } from '@angular-devkit/core';
import { PieceJointeService } from '../../services/Candidat/pieceJointe.service';

@Component({
  selector: 'app-bloc-lettre',
  templateUrl: './bloc-lettre.component.html',
  styleUrls: ['./bloc-lettre.component.css']
})
export class BlocLettreComponent implements OnInit {

  listeLettre: PieceJointe [] = [] ;
  fileName: string;
  fileID: string;
  lettreObject: JsonObject ;
  arg: string = '';

  /****** Upload file attr */
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
      url: 'http://localhost:8080/upload_lettre'
    };
    sizeLimit = 2000000;
  /********************** */
  constructor(public pieceJointeService: PieceJointeService) { }

  ngOnInit() {
    this.listeLettre = this.getListeLettreMotivation(Number(localStorage.getItem('id')));
  }

    getListeLettreMotivation(idCandidat: number): PieceJointe[] {
    this.pieceJointeService.getListeLettredMotivation(idCandidat)
      .subscribe(data => {
        this.listeLettre = data ;

      }, err => {
        console.log(err); }) ;
    return this.listeLettre ;
  }



  /************* Upload File ng2-upload ******************* */


  handleUploadLettre(data): void {
    if (data && data.response) {

    }

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUploadLettre(uploadingFile): void {
        if (this.arg === 'lettre') {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');

    } else  {
    this.fileID = uploadingFile.id;
    this.fileName = uploadingFile.originalName;
    this.lettreObject = {
      candidat: {idUtilisateur: localStorage.getItem('id')},
      type: 'LettreMotivation',
      path: this.fileID,
      name: this.fileName};
      this.pieceJointeService.setLettreCandidat(this.lettreObject).subscribe(data => {
        console.log('posted lettre');
        this.addLettre(data);
      }, err => {
        console.log('error lettre');
      });
    }

    }
    this.arg = '';

  }

  /********************************** */

    /* AJOUTER - REMOVE LETTRE */
    addLettre(arg) {
      console.log('lettres' );
      console.log(this.listeLettre);
      this.listeLettre.push(arg);
    }

    removeLettre(index) {
      this.pieceJointeService.deletePieceJointe(this.listeLettre[index].idDocument)
        .subscribe(data => {
          this.listeLettre.splice(index, 1);
        }, err => {
          console.log(err); }) ;
    }



}
