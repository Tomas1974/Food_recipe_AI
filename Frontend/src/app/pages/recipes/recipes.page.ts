import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';

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
          <div #customTextarea class="custom-textarea" tabindex="0">
  <pre *ngFor="let line of dataservice.recipesArrayText; let i = index"
       (click)="selectLine($event.target); " [attr.data-line-number]="i" tabindex="-1">
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
export class RecipesPage  implements OnInit  {


  @ViewChild('customTextarea') customTextarea: ElementRef | undefined;



  constructor(public dataservice: DataService,
              public utilitiesService: UtilitiesService,
              private renderer: Renderer2) {
  }




  clearSelections() {
    const preElements = document.querySelectorAll('.custom-textarea pre');
    preElements.forEach(elem => elem.classList.remove('selected')); // Remove existing highlights
  }

  ngOnInit(): void {

   this.dataservice.getAllRecipes();

  }



  ngAfterViewInit(): void {
    this.renderer.listen(this.customTextarea!.nativeElement, 'keydown', (event) => this.handleKeyDown(event));

  }

  handleKeyDown(event: KeyboardEvent): void {
    const currentFocus: HTMLElement = document.activeElement as HTMLElement;
    let nextFocus: HTMLElement;


    switch (event.key) {
      case 'ArrowDown':
        nextFocus = currentFocus.nextElementSibling as HTMLElement || currentFocus; // Go to next element or stay if at the end
        break;
      case 'ArrowUp':
        nextFocus = currentFocus.previousElementSibling as HTMLElement || currentFocus; // Go to previous element or stay if at the beginning
        break;
      case 'Enter':

        this.selectLine(currentFocus); // Call a method to "select" the line
    //    event.preventDefault(); // Prevent the default action to avoid any unwanted behavior

        return;

    }

    if (nextFocus! && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      nextFocus.focus(); // Change focus for up/down arrow keys
   //   event.preventDefault(); // Prevent default scrolling behavior
    }
  }

  selectLine(target: EventTarget | null): void {

    if (target instanceof HTMLElement) {
       if (!target.classList.contains('selected')) { //Fjerner det blå fra tidligere valgt linje
        this.clearSelections(); // Clear any existing selections
      }
          target.classList.toggle('selected'); //Uden denne her kan man ikke klikke på linjer eller trykke enter

        if (target.classList.contains('selected')) {
        this.dataservice.selectedLine = target.textContent || ''; //Her vælges værdi på linjen der er trykket på
        this.dataservice.messageToDatafield();                    //Her sendes data til tekstfeltet
      }
    else {
        this.dataservice.selectedLine = ''; //man kan trykke mellem linjerne og ikke vælge noget. Til det bruges denne her.
        this.dataservice.messageToDatafield();
      }
    }

  }


  async delete() {

    let confirm=await this.utilitiesService.confirmDelete()

    if (confirm)
  this.dataservice.deleteRecipe();
    this.dataservice.messageToTextarea ="";


  }
}
