import { Component, OnInit } from '@angular/core';
import { LocalStorageClass } from '../localStorageClass';

@Component({
  selector: 'app-bloc-suggestions',
  templateUrl: './bloc-suggestion.component.html',
  styleUrls: ['./bloc-suggestion.component.css']
})
export class BlocSuggestionComponent implements OnInit {

  constructor(public localS: LocalStorageClass) { }

  ngOnInit() {
  }

}
