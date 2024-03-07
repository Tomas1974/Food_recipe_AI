import { Component, OnInit } from '@angular/core';
import {DataService} from "../../Service/data.service";

@Component({
  selector: 'app-translation',
  template: `

    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Translation</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button menu="main-menu"></ion-menu-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">outbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-row>
        <ion-col>
          <ion-card>
            <h1>Danish recipes</h1>
            <ion-row>
              <ion-item>
              <ion-input [(ngModel)]="dataservice.recipeName">Name of the recipe </ion-input>
              </ion-item>
            </ion-row>


            <ion-item>

              <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;"
                            [(ngModel)]="dataservice.message"  placeholder="Type something here">
              </ion-textarea>
            </ion-item>

          </ion-card>

        </ion-col>

        <ion-col size="1">


          <br><br><br>
          <ion-row>

            <ion-button (click)="sendInfo()">Send</ion-button>
          </ion-row>


        </ion-col>

        <ion-col>

          <ion-card>
            <h1>Translation</h1>
            <ion-item>
              <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;" [readonly]="true"
                            [(ngModel)]="dataservice.translateMessage"  placeholder="Type something here">
              </ion-textarea>
            </ion-item>
          </ion-card>


        </ion-col>
        <ion-col>


        </ion-col>



      </ion-row>


    </ion-content>


  `,

})
export class TranslationPage implements OnInit {


  constructor(public dataservice: DataService) { }

  ngOnInit() {
  }

  sendInfo() {
  this.dataservice.sendInfo();
  }


}
