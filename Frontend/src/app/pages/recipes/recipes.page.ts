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


      <ion-row>
        <ion-col>
          <h1>Recipes</h1>
          <div class="custom-textarea" tabindex="0">
  <pre *ngFor="let line of dataservice.recipesArrayText; let i = index" (click)="highlightLine($event)" (dblclick)="sendLineToTextarea($event)" [attr.data-line-number]="i">
    {{ line }}
  </pre>

          </div>

        </ion-col>

        <ion-col>

          <br>
          <p>Selected Line: {{selectedLine}}</p>
          <textarea [(ngModel)]="messageToTextarea" rows="4" cols="50" readonly></textarea>

        </ion-col>
      </ion-row>


    </ion-content>



  `,
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage  implements OnInit{




  selectedLine: string = '';
  messageToTextarea: string = ''; // Holds the message for the second textarea

  constructor(private dataservice: DataService) {
  }

  highlightLine(event: any) {
    this.clearSelections(); // Clear any existing selections
    const clickedLine = event.target;
    clickedLine.classList.add('selected'); // Highlight the clicked line
    this.selectedLine = clickedLine.textContent || '';
  }

  sendLineToTextarea(event: any) {
    // Prevent the single-click event from firing when a double-click occurs
    event.preventDefault();
    this.messageToTextarea = this.selectedLine; // Send the selected line's text to the second textarea
  }

  clearSelections() {
    const preElements = document.querySelectorAll('.custom-textarea pre');
    preElements.forEach(elem => elem.classList.remove('selected')); // Remove existing highlights
  }

  ngOnInit(): void {

    this.dataservice.getAllRecipes();

  }

}
