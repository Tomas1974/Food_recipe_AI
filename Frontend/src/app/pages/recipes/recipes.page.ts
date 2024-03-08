import { Component, OnInit } from '@angular/core';

import {DataService} from "../../Service/data.service";

@Component({
  selector: 'app-recipes',
  template: `

    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Recipes</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button menu="main-menu"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">inbox</ion-title>
        </ion-toolbar>
      </ion-header>


      <ion-row >
        <ion-col size="2">
          <h1>Recipes</h1>
          <div class="custom-textarea" tabindex="0">
  <pre *ngFor="let line of dataservice.recipesArrayText; let i = index"
       (click)="highlightLine($event)" (dblclick)="sendLineToTextarea($event)" [attr.data-line-number]="i">
    {{ line }}
  </pre>

          </div>

        </ion-col>

        <ion-col>

          <h1> {{dataservice.selectedLine}}</h1>
          <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;" [(ngModel)]="dataservice.messageToTextarea" rows="4" cols="50" readonly></ion-textarea>

        </ion-col>
      </ion-row>


    </ion-content>



  `,
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage  implements OnInit{







  constructor(public dataservice: DataService) {
  }

  highlightLine(event: any) {
    this.clearSelections(); // Clear any existing selections
    const clickedLine = event.target;
    clickedLine.classList.add('selected'); // Highlight the clicked line
    this.dataservice.selectedLine = clickedLine.textContent || '';
  }

  sendLineToTextarea(event: any) {
    // Prevent the single-click event from firing when a double-click occurs
    event.preventDefault();
    this.dataservice.messageToDatafield();
  }

  clearSelections() {
    const preElements = document.querySelectorAll('.custom-textarea pre');
    preElements.forEach(elem => elem.classList.remove('selected')); // Remove existing highlights
  }

  ngOnInit(): void {

    this.dataservice.getAllRecipes();

  }

}
