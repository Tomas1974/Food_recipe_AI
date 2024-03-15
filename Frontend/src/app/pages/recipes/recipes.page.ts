import { Component, OnInit } from '@angular/core';

import {DataService} from "../../Service/data.service";
import {UtilitiesService} from "../../Service/utilities.service";

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

    <ion-content [fullscreen]="true" >
      <div style="background-color: #f0f0f0;">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">inbox</ion-title>
        </ion-toolbar>
      </ion-header>


      <ion-row class="ion-padding">
        <ion-col class="ion-padding">
          <h1>Recipes</h1>
          <div class="custom-textarea" tabindex="0">
  <pre *ngFor="let line of dataservice.recipesArrayText; let i = index"
       (click)="highlightLine($event)" (dblclick)="sendLineToTextarea($event)" [attr.data-line-number]="i">
    {{ line }}
  </pre>
          </div>
          <ion-button style=".grey {
                  --ion-color-base: grey !important;
                    --ion-color-base-rgb: 128,128,128 !important;
}
" [disabled]="dataservice.selectedLine === ''" [class.grey]="dataservice.selectedLine === ''" (click)="delete()">Delete</ion-button>

        </ion-col>

        <ion-col class="ion-padding">

          <h1> Recipe:{{dataservice.selectedLine}}</h1>
          <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;
                    background-color: white;" [(ngModel)]="dataservice.messageToTextarea" rows="4" cols="50" readonly></ion-textarea>

        </ion-col>
      </ion-row>

      </div>
    </ion-content>



  `,
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage  implements OnInit{







  constructor(public dataservice: DataService,
              public utilitiesService: UtilitiesService) {
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

  async delete() {

    let confirm=await this.utilitiesService.confirmDelete()

    if (confirm)
  this.dataservice.deleteRecipe();



  }
}
