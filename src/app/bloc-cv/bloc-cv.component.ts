import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { JsonObject } from '@angular-devkit/core';
import { PieceJointeService } from '../../services/Candidat/pieceJointe.service';
import { PieceJointe } from '../../models/candidat/pieceJointe.model';

@Component({
  selector: 'app-bloc-cv',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bloc-cv.component.html',
  styleUrls: ['./bloc-cv.component.css']
})
export class BlocCvComponent implements OnInit {

  listeCv: PieceJointe [] = [] ;
  fileName: string;
  fileID: string;
  cvObject: JsonObject ;
  arg: string = '';

  /****** Upload file attr */
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
      url: 'http://localhost:8080/upload_cv'
    };
    sizeLimit = 2000000;
  /********************** */



  constructor(private ref: ChangeDetectorRef, public pieceJointeService: PieceJointeService) {
    setInterval(() => {

      // the following is required, otherwise the view will not be updated
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit() {
    this.listeCv = this.getListeCvCandidat(Number(localStorage.getItem('id')));
  }

  getListeCvCandidat(idCandidat: number): PieceJointe[] {
    this.pieceJointeService.getListeCvCandidat(idCandidat)
      .subscribe(data => {
        this.listeCv = data ;

      }, err => {
        console.log(err); }) ;
    return this.listeCv ;
  }







  /************* Upload File ng2-upload ******************* */


  handleUploadCV(data): void {
    if (data && data.response) {

    }

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUploadCV(uploadingFile): void {
    if (this.arg === 'cv') {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');

    } else {
    this.fileID = uploadingFile.id;
    this.fileName = uploadingFile.originalName;
    this.cvObject = {
      candidat: {idUtilisateur: localStorage.getItem('id')},
      type: 'CV',
      path: this.fileID,
      name: this.fileName   };
      this.pieceJointeService.setCvCandidat(this.cvObject).subscribe(data => {
        console.log('posted cv');
        this.addCV(data);
      }, err => {
        console.log('error cv');
      });


    }
    }
    this.arg = '';
  }

  /********************************** */

  /* AJOUTER - REMOVE CV */
  addCV(arg) {
    console.log('CV');
    console.log(this.listeCv);
    this.listeCv.push(arg);
  }

  removeCV(index) {
    console.log(this.listeCv[index].idDocument);
    this.pieceJointeService.deletePieceJointe(this.listeCv[index].idDocument)
      .subscribe(data => {
        this.listeCv.splice(index, 1);
      }, err => {
        console.log(err); }) ;
  }


}
