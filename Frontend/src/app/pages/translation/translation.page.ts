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
      <div style="background-color: #f0f0f0;">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">outbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-row>
        <ion-col>

            <h1>Danish recipes</h1>
            <ion-row>
              <ion-list>
                <ion-item>
                  <ion-input style="background-color: #f0f0f0;" [(ngModel)]="dataservice.recipeName" label="Recipe name" placeholder="Enter text"></ion-input>
                </ion-item>
              </ion-list>

            </ion-row>

            <ion-item>

              <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;"
                            [(ngModel)]="dataservice.message"  placeholder="Type something here">
              </ion-textarea>
            </ion-item>



        </ion-col>

        <ion-col size="1">


          <br><br><br><br><br><br><br><br><br>
          <ion-row class="ion-justify-content-center">
            <ion-col size="auto">
            <ion-button style="align-self: center;" (click)="sendInfo()">Send</ion-button>
            </ion-col>

          </ion-row>


        </ion-col>

        <ion-col>



            <h1>Translation</h1>
            <br><br><br>
            <ion-item>

              <ion-textarea style="width: 100%; min-height: 40em; border: 1px solid #000;" [readonly]="true"
                            [(ngModel)]="dataservice.translateMessage"  placeholder="Type something here">
              </ion-textarea>
            </ion-item>



        </ion-col>
        <ion-col>


        </ion-col>



      </ion-row>

      </div>
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
